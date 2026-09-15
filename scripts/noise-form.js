/* ==========================================================================
   noise-form.js — форма «поможем устранить шум и эхо» (.noise-control-section):
   по сабмиту показывает зелёную плашку над формой, очищает поля и снимает
   фокус/hover с кнопки, чтобы она вернулась в обычное состояние.
   ========================================================================== */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('noiseForm');
    if (!form) return;

    var success = document.getElementById('noiseSuccess');
    var submitBtn = form.querySelector('.btn-submit-grey');

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      if (success) success.hidden = false;

      form.reset();
      if (submitBtn) submitBtn.blur();
    });
  });
})();
