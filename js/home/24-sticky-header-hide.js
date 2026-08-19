/* ==========================================================================
   24-sticky-header-hide.js — скрытие шапки при скролле вниз, показ при скролле
   вверх. Работает только с .header--autohide (opt-in модификатор в разметке
   страницы) — index.html этот класс не подключает, его хедер не меняется.
   Повторяет поведение .uc-scrollmenu из исходного designers.html.
   ========================================================================== */
(function () {
  'use strict';

  var HB = (window.HB = window.HB || {});

  var SHOW_ABOVE = 400; /* выше этой отметки шапка всегда видна */

  HB.initStickyHeaderHide = function () {
    var header = document.querySelector('.header--autohide');
    if (!header || header.hasAttribute('data-autohide-ready')) return;
    header.setAttribute('data-autohide-ready', '');

    var lastY = window.pageYOffset || document.documentElement.scrollTop;
    var frame = null;

    function update() {
      frame = null;
      var y = window.pageYOffset || document.documentElement.scrollTop;

      if (y <= SHOW_ABOVE) {
        header.classList.remove('is-hidden');
      } else if (y > lastY) {
        header.classList.add('is-hidden');
      } else if (y < lastY) {
        header.classList.remove('is-hidden');
      }

      lastY = y;
    }

    window.addEventListener(
      'scroll',
      function () {
        if (frame) return;
        frame = window.requestAnimationFrame(update);
      },
      { passive: true },
    );
  };
})();
