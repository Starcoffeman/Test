/* ==========================================================================
   20-manager.js — параллакс фото в блоке «персональный менеджер».
   В оригинале кадр внутри рамки проезжает сверху вниз по мере прокрутки:
   в начале виден верх снимка, в конце — низ. Размеры кадра для каждого
   базового макета взяты из эталона.
   ========================================================================== */
(function () {
  'use strict';

  var HB = (window.HB = window.HB || {});

  /* offset — насколько зона проезда выше видимой рамки,
     track — высота зоны проезда, image — высота снимка (px базового макета) */
  var FRAMES = {
    1200: { offset: 36.3, track: 795, image: 1034 },
    960: { offset: 36.3, track: 632, image: 822 },
    640: { offset: 29.75, track: 843, image: 1096 },
    360: { offset: 17.2, track: 468, image: 608 },
  };

  HB.initManagerParallax = function () {
    var photo = document.querySelector('.manager-photo');
    if (!photo) return;

    var image = photo.querySelector('img');
    if (!image) return;

    var motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    var frame = null;

    function update() {
      frame = null;
      if (motionQuery.matches) return;

      var width = document.documentElement.clientWidth || window.innerWidth;
      var base = HB.baseWidth(width);
      var box = FRAMES[base];
      if (!box) return;

      var zoom = width / base;
      var windowHeight = window.innerHeight;
      var trackHeight = box.track * zoom;
      var trackTop = photo.getBoundingClientRect().top - box.offset * zoom;

      var progress = (windowHeight - trackTop) / (windowHeight + trackHeight);
      progress = Math.min(1, Math.max(0, progress));

      image.style.top = -(box.offset + (box.image - box.track) * progress) + 'px';
    }

    function schedule() {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    }

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    update();
  };
})();
