(function () {
  'use strict';

  function fitTildaResponsive() {
    var winWidth = window.innerWidth || document.documentElement.clientWidth;
    if (!winWidth) return;

    // Prevent horizontal overflow
    document.documentElement.style.overflowX = 'hidden';
    document.body.style.overflowX = 'hidden';

    var artboards = document.querySelectorAll('.t396__artboard');
    if (!artboards.length) return;

    artboards.forEach(function (artboard) {
      // Clear conflicting manual zoom/transform to prevent double-scaling
      artboard.style.zoom = '';
      artboard.style.transform = '';
      artboard.style.transformOrigin = '';

      // Center artboards on page
      artboard.style.marginLeft = 'auto';
      artboard.style.marginRight = 'auto';

      // If screen is smaller than 1200px (e.g. 1024px - 1199px), scale down so header and elements fit 100%
      if (winWidth < 1200 && winWidth >= 960) {
        var scale = winWidth / 1200;
        artboard.style.zoom = scale;
      }
    });

    var records = document.querySelectorAll('.t-records');
    records.forEach(function (rec) {
      rec.style.overflowX = 'hidden';
      rec.style.maxWidth = '100%';
    });
  }

  fitTildaResponsive();
  window.addEventListener('resize', fitTildaResponsive);
  document.addEventListener('DOMContentLoaded', fitTildaResponsive);
  window.addEventListener('load', fitTildaResponsive);
  setTimeout(fitTildaResponsive, 200);
  setTimeout(fitTildaResponsive, 600);
})();
