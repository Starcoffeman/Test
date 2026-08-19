/* ==========================================================================
   18-gallery.js — параллакс кадров в коллаже галереи
   Кадр увеличен на 30 % относительно плитки; пока плитка проходит через окно,
   он сдвигается вверх на половину этого запаса. Так же ведёт себя оригинал
   (simpleParallax, orientation: up, delay: 1.2).
   ========================================================================== */
(function () {
  'use strict';

  var HB = (window.HB = window.HB || {});

  var SCALE = 1.3;
  var EASING = 'transform 1.2s cubic-bezier(0, 0, 0, 1)';

  HB.initGallery = function () {
    var items = Array.prototype.slice.call(document.querySelectorAll('.gallery-item'));
    if (!items.length) return;

    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduced.matches) return;

    items.forEach(function (item) {
      var img = item.querySelector('img');
      if (img) img.style.transition = EASING;
    });

    var ticking = false;

    function update() {
      ticking = false;
      var viewportHeight = window.innerHeight || document.documentElement.clientHeight;

      items.forEach(function (item) {
        var img = item.querySelector('img');
        // offsetHeight — в координатах макета: transform не масштабируется zoom'ом
        var height = item.offsetHeight;
        if (!img || !height) return;

        var rect = item.getBoundingClientRect();
        if (!rect.height) return;

        var progress = (viewportHeight - rect.top) / (viewportHeight + rect.height);
        progress = Math.min(1, Math.max(0, progress));

        var shift = (0.5 - progress) * height * (SCALE - 1);
        img.style.transform = 'translate3d(0, ' + shift.toFixed(2) + 'px, 0) scale(' + SCALE + ')';
      });
    }

    function request() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    }

    window.addEventListener('scroll', request, { passive: true });
    window.addEventListener('resize', request);
    update();
  };
})();
