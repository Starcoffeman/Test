/* ==========================================================================
   22-footer.js — плавающая кнопка мессенджеров в правом нижнем углу
   ========================================================================== */
(function () {
  'use strict';

  var HB = (window.HB = window.HB || {});

  HB.initContactWidget = function () {
    var fab = document.querySelector('.contact-fab');
    if (!fab) return;

    var toggle = fab.querySelector('.contact-fab-toggle');
    if (!toggle) return;

    function setOpen(open) {
      fab.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
    }

    toggle.addEventListener('click', function () {
      setOpen(!fab.classList.contains('is-open'));
    });

    document.addEventListener('click', function (event) {
      if (fab.contains(event.target)) return;
      setOpen(false);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') setOpen(false);
    });
  };
})();
