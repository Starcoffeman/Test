/* ==========================================================================
   06-contact-form.js — маска телефона, проверка формы, попап благодарности
   Отправки на сервер нет: успешный сабмит показывает попап «запрос принят».
   ========================================================================== */
(function () {
  'use strict';

  var HB = (window.HB = window.HB || {});

  var PHONE_DIGITS = 11;
  var ERR_PHONE = 'укажите номер телефона';
  var ERR_AGREE = 'подтвердите согласие на обработку персональных данных';

  /* Цифры номера без кода страны: «+7 (» из маски и набранная в начале
     восьмёрка — это код страны, а не первая цифра номера */
  function digitsOf(value) {
    var digits = value.replace(/\D/g, '');
    if (digits[0] === '8' || digits[0] === '7') digits = digits.slice(1);
    if (digits.length === 1 && digits[0] === '8') digits = '';
    return digits.slice(0, PHONE_DIGITS - 1);
  }

  function format(digits) {
    if (!digits) return '';
    var out = '+7 (' + digits.slice(0, 3);
    if (digits.length >= 3) out += ') ' + digits.slice(3, 6);
    if (digits.length >= 6) out += '-' + digits.slice(6, 8);
    if (digits.length >= 8) out += '-' + digits.slice(8, 10);
    return out;
  }

  function bindMask(input) {
    function apply() {
      var digits = digitsOf(input.value);
      input.value = format(digits);
    }

    input.addEventListener('input', apply);
    input.addEventListener('blur', function () {
      if (digitsOf(input.value).length === 0) input.value = '';
    });
    input.addEventListener('focus', function () {
      if (!input.value) input.value = '+7 (';
    });
  }

  function initPopup(popup) {
    function setState(open) {
      popup.classList.toggle('is-open', open);
      popup.setAttribute('aria-hidden', open ? 'false' : 'true');
      document.body.classList.toggle('is-locked', open);
    }

    var closeBtn = popup.querySelector('.offer-popup-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        setState(false);
      });
    }

    popup.addEventListener('click', function (event) {
      if (event.target === popup) setState(false);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && popup.classList.contains('is-open')) setState(false);
    });

    return setState;
  }

  HB.initOfferForm = function () {
    var form = document.querySelector('.offer-form');
    var popup = document.getElementById('offerPopup');
    if (!form || !popup) return;

    var phone = form.querySelector('.offer-input');
    var agreeBox = form.querySelector('.offer-check');
    var agree = form.querySelector('.offer-check-input');
    var error = form.querySelector('.offer-error');
    var showPopup = initPopup(popup);

    bindMask(phone);

    function setError(message) {
      error.textContent = message || '';
      error.hidden = !message;
    }

    function clearState() {
      phone.classList.remove('is-invalid');
      agreeBox.classList.remove('is-invalid');
      setError('');
    }

    phone.addEventListener('input', clearState);
    agree.addEventListener('change', clearState);

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      clearState();

      if (digitsOf(phone.value).length < PHONE_DIGITS - 1) {
        phone.classList.add('is-invalid');
        setError(ERR_PHONE);
        phone.focus();
        return;
      }

      if (!agree.checked) {
        agreeBox.classList.add('is-invalid');
        setError(ERR_AGREE);
        return;
      }

      form.reset();
      showPopup(true);
    });
  };
})();
