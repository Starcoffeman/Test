/* ==========================================================================
   15-application.js — слайдер секций «применение в пространствах»
   и «коммерческие». Один механизм на обе секции.

   Оригинал прокручивает слайды по горизонтали с зацикливанием, поэтому
   вместо кроссфейда (js/11-custom-slider.js) здесь лента с клонами по краям.
   API описан в конце файла.
   ========================================================================== */
(function () {
  'use strict';

  var HB = (window.HB = window.HB || {});

  var SPEED = 1500; /* длительность прокрутки, как в оригинале */
  var DRAG_THRESHOLD = 40;
  var LG = '(min-width: 1200px)';

  function button(cls, label, html) {
    var el = document.createElement('button');
    el.type = 'button';
    el.className = cls;
    el.setAttribute('aria-label', label);
    if (html) el.innerHTML = html;
    return el;
  }

  function Slider(root) {
    this.root = root;
    this.track = root.querySelector('.hb-slider-track');
    this.slides = Array.prototype.slice.call(this.track.children);
    this.count = this.slides.length;
    this.index = 0;
    this.timer = null;
    this.dragX = null;
    this.speed = parseInt(root.getAttribute('data-speed'), 10) || SPEED;
    this.delayLg = parseInt(root.getAttribute('data-autoplay'), 10) || 0;
    this.delaySm = parseInt(root.getAttribute('data-autoplay-sm'), 10) || this.delayLg;
  }

  Slider.prototype.delay = function () {
    return window.matchMedia(LG).matches ? this.delayLg : this.delaySm;
  };

  /* Клоны по краям дают бесшовный переход последний → первый и обратно */
  Slider.prototype.addClones = function () {
    var first = this.slides[0].cloneNode(true);
    var last = this.slides[this.count - 1].cloneNode(true);
    first.setAttribute('aria-hidden', 'true');
    last.setAttribute('aria-hidden', 'true');
    this.track.insertBefore(last, this.slides[0]);
    this.track.appendChild(first);
  };

  Slider.prototype.shift = function (position, animated) {
    this.track.style.transition = animated ? 'transform ' + this.speed + 'ms ease-in-out' : 'none';
    this.track.style.transform = 'translate3d(' + -position * 100 + '%, 0, 0)';
  };

  Slider.prototype.paint = function () {
    var i;
    for (i = 0; i < this.count; i++) {
      this.slides[i].setAttribute('aria-hidden', i === this.index ? 'false' : 'true');
      if (this.dots) this.dots[i].classList.toggle('is-active', i === this.index);
      if (this.bars) this.bars[i].classList.remove('is-active');
    }
    /* перезапуск CSS-перехода полосы прогресса требует пересчёта стилей */
    if (this.bars) {
      void this.bars[this.index].offsetWidth;
      this.bars[this.index].classList.add('is-active');
    }
  };

  Slider.prototype.go = function (index, animated) {
    this.index = ((index % this.count) + this.count) % this.count;
    this.shift(index + 1, animated !== false);
    this.paint();
    /* съехали на клон — после анимации возвращаемся к настоящему слайду */
    this.pending = index !== this.index;
  };

  Slider.prototype.step = function (delta) {
    if (this.busy) return;
    this.busy = true;
    this.go(this.index + delta);
    this.restart();
  };

  Slider.prototype.restart = function () {
    this.stop();
    var delay = this.delay();
    if (!delay || this.count < 2) return;
    var self = this;
    this.timer = window.setTimeout(function () {
      self.busy = true;
      self.go(self.index + 1);
      self.restart();
    }, delay);
  };

  Slider.prototype.stop = function () {
    if (this.timer) window.clearTimeout(this.timer);
    this.timer = null;
  };

  Slider.prototype.buildNav = function () {
    var self = this;
    var bars = document.createElement('div');
    var dots = document.createElement('div');
    bars.className = 'hb-slider-bars';
    dots.className = 'hb-slider-dots';
    this.bars = [];
    this.dots = [];

    this.slides.forEach(function (slide, i) {
      var label = 'Слайд ' + (i + 1);
      var bar = button('hb-slider-bar', label, '<span class="hb-slider-bar-fill"></span>');
      var dot = button('hb-slider-dot', label);
      var jump = function () {
        self.stop();
        self.go(i);
        self.restart();
      };
      bar.addEventListener('click', jump);
      dot.addEventListener('click', jump);
      bars.appendChild(bar);
      dots.appendChild(dot);
      self.bars.push(bar);
      self.dots.push(dot);
    });

    this.root.appendChild(bars);
    this.root.appendChild(dots);
  };

  /* Мышью в оригинале не тянут — только пальцем на узких экранах */
  Slider.prototype.canDrag = function (event) {
    return event.pointerType !== 'mouse' || !window.matchMedia(LG).matches;
  };

  Slider.prototype.bindDrag = function () {
    var self = this;

    this.root.addEventListener('pointerdown', function (event) {
      if (!self.canDrag(event) || self.busy) return;
      if (event.pointerType === 'mouse' && event.button !== 0) return;
      self.dragX = event.clientX;
      self.stop();
    });

    this.root.addEventListener('pointermove', function (event) {
      if (self.dragX === null) return;
      var width = self.root.offsetWidth || 1;
      var ratio = (event.clientX - self.dragX) / width;
      self.shift(self.index + 1 - ratio, false);
    });

    function finish(event) {
      if (self.dragX === null) return;
      var shift = event.clientX - self.dragX;
      self.dragX = null;
      if (Math.abs(shift) >= DRAG_THRESHOLD) {
        self.step(shift < 0 ? 1 : -1);
      } else {
        self.go(self.index);
        self.restart();
      }
    }

    this.root.addEventListener('pointerup', finish);
    this.root.addEventListener('pointercancel', function () {
      if (self.dragX === null) return;
      self.dragX = null;
      self.go(self.index);
      self.restart();
    });
  };

  Slider.prototype.init = function () {
    if (this.count < 2) return;
    var self = this;

    this.addClones();
    this.buildNav();
    this.bindDrag();
    this.go(0, false);

    this.track.addEventListener('transitionend', function (event) {
      if (event.propertyName !== 'transform') return;
      self.busy = false;
      if (self.pending) {
        self.pending = false;
        self.shift(self.index + 1, false);
      }
    });

    this.root.style.setProperty('--slide-time', this.delayLg + 'ms');
    this.root.setAttribute('data-hb-slider-ready', '');
  };

  HB.initApplicationSliders = function () {
    var roots = document.querySelectorAll('[data-hb-slider]:not([data-hb-slider-ready])');
    if (!roots.length) return;

    var sliders = [];
    Array.prototype.forEach.call(roots, function (root) {
      var slider = new Slider(root);
      slider.init();
      sliders.push(slider);
    });

    /* автопрокрутка стартует, когда секция появилась на экране */
    var observer =
      'IntersectionObserver' in window
        ? new IntersectionObserver(
            function (entries) {
              entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                var slider = entry.target.hbSlider;
                if (slider) slider.restart();
                observer.unobserve(entry.target);
              });
            },
            { threshold: 0.1 },
          )
        : null;

    sliders.forEach(function (slider) {
      slider.root.hbSlider = slider;
      if (observer) observer.observe(slider.root);
      else slider.restart();
    });

    document.addEventListener('visibilitychange', function () {
      sliders.forEach(function (slider) {
        if (document.hidden) slider.stop();
        else slider.restart();
      });
    });
  };
})();

/* --------------------------------------------------------------------------
   API слайдера

   Разметка (полосы прогресса и точки создаёт скрипт):

     <div class="hb-slider" data-hb-slider data-autoplay="5000" data-autoplay-sm="3000">
       <div class="hb-slider-track">
         <div class="hb-slider-slide" style="--img: url(...); --img-sm: url(...)"></div>
         <div class="hb-slider-slide" style="--img: url(...)"></div>
       </div>
     </div>

   Атрибуты корня:
     data-hb-slider       — обязательный маркер
     data-autoplay        — интервал автопрокрутки от 1200px, мс
     data-autoplay-sm     — интервал на узких экранах, мс (по умолчанию как выше)
     data-speed           — длительность прокрутки, мс (по умолчанию 1500)

   Скрипт добавляет .hb-slider-bars > .hb-slider-bar (видны от 1200px)
   и .hb-slider-dots > .hb-slider-dot (видны ниже). Активный элемент — .is-active,
   заливка полосы идёт за var(--slide-time). Размеры и позиции задаёт секция.
   -------------------------------------------------------------------------- */
