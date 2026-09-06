/* ==========================================================================
   catalog-page.js — хотспоты «+» на первом экране страницы «Каталог»
   Клик по хотспоту: прокрутка к нужному разделу + вспышка оранжевым,
   которая сама гаснет через пару секунд.
   ========================================================================== */
(function () {
  'use strict';

  var HB = (window.HB = window.HB || {});
  var HIGHLIGHT_MS = 2200;

  HB.initCatalogHero = function () {
    var spots = Array.prototype.slice.call(
      document.querySelectorAll('.catalog-hotspot'),
    );
    if (!spots.length) return;

    var flashTimer = null;
    var scrollAnim = null;

    function easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    // Своя плавная прокрутка на requestAnimationFrame.
    // window.scrollTo({behavior:'smooth'}) на этой странице молча игнорится
    // (на body висит zoom), поэтому анимируем позицию руками.
    var scrollFallback = null;

    function finishScroll(destY) {
      var header = document.querySelector('.header');
      if (header) header.classList.remove('is-hidden');
    }

    function animateScrollTo(destY) {
      if (scrollAnim) cancelAnimationFrame(scrollAnim);
      clearTimeout(scrollFallback);
      var startY = window.pageYOffset;
      var diff = destY - startY;
      if (Math.abs(diff) < 2) return;
      var duration = Math.min(1200, Math.max(450, Math.abs(diff) * 0.5));
      var startTime = null;

      // страховка: если rAF не крутится (вкладка неактивна и т.п.) —
      // до места всё равно доедем разовым прыжком
      scrollFallback = setTimeout(function () {
        if (scrollAnim) cancelAnimationFrame(scrollAnim);
        scrollAnim = null;
        if (Math.abs(window.pageYOffset - destY) > 4) {
          window.scrollTo(0, destY);
        }
        finishScroll(destY);
      }, duration + 250);

      function frame(now) {
        if (startTime === null) startTime = now;
        var p = Math.min(1, (now - startTime) / duration);
        window.scrollTo(0, startY + diff * easeInOutCubic(p));
        if (p < 1) {
          scrollAnim = requestAnimationFrame(frame);
        } else {
          scrollAnim = null;
          clearTimeout(scrollFallback);
          // приехали — вернём шапку (автоскрытие прячет её при скролле вниз),
          // чтобы начало раздела не оказалось под ней
          finishScroll(destY);
          requestAnimationFrame(function () {
            finishScroll(destY);
          });
        }
      }

      scrollAnim = requestAnimationFrame(frame);
    }

    function goTo(sel) {
      var target = sel ? document.querySelector(sel) : null;
      if (!target) return;
      // rect.top + pageYOffset — единая система координат с scrollTo даже при
      // zoom на body (сумма offsetTop даёт промах кратно zoom-фактору)
      var rect = target.getBoundingClientRect();
      var header = document.querySelector('.header');
      var headerH = header ? header.getBoundingClientRect().height : 0;
      var dest = window.pageYOffset + rect.top - headerH - 14;
      animateScrollTo(Math.max(0, dest));
    }

    spots.forEach(function (spot) {
      spot.addEventListener('click', function () {
        // вспышка: подсвечиваем только текущий, остальные гасим
        spots.forEach(function (s) {
          s.classList.remove('is-active');
        });
        spot.classList.add('is-active');

        clearTimeout(flashTimer);
        flashTimer = setTimeout(function () {
          spot.classList.remove('is-active');
        }, HIGHLIGHT_MS);

        // навигация к соответствующему разделу каталога
        goTo(spot.getAttribute('data-scroll-target'));
      });
    });
  };

  /* ---- Модалка «поможем с дизайн-проектом» ---- */
  HB.initConsult = function () {
    var modal = document.getElementById('consultModal');
    if (!modal) return;

    var form = modal.querySelector('.consult-form');
    var phone = modal.querySelector('.consult-input');
    var agreeField = modal.querySelector('.consult-agree');
    var agree = modal.querySelector('.consult-agree-input');
    var error = modal.querySelector('.consult-error');
    var success = modal.querySelector('.consult-success');

    function open() {
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('consult-lock');
      if (phone) phone.focus();
    }

    function close() {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('consult-lock');
    }

    function clearErrors() {
      if (error) {
        error.hidden = true;
        error.textContent = '';
      }
      if (phone) phone.classList.remove('is-invalid');
      if (agreeField) agreeField.classList.remove('is-invalid');
    }

    document.addEventListener('click', function (e) {
      if (e.target.closest('[data-open-consult]')) {
        e.preventDefault();
        open();
      } else if (e.target.closest('[data-close-consult]')) {
        close();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) close();
    });

    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      clearErrors();

      var okPhone = phone && phone.value.trim().length >= 6;
      var okAgree = agree && agree.checked;

      if (!okPhone || !okAgree) {
        if (!okPhone && phone) phone.classList.add('is-invalid');
        if (!okAgree && agreeField) agreeField.classList.add('is-invalid');
        if (error) {
          error.textContent = !okPhone
            ? 'укажите телефон'
            : 'подтвердите согласие';
          error.hidden = false;
        }
        return;
      }

      // успех: зелёная плашка над формой, форма очищается, кнопка снова белая
      form.reset();
      clearErrors();
      if (success) success.hidden = false;
    });

    // при повторном открытии/вводе прячем плашку успеха
    form.addEventListener('input', function () {
      if (success) success.hidden = true;
    });
  };
})();
