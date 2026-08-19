/* ==========================================================================
   03-hero.js — слайдер первого экрана (автопрокрутка + индикаторы)
   ========================================================================== */
(function () {
  'use strict';

  var HB = (window.HB = window.HB || {});

  function setup(root) {
    var track = root.querySelector('.hero-track');
    if (!track) return;

    var total = track.children.length - 1; // последний кадр — клон первого
    if (total < 1) return;

    var nav = document.querySelector(root.getAttribute('data-nav') || '');
    var marks = nav ? Array.prototype.slice.call(nav.children) : [];
    var interval = parseInt(root.getAttribute('data-interval'), 10) || 5000;
    var index = 0;
    var timer = null;

    function move(next) {
      index = next;
      track.style.transform = 'translateX(' + -index * 100 + '%)';

      var current = index % total;
      marks.forEach(function (mark, i) {
        mark.classList.toggle('is-active', i === current);
      });
    }

    track.addEventListener('transitionend', function (e) {
      if (e.target !== track || e.propertyName !== 'transform' || index !== total) return;
      // доехали до клона — возвращаемся на первый кадр без анимации
      track.style.transition = 'none';
      index = 0;
      track.style.transform = 'translateX(0)';
      void track.offsetHeight; // форсируем пересчёт, иначе снятие transition не применится
      track.style.transition = '';
    });

    function restart() {
      window.clearInterval(timer);
      timer = window.setInterval(function () {
        if (!root.offsetHeight) return; // слайдер скрыт медиазапросом
        move(index + 1);
      }, interval);
    }

    marks.forEach(function (mark, i) {
      mark.addEventListener('click', function () {
        if (i === index % total) return;
        move(i);
        restart();
      });
    });

    restart();
  }

  HB.initHeroSlider = function () {
    Array.prototype.forEach.call(document.querySelectorAll('.hero-slider'), setup);
  };
})();
