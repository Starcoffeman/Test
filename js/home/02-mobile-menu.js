/* ==========================================================================
   02-mobile-menu.js — открытие/закрытие мобильного меню
   ========================================================================== */
(function () {
  'use strict';

  var HB = (window.HB = window.HB || {});

  HB.initMobileMenu = function () {
    var menu = document.getElementById('mobileMenu');
    var burger = document.querySelector('.header-burger') || document.querySelector('a[href="#open"]') || document.querySelector('a[href="#menu"]') || document.querySelector('[data-elem-id="1758129551835"]');
    if (!menu || !burger) return;
    /* защита от повторного вызова (например, если страница ещё и сама
       дублирует вызов HB.initMobileMenu помимо общего boot()): без неё
       на бургер вешается два обработчика клика, и они гасят друг друга —
       клик открывает и тут же закрывает меню, снаружи выглядит как
       «кнопка не работает» */
    if (menu.hasAttribute('data-menu-ready')) return;
    menu.setAttribute('data-menu-ready', '');

    var closeBtn = menu.querySelector('.mobile-menu-close');
    var inner = menu.querySelector('.mobile-menu-inner');
    var headerEl = document.querySelector('.header');

    /* Реальная высота хедера отличается по страницам и брейкпоинтам
       (кое-где переопределяется инлайн-стилями с !important), поэтому
       считаем её на лету, а не хардкодим в CSS — так меню всегда
       начинается ровно под хедером, без зазора и без наезда на него.
       Делим на --hb-zoom: сама .mobile-menu тоже внутри зумленного body,
       поэтому top надо задавать в тех же "незумленных" px, что и высота. */
    function syncMenuOffset() {
      if (!headerEl) return;
      var zoom = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--hb-zoom')) || 1;
      var realHeight = headerEl.getBoundingClientRect().height;
      menu.style.top = realHeight / zoom + 'px';
    }

    syncMenuOffset();
    window.addEventListener('resize', syncMenuOffset);

    function setState(open) {
      if (open) syncMenuOffset();
      menu.classList.toggle('is-open', open);
      menu.setAttribute('aria-hidden', open ? 'false' : 'true');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.classList.toggle('is-locked', open);
    }

    burger.addEventListener('click', function () {
      setState(!menu.classList.contains('is-open'));
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        setState(false);
      });
    }

    /* клик мимо панели и любой переход по ссылке закрывают меню */
    menu.addEventListener('click', function (event) {
      if (!inner || !inner.contains(event.target) || event.target.closest('a')) {
        setState(false);
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && menu.classList.contains('is-open')) setState(false);
    });
  };
})();
