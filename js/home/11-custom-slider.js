/* ==========================================================================
   11-custom-slider.js — переиспользуемый слайдер-кроссфейд без библиотек
   Используют секции «решение для ...»: большой слайдер блока и мини-галереи
   внутри карточек. API описан в конце файла.
   ========================================================================== */
(function () {
  'use strict';

  var HB = (window.HB = window.HB || {});

  var ARROW_SVG =
    '<svg viewBox="0 0 94 94" fill="none" aria-hidden="true" focusable="false">' +
    '<path d="M39 68L60 47L39 26" stroke="currentColor" stroke-width="1" vector-effect="non-scaling-stroke"/>' +
    '</svg>';

  var SWIPE_THRESHOLD = 40;

  function createButton(cls, label, html) {
    var button = document.createElement('button');
    button.type = 'button';
    button.className = cls;
    button.setAttribute('aria-label', label);
    if (html) button.innerHTML = html;
    return button;
  }

  function Slider(root) {
    this.root = root;
    this.slides = Array.prototype.slice.call(root.querySelectorAll('.uc-slider-slide'));
    this.index = 0;
    this.timer = null;
    this.autoplay = parseInt(root.getAttribute('data-autoplay'), 10) || 0;

    var fade = root.getAttribute('data-fade');
    root.style.setProperty('--uc-fade', (fade === null ? 600 : parseInt(fade, 10) || 0) + 'ms');
  }

  Slider.prototype.go = function (index) {
    var total = this.slides.length;
    if (!total) return;
    /* зацикливание в обе стороны — как в оригинале */
    this.index = ((index % total) + total) % total;

    for (var i = 0; i < total; i++) {
      this.slides[i].classList.toggle('is-active', i === this.index);
      this.slides[i].setAttribute('aria-hidden', i === this.index ? 'false' : 'true');
    }
    if (this.dots) {
      for (var j = 0; j < this.dots.length; j++) {
        this.dots[j].classList.toggle('is-active', j === this.index);
        this.dots[j].setAttribute('aria-current', j === this.index ? 'true' : 'false');
      }
    }
  };

  /* Любое действие пользователя откладывает следующий автопереход */
  Slider.prototype.step = function (delta) {
    this.go(this.index + delta);
    this.restart();
  };

  Slider.prototype.restart = function () {
    this.stop();
    if (!this.autoplay || this.slides.length < 2) return;
    var self = this;
    this.timer = window.setInterval(function () {
      self.go(self.index + 1);
    }, this.autoplay);
  };

  Slider.prototype.stop = function () {
    if (this.timer) window.clearInterval(this.timer);
    this.timer = null;
  };

  Slider.prototype.buildArrows = function () {
    var self = this;
    var prev = createButton('uc-slider-arrow uc-slider-arrow--prev', 'Предыдущее изображение', ARROW_SVG);
    var next = createButton('uc-slider-arrow uc-slider-arrow--next', 'Следующее изображение', ARROW_SVG);
    prev.addEventListener('click', function () {
      self.step(-1);
    });
    next.addEventListener('click', function () {
      self.step(1);
    });
    this.root.appendChild(prev);
    this.root.appendChild(next);
  };

  Slider.prototype.buildDots = function () {
    var self = this;
    var list = document.createElement('div');
    list.className = 'uc-slider-dots';
    this.dots = [];

    this.slides.forEach(function (slide, i) {
      var dot = createButton('uc-slider-dot', 'Изображение ' + (i + 1));
      dot.addEventListener('click', function () {
        self.go(i);
        self.restart();
      });
      list.appendChild(dot);
      self.dots.push(dot);
    });

    this.root.appendChild(list);
  };

  Slider.prototype.bindSwipe = function () {
    var self = this;
    var startX = null;

    this.root.addEventListener('pointerdown', function (event) {
      if (event.pointerType === 'mouse' && event.button !== 0) return;
      startX = event.clientX;
    });

    this.root.addEventListener('pointerup', function (event) {
      if (startX === null) return;
      var shift = event.clientX - startX;
      startX = null;
      if (Math.abs(shift) < SWIPE_THRESHOLD) return;
      self.step(shift < 0 ? 1 : -1);
    });

    this.root.addEventListener('pointercancel', function () {
      startX = null;
    });
  };

  Slider.prototype.init = function () {
    if (!this.slides.length) return;

    if (this.slides.length > 1) {
      if (this.root.hasAttribute('data-arrows')) this.buildArrows();
      if (this.root.hasAttribute('data-dots')) this.buildDots();
      this.bindSwipe();
    }

    this.go(0);
    this.restart();
    this.root.setAttribute('data-uc-slider-ready', '');
  };

  HB.initCustomSliders = function () {
    var roots = document.querySelectorAll('[data-uc-slider]:not([data-uc-slider-ready])');
    if (!roots.length) return;

    var sliders = [];
    Array.prototype.forEach.call(roots, function (root) {
      var slider = new Slider(root);
      slider.init();
      sliders.push(slider);
    });

    /* На скрытой вкладке автопрокрутка не нужна */
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

   Разметка (минимум — только слайды, точки и стрелки создаёт скрипт):

     <div class="uc-slider" data-uc-slider data-autoplay="3000" data-fade="800" data-dots data-arrows>
       <div class="uc-slider-slide"><img src="../assets/misc/x.jpg" alt="" /></div>
       <div class="uc-slider-slide"><img src="../assets/misc/y.jpg" alt="" loading="lazy" /></div>
     </div>

   Атрибуты корня:
     data-uc-slider        — обязательный маркер, по нему идёт инициализация
     data-autoplay="3000"  — интервал автопрокрутки в мс; нет атрибута или 0 — выключена
     data-fade="800"       — длительность кроссфейда в мс; 0 — мгновенная смена
     data-dots             — точки-буллеты (.uc-slider-dots > .uc-slider-dot)
     data-arrows           — стрелки (.uc-slider-arrow--prev / --next)

   Классы: .uc-slider (размеры задаёт секция), .uc-slider-slide,
   активный слайд — .is-active, активная точка — .uc-slider-dot.is-active.
   Позицию точек и стрелок настраивает CSS секции, размеры по умолчанию —
   в css/11-custom-slider.css (переменные --uc-dot-size, --uc-dots-gap,
   --uc-dots-x, --uc-dots-y, --uc-arrow-size, --uc-arrow-x).

   Слайдер зациклен, поддерживает свайп/перетаскивание, стрелки и точки —
   обычные <button>, доступные с клавиатуры.
   -------------------------------------------------------------------------- */
