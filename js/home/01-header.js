/* ==========================================================================
   01-header.js — подсветка активного пункта нижнего ряда меню при скролле
   ========================================================================== */
(function () {
  'use strict';

  var HB = (window.HB = window.HB || {});

  HB.initHeaderSpy = function () {
    var links = Array.prototype.slice.call(document.querySelectorAll('.header-menu-link'));
    if (!links.length) return;

    var targets = links
      .map(function (link) {
        var id = (link.getAttribute('href') || '').slice(1);
        var section = id ? document.getElementById(id) : null;
        return section ? { link: link, section: section } : null;
      })
      .filter(Boolean);

    if (!targets.length) return;

    var frame = null;

    function update() {
      frame = null;
      var header = document.querySelector('.header');
      var offset = (header ? header.getBoundingClientRect().height : 0) + 1;
      var current = targets[0];

      targets.forEach(function (item) {
        if (item.section.getBoundingClientRect().top <= offset) current = item;
      });

      links.forEach(function (link) {
        link.classList.toggle('is-active', link === current.link);
      });
    }

    window.addEventListener(
      'scroll',
      function () {
        if (frame) return;
        frame = window.requestAnimationFrame(update);
      },
      { passive: true },
    );

    update();
  };
})();
