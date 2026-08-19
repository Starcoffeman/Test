/* ==========================================================================
   header-standalone.js — скрипт управления шапкой и мобильным меню
   ========================================================================== */
(function () {
  'use strict';

  function initHeaderMenu() {
    var burger = document.querySelector('.header-burger');
    var menu = document.getElementById('mobileMenu');
    var closeBtn = document.querySelector('.mobile-menu-close');

    if (burger && menu) {
      burger.addEventListener('click', function () {
        menu.classList.add('is-open');
        document.body.classList.add('is-locked');
        burger.setAttribute('aria-expanded', 'true');
      });
    }

    if (closeBtn && menu) {
      closeBtn.addEventListener('click', function () {
        menu.classList.remove('is-open');
        document.body.classList.remove('is-locked');
        if (burger) burger.setAttribute('aria-expanded', 'false');
      });
    }

    var mobileLinks = document.querySelectorAll('.mobile-menu-link');
    mobileLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        if (menu) menu.classList.remove('is-open');
        document.body.classList.remove('is-locked');
        if (burger) burger.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', function (event) {
      var link = event.target.closest && event.target.closest('a[href^="#"]');
      if (!link) return;
      var id = link.getAttribute('href');
      if (!id || id === '#' || id.length < 2) return;
      var target = document.getElementById(id.slice(1)) || document.querySelector('[id*="' + id.slice(1) + '"]');
      if (!target) return;
      event.preventDefault();
      var header = document.querySelector('.header');
      var offset = header ? header.getBoundingClientRect().height : 0;
      var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeaderMenu);
  } else {
    initHeaderMenu();
  }
})();
