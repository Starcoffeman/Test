/* ==========================================================================
   25-callback-modal.js — модалка "обратный звонок" (#callbackModal)
   Та же логика, что и блок "CALLBACK МОДАЛКА" в scripts/script.js
   (используется на walls.html/designers.html/fetr.html/ceiling.html),
   перенесённая сюда отдельным модулем — index.html не подключает
   scripts/script.js целиком (у него свой набор js/home/* модулей).
   ========================================================================== */
(function () {
  'use strict';

  var HB = (window.HB = window.HB || {});

  HB.initCallbackModal = function () {
    var modal = document.getElementById('callbackModal');
    if (!modal || modal.hasAttribute('data-callback-modal-ready')) return;
    modal.setAttribute('data-callback-modal-ready', '');

    var openBtns = document.querySelectorAll(
      '.btn-callback, .btn-calculate, .modal-trigger-btn, a[href="#callbackModal"]'
    );
    var closeBtn = document.getElementById('closeCallback');
    var backdrop = modal.querySelector('.modal-backdrop');

    function openModal(event) {
      if (event) event.preventDefault();
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }

    openBtns.forEach(function (btn) {
      btn.addEventListener('click', openModal);
    });

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (backdrop) backdrop.addEventListener('click', closeModal);

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && modal.classList.contains('active')) closeModal();
    });
  };
})();
