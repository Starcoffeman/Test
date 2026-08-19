/* ==========================================================================
   main.js — каркас: масштабирование макета, reveal-анимации, запуск секций
   Подключается в <head> без defer: масштаб должен примениться до отрисовки.
   ========================================================================== */
(function () {
  'use strict';

  var HB = (window.HB = window.HB || {});

  /* Базовые ширины макетов оригинала. Для ширины окна берём наибольшую
     подходящую базу и растягиваем макет до окна — так же ведёт себя эталон. */
  var LAYOUT_BASES = [1200, 960, 640, 360];

  HB.baseWidth = function (width) {
    for (var i = 0; i < LAYOUT_BASES.length; i++) {
      if (width >= LAYOUT_BASES[i]) return LAYOUT_BASES[i];
    }
    return LAYOUT_BASES[LAYOUT_BASES.length - 1];
  };

  /* clientWidth, а не 100vw: полоса прокрутки не должна раздувать макет */
  HB.applyScale = function () {
    var root = document.documentElement;
    var width = root.clientWidth || window.innerWidth;
    if (!width) return;
    var zoom = width / HB.baseWidth(width);
    root.style.setProperty('--hb-zoom', String(Math.round(zoom * 10000) / 10000));
  };

  HB.applyScale();

  var scaleFrame = null;
  window.addEventListener('resize', function () {
    if (scaleFrame) return;
    scaleFrame = window.requestAnimationFrame(function () {
      scaleFrame = null;
      HB.applyScale();
    });
  });

  /* Появление блоков при скролле: .reveal → .reveal.active */
  HB.initReveal = function () {
    var items = document.querySelectorAll('.reveal');
    if (!items.length) return;

    if (!('IntersectionObserver' in window)) {
      for (var i = 0; i < items.length; i++) items[i].classList.add('active');
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        });
      },
      { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.1 },
    );

    items.forEach(function (item) {
      observer.observe(item);
    });
  };

  /* Плавный переход по якорям с учётом высоты шапки */
  HB.initAnchors = function () {
    document.addEventListener('click', function (event) {
      var link = event.target.closest && event.target.closest('a[href^="#"]');
      if (!link) return;
      var id = link.getAttribute('href');
      if (!id || id === '#' || id.length < 2) return;
      var target = document.getElementById(id.slice(1));
      if (!target) return;
      event.preventDefault();
      var header = document.querySelector('.header');
      var offset = header ? header.getBoundingClientRect().height : 0;
      var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  };

  /* Запуск всех инициализаторов window.HB.init* */
  function boot() {
    Object.keys(HB).forEach(function (key) {
      if (key.indexOf('init') !== 0 || typeof HB[key] !== 'function') return;
      try {
        HB[key]();
      } catch (error) {
        console.error('HB.' + key + ' failed:', error);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
