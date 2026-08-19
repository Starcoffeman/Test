/* ==========================================================================
   23-lead-modal.js — модальная форма заявки (переиспользуемый компонент)
   Без jQuery/Tilda: нативный <dialog>, простая клиентская валидация,
   переключение в состояние «успех» без реальной отправки на бэкенд.
   API — см. док-комментарий в конце файла.
   ========================================================================== */
(function () {
  'use strict';

  var HB = (window.HB = window.HB || {});

  var PHONE_MASK = '+7 (999) 999-99-99';

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

  HB.initLeadModal = function () {
    var modal = document.getElementById('leadModal');
    if (!modal || modal.hasAttribute('data-lead-modal-ready')) return;
    modal.setAttribute('data-lead-modal-ready', '');

    var supportsDialog = typeof modal.showModal === 'function';
    var form = modal.querySelector('.lead-modal-form');
    var nameInput = modal.querySelector('[name="name"]');
    var phoneInput = modal.querySelector('[name="phone"]');
    var consentInput = modal.querySelector('[name="consent"]');
    var successBtn = modal.querySelector('.lead-modal-success-btn');
    var lastFocused = null;

    function open() {
      lastFocused = document.activeElement;
      modal.classList.remove('is-success');
      if (supportsDialog) {
        if (!modal.open) modal.showModal();
      } else {
        modal.setAttribute('open', '');
      }
      document.body.classList.add('is-locked');
      window.setTimeout(function () {
        if (nameInput) nameInput.focus();
      }, 10);
    }

    function close() {
      if (supportsDialog) {
        if (modal.open) modal.close();
      } else {
        modal.removeAttribute('open');
      }
      document.body.classList.remove('is-locked');
      if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
      /* убираем #form из адресной строки, чтобы модалка не открывалась заново при reload */
      if (window.location.hash === '#form') {
        history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    }

    /* ===== ОТКРЫТИЕ ПО КЛИКУ ===== */
    document.addEventListener('click', function (event) {
      var trigger = event.target.closest && event.target.closest('[href="#form"], [data-open-modal="lead-form"]');
      if (!trigger) return;
      event.preventDefault();
      open();
    });

    /* ===== ЗАКРЫТИЕ ===== */
    modal.querySelectorAll('[data-lead-modal-close]').forEach(function (btn) {
      btn.addEventListener('click', function (event) {
        event.preventDefault();
        close();
      });
    });

    modal.addEventListener('click', function (event) {
      /* клик по backdrop у <dialog> — это клик по самому элементу, не по контенту */
      if (event.target === modal) close();
    });

    if (supportsDialog) {
      modal.addEventListener('cancel', function (event) {
        event.preventDefault();
        close();
      });
    }

    /* дублируем Escape явным слушателем: некоторые браузеры/автоматизации
       не эмитят нативный 'cancel' на <dialog>, а без <dialog> это единственный путь */
    document.addEventListener('keydown', function (event) {
      if (event.key !== 'Escape') return;
      var isOpen = supportsDialog ? modal.open : modal.hasAttribute('open');
      if (isOpen) close();
    });

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
    if (form) {
      form.addEventListener('submit', function (event) {
        event.preventDefault();
        var valid = true;

        if (nameInput && !nameInput.value.trim()) {
          nameInput.classList.add('is-invalid');
          valid = false;
        } else if (nameInput) {
          nameInput.classList.remove('is-invalid');
        }

        if (phoneInput && digitsOnly(phoneInput.value).length < 11) {
          phoneInput.classList.add('is-invalid');
          valid = false;
        } else if (phoneInput) {
          phoneInput.classList.remove('is-invalid');
        }

        if (consentInput && !consentInput.checked) {
          valid = false;
          consentInput.closest('.lead-modal-consent').classList.add('is-invalid');
        } else if (consentInput) {
          consentInput.closest('.lead-modal-consent').classList.remove('is-invalid');
        }

        if (!valid) return;

        /* бэкенда нет — просто показываем состояние успеха */
        modal.classList.add('is-success');
        if (nameInput) nameInput.focus();
        form.reset();
      });
    }

    if (successBtn) {
      successBtn.addEventListener('click', function (event) {
        event.preventDefault();
        close();
      });
    }

    /* ===== АВТООТКРЫТИЕ ПО #form В АДРЕСЕ ===== */
    if (window.location.hash === '#form') open();
    window.addEventListener('hashchange', function () {
      if (window.location.hash === '#form') open();
    });
  };
})();

/* --------------------------------------------------------------------------
   API модалки заявки

   Разметка (минимум):

     <dialog class="lead-modal" id="leadModal" aria-labelledby="leadModalTitle">
       <div class="lead-modal-card">
         <button type="button" class="lead-modal-close" data-lead-modal-close aria-label="Закрыть">×</button>

         <h2 class="lead-modal-title" id="leadModalTitle">обсудим проект?</h2>
         <p class="lead-modal-subtitle">подберем оптимальные материалы и предоставим техническую информацию</p>

         <form class="lead-modal-form" novalidate>
           <label class="lead-modal-field">
             <span class="lead-modal-label">имя</span>
             <input class="lead-modal-input" type="text" name="name" required />
           </label>
           <label class="lead-modal-field">
             <span class="lead-modal-label">телефон</span>
             <input class="lead-modal-input" type="tel" name="phone" required />
           </label>
           <label class="lead-modal-field">
             <span class="lead-modal-label">ваш комментарий</span>
             <textarea class="lead-modal-textarea" name="comment"></textarea>
           </label>
           <label class="lead-modal-consent">
             <input type="checkbox" name="consent" required />
             <span>нажимая на кнопку, я подтверждаю согласие с
               <a href="/privacy">политикой конфиденциальности</a> и даю согласие на
               <a href="/agreement">обработку персональных данных</a></span>
           </label>
           <button type="submit" class="lead-modal-submit btn btn--solid">отправить</button>
         </form>

         <div class="lead-modal-success">
           <h2 class="lead-modal-success-title">ваш запрос принят!</h2>
           <p class="lead-modal-success-text">мы свяжемся с Вами в ближайшее время</p>
           <button type="button" class="lead-modal-success-btn btn btn--solid">хорошо</button>
         </div>
       </div>
     </dialog>

   Открытие: любой элемент с href="#form" или data-open-modal="lead-form" в любом
   месте документа (делегирование клика на document, слушатель вешается один раз).
   Также открывается автоматически, если страница загружена/меняет хэш на #form.

   Закрытие: клик по [data-lead-modal-close], клик по backdrop/мимо карточки,
   Escape (через нативное поведение <dialog> или явный слушатель без него).

   Деградация без <dialog>: тот же HTML, JS сам определяет поддержку через
   modal.showModal — при её отсутствии используется атрибут [open] + фиксированное
   позиционирование из css/home/23-lead-modal.css (.lead-modal без ::backdrop).
   -------------------------------------------------------------------------- */
