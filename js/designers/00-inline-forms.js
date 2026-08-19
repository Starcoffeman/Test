/* ==========================================================================
   00-inline-forms.js — инлайн-формы «телефон + согласие» (цифровой шоурум,
   о компании на designers.html). Тот же паттерн, что и js/home/23-lead-modal.js
   (маска телефона +7 (999) 999-99-99, блокирующая валидация, состояние
   «успех» без реальной отправки на бэкенд), но без модалки/диалога —
   форма встроена прямо в разметку секции. Маска/валидация продублированы
   намеренно небольшим кусочком кода, чтобы не трогать публичное поведение
   js/home/23-lead-modal.js (общий файл с index.html).
   Разметка (минимум):

     <div class="inline-form-wrap">
       <form class="inline-form inline-form--dark|--light" data-inline-form novalidate>
         <label class="inline-form-field">
           <span class="inline-form-label">телефон</span>
           <input class="inline-form-input" type="tel" name="phone" required />
         </label>
         <label class="inline-form-consent">
           <input type="checkbox" name="consent" required />
           <span>...</span>
         </label>
         <button class="inline-form-submit" type="submit">получить</button>
       </form>
       <p class="inline-form-success">заявка отправлена...</p>
     </div>

   При успешной отправке на .inline-form-wrap добавляется класс .is-success —
   css/designers/00-inline-forms.css прячет форму и показывает .inline-form-success.
   ========================================================================== */
(function () {
  'use strict';

  var HB = (window.HB = window.HB || {});

  function digitsOnly(value) {
    return (value || '').replace(/\D/g, '');
  }

  /* Приводим ввод телефона к маске +7 (999) 999-99-99, первая цифра всегда 7 */
  function formatPhone(raw) {
    var digits = digitsOnly(raw);
    if (digits.charAt(0) === '8') digits = '7' + digits.slice(1);
    if (digits.charAt(0) !== '7') digits = '7' + digits;
    digits = digits.slice(0, 11);

    var rest = digits.slice(1);
    var out = '+7';
    if (rest.length) out += ' (' + rest.slice(0, 3);
    if (rest.length >= 3) out += ')';
    if (rest.length > 3) out += ' ' + rest.slice(3, 6);
    if (rest.length > 6) out += '-' + rest.slice(6, 8);
    if (rest.length > 8) out += '-' + rest.slice(8, 10);
    return out;
  }

  HB.initInlineForms = function () {
    var forms = document.querySelectorAll('[data-inline-form]');

    forms.forEach(function (form) {
      if (form.hasAttribute('data-inline-form-ready')) return;
      form.setAttribute('data-inline-form-ready', '');

      var wrap = form.closest('.inline-form-wrap') || form.parentElement;
      var phoneInput = form.querySelector('input[type="tel"]');
      var consentInput = form.querySelector('input[type="checkbox"]');
      var consentLabel = consentInput ? consentInput.closest('.inline-form-consent') : null;

      /* ===== МАСКА ТЕЛЕФОНА ===== */
      if (phoneInput) {
        phoneInput.addEventListener('focus', function () {
          if (!phoneInput.value) phoneInput.value = '+7 (';
        });
        phoneInput.addEventListener('input', function () {
          phoneInput.value = formatPhone(phoneInput.value);
        });
      }

      /* ===== ВАЛИДАЦИЯ + САБМИТ ===== */
      form.addEventListener('submit', function (event) {
        event.preventDefault();
        var valid = true;

        if (phoneInput && digitsOnly(phoneInput.value).length < 11) {
          phoneInput.classList.add('is-invalid');
          valid = false;
        } else if (phoneInput) {
          phoneInput.classList.remove('is-invalid');
        }

        if (consentInput && !consentInput.checked) {
          valid = false;
          if (consentLabel) consentLabel.classList.add('is-invalid');
        } else if (consentLabel) {
          consentLabel.classList.remove('is-invalid');
        }

        if (!valid) return;

        /* бэкенда нет — просто показываем состояние успеха */
        if (wrap) wrap.classList.add('is-success');
        form.reset();
      });
    });
  };
})();
