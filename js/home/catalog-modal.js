/* ==========================================================================
   catalog-modal.js — генератор модального окна панели каталога.

   Одно окно на всю страницу: при клике по карточке оно СОБИРАЕТСЯ заново из
   данных (HB.panelData + HB.panelDefaults, см. catalog-panels.js). Отдельной
   вёрстки под каждую панель нет.

   Слева — слайдер с автопрокруткой и полосками прогресса (как в hero-слайдере
   проекта, scripts/slider.js), под ним — кнопки. Справа — описание.
   Плюс: лёгкое увеличение карточки при наведении (одинаковое для всех).
   ========================================================================== */
(function () {
  'use strict';

  var HB = (window.HB = window.HB || {});

  var SLIDE_MS = 5000;

  var CARD_SELECTOR = [
    '.veneer-card',
    '.felt-card',
    '.small-card',
    '.pvc-card',
    '.baffle-card',
    '.hbaffle-card',
    '.float-card',
    '.armstrong-card',
    '.embed-card',
    '.lamp-card',
    '.screen-card'
  ].join(',');

  function slug(str) {
    return String(str)
      .toLowerCase()
      .replace(/<[^>]+>/g, ' ')
      .replace(/[^a-zа-я0-9ё]+/gi, '-')
      .replace(/^-+|-+$/g, '');
  }

  function esc(str) {
    return String(str == null ? '' : str).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  function nl2br(str) {
    return esc(str).replace(/\n/g, '<br>');
  }

  function swatchList(items) {
    return (items || [])
      .map(function (v) {
        /* цвет (#hex / rgb(...) / hsl(...)) — рисуем кружок фоном,
           иначе это путь к картинке-текстуре */
        if (/^(#|rgb|hsl)/i.test(String(v).trim())) {
          return (
            '<span class="pm-swatch" style="background:' + esc(v) + '"></span>'
          );
        }
        return '<img class="pm-swatch" src="' + esc(v) + '" alt="" loading="lazy" />';
      })
      .join('');
  }

  /* ---- сбор данных карточки + пользовательских данных ---- */
  function resolveData(card) {
    var cap = card.querySelector('figcaption');
    var img = card.querySelector('img');
    var key = card.getAttribute('data-panel') || slug(cap ? cap.innerHTML : '');

    var base = {
      title: cap ? cap.innerHTML.trim() : '',
      price: '',
      stats: [],
      description: '',
      specs: [],
      slides: img ? [img.getAttribute('src')] : [],
      faceColorsTitle: 'цвет лицевого слоя',
      faceColors: [],
      backingColorsTitle: 'цвет подложки',
      backingColors: []
    };

    var custom = (HB.panelData && HB.panelData[key]) || {};
    var data = {};
    Object.keys(base).forEach(function (k) {
      data[k] = k in custom ? custom[k] : base[k];
    });
    if (!data.slides || !data.slides.length) {
      data.slides = img ? [img.getAttribute('src')] : [];
    }

    var d = HB.panelDefaults || {};
    data.ctaPrimary = custom.ctaPrimary || d.ctaPrimary || 'запросить расчёт';
    data.ctaSecondary = custom.ctaSecondary || d.ctaSecondary || 'запросить каталог';
    data.samplesTitle = custom.samplesTitle || d.samplesTitle || '';
    data.samplesText = custom.samplesText || d.samplesText || '';
    data.samplesImage = custom.samplesImage || d.samplesImage || '';
    data.samplesStrip = custom.samplesStrip || d.samplesStrip || [];
    data.specsSplit = custom.specsSplit;
    data.key = key;
    return data;
  }

  /* ---- разметка окна ---- */
  function buildInner(data) {
    var multi = data.slides.length > 1;

    /* слайд может быть строкой-путём или { src, fit: 'contain'|'cover' }.
       По умолчанию: первый — 'contain' («товар на сером»), остальные — 'cover'. */
    var slides = data.slides
      .map(function (s, i) {
        var src = typeof s === 'string' ? s : s.src;
        var fit = (s && s.fit) || (i === 0 ? 'contain' : 'cover');
        return (
          '<div class="pm-slide pm-slide--' +
          fit +
          '"><img src="' +
          esc(src) +
          '" alt="" /></div>'
        );
      })
      .join('');

    var segs = data.slides
      .map(function (_, i) {
        return (
          '<button class="pm-seg" type="button" data-pm-go="' +
          i +
          '" aria-label="Слайд ' +
          (i + 1) +
          '"><span class="pm-seg-fill"></span></button>'
        );
      })
      .join('');

    var stats = (data.stats || [])
      .map(function (s) {
        return (
          '<div class="pm-stat"><span class="pm-stat-value">' +
          esc(s.value) +
          '</span><span class="pm-stat-label">' +
          esc(s.label) +
          '</span></div>'
        );
      })
      .join('');

    function specRow(s) {
      return (
        '<div class="pm-spec"><span class="pm-spec-label">' +
        esc(s.label) +
        '</span><span class="pm-spec-value">' +
        nl2br(s.value) +
        '</span></div>'
      );
    }
    /* Раскладка спецификаций:
       - specsSplit = число N — колонки: слева строки 0..N-1, справа остальные
         (размер слева, толщины справа);
       - specsSplit = 'grid' — сетка 2×N, заполнение построчно (0,1 / 2,3 …). */
    var allSpecs = data.specs || [];
    var split = data.specsSplit;
    var specs = '';
    if (allSpecs.length) {
      if (split === 'grid') {
        specs =
          '<div class="pm-specs-grid">' +
          allSpecs.map(specRow).join('') +
          '</div>';
      } else {
        var n = split || 1;
        specs =
          '<div class="pm-specs-col">' +
          allSpecs.slice(0, n).map(specRow).join('') +
          '</div><div class="pm-specs-col">' +
          allSpecs.slice(n).map(specRow).join('') +
          '</div>';
      }
    }

    function swGroup(title, items) {
      /* нет группы (напр. у однослойных панелей нет «цвета подложки») —
         оставляем пустое место той же высоты, чтобы окно не становилось ниже */
      if (!items || !items.length) {
        return '<div class="pm-swgroup pm-swgroup--spacer" aria-hidden="true"></div>';
      }
      return (
        '<div class="pm-swgroup"><p class="pm-swtitle">' +
        esc(title) +
        '</p><div class="pm-swatches">' +
        swatchList(items) +
        '</div>' +
        '<div class="pm-swbar" aria-hidden="true"><span class="pm-swbar-thumb"></span></div>' +
        '</div>'
      );
    }

    var samplesMedia = data.samplesImage
      ? '<img class="pm-samples-media" src="' + esc(data.samplesImage) + '" alt="" loading="lazy" />'
      : data.samplesStrip && data.samplesStrip.length
        ? '<div class="pm-samples-strip">' +
          data.samplesStrip
            .map(function (src) {
              return '<img src="' + esc(src) + '" alt="" loading="lazy" />';
            })
            .join('') +
          '</div>'
        : '';

    /* без стрелок — только полоски прогресса (листается свайпом/клавишами) */
    var nav = multi ? '<div class="pm-progress">' + segs + '</div>' : '';

    return (
      '<button class="pm-close" type="button" data-pm-close aria-label="Закрыть">&times;</button>' +
      '<div class="pm-left">' +
      '<div class="pm-media">' +
      '<div class="pm-viewport"><div class="pm-track">' +
      slides +
      '</div></div>' +
      nav +
      '</div>' +
      '<div class="pm-actions">' +
      '<button class="pm-btn pm-btn--primary" type="button" data-pm-action="calc">' +
      esc(data.ctaPrimary) +
      '</button>' +
      '<button class="pm-btn pm-btn--secondary" type="button" data-pm-action="catalog">' +
      esc(data.ctaSecondary) +
      '</button>' +
      '</div>' +
      '</div>' +
      '<div class="pm-body">' +
      '<div class="pm-head">' +
      '<div class="pm-headmain">' +
      '<h2 class="pm-title">' +
      data.title +
      '</h2>' +
      (data.price ? '<p class="pm-price">' + esc(data.price) + '</p>' : '') +
      '</div>' +
      (stats ? '<div class="pm-stats">' + stats + '</div>' : '') +
      '</div>' +
      (data.description
        ? '<div class="pm-rule"></div><p class="pm-desc">' + esc(data.description) + '</p>'
        : '') +
      (specs ? '<div class="pm-rule"></div><div class="pm-specs">' + specs + '</div>' : '') +
      swGroup(data.faceColorsTitle, data.faceColors) +
      swGroup(data.backingColorsTitle, data.backingColors) +
      (data.samplesTitle || samplesMedia
        ? '<div class="pm-samples">' +
          '<div class="pm-samples-textcol">' +
          (data.samplesTitle
            ? '<p class="pm-samples-title">' + nl2br(data.samplesTitle) + '</p>'
            : '') +
          (data.samplesText
            ? '<p class="pm-samples-text">' + nl2br(data.samplesText) + '</p>'
            : '') +
          '</div>' +
          samplesMedia +
          '</div>'
        : '') +
      '</div>'
    );
  }

  HB.initCatalogModal = function () {
    var cards = Array.prototype.slice.call(
      document.querySelectorAll(CARD_SELECTOR)
    );
    if (!cards.length) return;
    if (document.getElementById('panelModal')) return;

    var modal = document.createElement('div');
    modal.className = 'pm-modal';
    modal.id = 'panelModal';
    modal.setAttribute('aria-hidden', 'true');
    modal.innerHTML =
      '<div class="pm-overlay" data-pm-close></div>' +
      '<div class="pm-dialog" role="dialog" aria-modal="true"></div>';
    document.body.appendChild(modal);

    var dialog = modal.querySelector('.pm-dialog');
    var s = null; /* { index, count, timer } */
    var lastFocus = null;

    function applySlide() {
      var track = dialog.querySelector('.pm-track');
      if (track) track.style.transform = 'translateX(' + -s.index * 100 + '%)';

      var fills = dialog.querySelectorAll('.pm-seg-fill');
      Array.prototype.forEach.call(fills, function (fill, i) {
        fill.style.transition = 'none';
        if (i < s.index) {
          fill.style.width = '100%';
        } else if (i === s.index) {
          fill.style.width = '0%';
          void fill.offsetWidth; /* reflow, чтобы анимация запустилась заново */
          fill.style.transition = 'width ' + SLIDE_MS + 'ms linear';
          fill.style.width = '100%';
        } else {
          fill.style.width = '0%';
        }
      });
    }

    function stopAuto() {
      if (s && s.timer) {
        window.clearInterval(s.timer);
        s.timer = null;
      }
    }

    function startAuto() {
      stopAuto();
      if (!s || s.count < 2 || document.hidden) return;
      s.timer = window.setInterval(function () {
        s.index = (s.index + 1) % s.count;
        applySlide();
      }, SLIDE_MS);
    }

    /* переход по действию пользователя — с перезапуском таймера */
    function goTo(i) {
      if (!s) return;
      s.index = ((i % s.count) + s.count) % s.count;
      applySlide();
      startAuto();
    }

    function openModal(card) {
      var data = resolveData(card);
      dialog.innerHTML = buildInner(data);
      s = { index: 0, count: data.slides.length, timer: null };

      lastFocus = document.activeElement;
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('pm-lock');
      var closeBtn = dialog.querySelector('.pm-close');
      if (closeBtn) closeBtn.focus();

      /* модалка стала видимой — коммитим layout и настраиваем полосу палитры */
      void modal.offsetWidth;
      wireSwBars();

      /* полоски прогресса анимируются только на уже отрисованном элементе
         (на display:none CSS-переход проглатывается) — поэтому запускаем
         анимацию через два кадра, когда модалка гарантированно отрисована */
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          if (!modal.classList.contains('is-open')) return;
          applySlide();
          startAuto();
        });
      });
    }

    function closeModal() {
      stopAuto();
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('pm-lock');
      s = null;
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    modal.addEventListener('click', function (e) {
      if (e.target.closest('[data-pm-close]')) return closeModal();
      if (e.target.closest('[data-pm-action="calc"]')) return openCalc();
      if (e.target.closest('[data-pm-action="catalog"]')) return openCatalog();
      if (e.target.closest('[data-pm-prev]')) return goTo(s.index - 1);
      if (e.target.closest('[data-pm-next]')) return goTo(s.index + 1);
      var go = e.target.closest('[data-pm-go]');
      if (go) return goTo(parseInt(go.getAttribute('data-pm-go'), 10) || 0);
    });

    document.addEventListener('keydown', function (e) {
      if (!modal.classList.contains('is-open')) return;
      /* если поверх открыта полноэкранная модалка — Esc отдаём ей */
      if (
        calcModal.el.classList.contains('is-open') ||
        catalogModal.el.classList.contains('is-open')
      )
        return;
      if (e.key === 'Escape') closeModal();
      else if (e.key === 'ArrowLeft' && s) goTo(s.index - 1);
      else if (e.key === 'ArrowRight' && s) goTo(s.index + 1);
    });

    /* свайп по картинке */
    var touchX = null;
    dialog.addEventListener(
      'touchstart',
      function (e) {
        if (e.target.closest('.pm-media')) touchX = e.touches[0].clientX;
      },
      { passive: true }
    );
    dialog.addEventListener(
      'touchend',
      function (e) {
        if (touchX == null || !s) return;
        var dx = e.changedTouches[0].clientX - touchX;
        if (Math.abs(dx) > 40) goTo(s.index + (dx < 0 ? 1 : -1));
        touchX = null;
      },
      { passive: true }
    );

    /* колёсико мыши над палитрой цветов — плавная горизонтальная прокрутка
       (свой rAF-лерп к цели: копит быстрые прокрутки, едет мягко) */
    var wheelEl = null;
    var wheelTo = 0;
    var wheelRAF = 0;

    function wheelStep() {
      wheelRAF = 0;
      if (!wheelEl) return;
      var cur = wheelEl.scrollLeft;
      var diff = wheelTo - cur;
      if (Math.abs(diff) < 0.5) {
        wheelEl.scrollLeft = wheelTo;
        wheelEl = null;
        return;
      }
      wheelEl.scrollLeft = cur + diff * 0.16;
      wheelRAF = requestAnimationFrame(wheelStep);
    }

    dialog.addEventListener(
      'wheel',
      function (e) {
        var sw = e.target.closest('.pm-swatches');
        if (!sw || sw.scrollWidth <= sw.clientWidth + 1) return;
        var d = e.deltaY || e.deltaX;
        if (e.deltaMode === 1) d *= 16; /* строки -> примерно px */
        if (!d) return;
        e.preventDefault();
        var max = sw.scrollWidth - sw.clientWidth;
        if (wheelEl !== sw) {
          wheelEl = sw;
          wheelTo = sw.scrollLeft;
        }
        wheelTo = Math.max(0, Math.min(max, wheelTo + d));
        if (!wheelRAF) wheelRAF = requestAnimationFrame(wheelStep);
      },
      { passive: false }
    );

    /* своя полоса прокрутки под палитрой: размер/позиция бегунка + перетаскивание */
    function wireSwBars() {
      var groups = dialog.querySelectorAll('.pm-swgroup');
      Array.prototype.forEach.call(groups, function (grp) {
        var sw = grp.querySelector('.pm-swatches');
        var bar = grp.querySelector('.pm-swbar');
        var thumb = grp.querySelector('.pm-swbar-thumb');
        if (!sw || !bar || !thumb) return;

        function maxScroll() {
          return sw.scrollWidth - sw.clientWidth;
        }

        function layout() {
          var max = maxScroll();
          if (max <= 1) {
            bar.hidden = true;
            return;
          }
          bar.hidden = false;
          var ratio = sw.clientWidth / sw.scrollWidth;
          var w = Math.max(28, Math.round(bar.clientWidth * ratio));
          thumb.style.width = w + 'px';
          var travel = bar.clientWidth - w;
          thumb.style.transform =
            'translateX(' + Math.round(travel * (sw.scrollLeft / max)) + 'px)';
        }

        sw.addEventListener('scroll', layout, { passive: true });

        var dragX = 0;
        var dragScroll = 0;

        function onMove(e) {
          var travel = bar.clientWidth - thumb.clientWidth;
          if (travel <= 0) return;
          sw.scrollLeft =
            dragScroll + ((e.clientX - dragX) / travel) * maxScroll();
        }
        function onUp(e) {
          bar.classList.remove('is-drag');
          document.removeEventListener('pointermove', onMove);
          document.removeEventListener('pointerup', onUp);
          if (thumb.releasePointerCapture && e.pointerId != null) {
            try {
              thumb.releasePointerCapture(e.pointerId);
            } catch (err) {}
          }
        }

        thumb.addEventListener('pointerdown', function (e) {
          e.preventDefault();
          dragX = e.clientX;
          dragScroll = sw.scrollLeft;
          bar.classList.add('is-drag');
          if (thumb.setPointerCapture) {
            try {
              thumb.setPointerCapture(e.pointerId);
            } catch (err) {}
          }
          document.addEventListener('pointermove', onMove);
          document.addEventListener('pointerup', onUp);
        });

        /* клик по дорожке — прыжок */
        bar.addEventListener('pointerdown', function (e) {
          if (e.target === thumb) return;
          var rect = bar.getBoundingClientRect();
          var travel = bar.clientWidth - thumb.clientWidth;
          var p = (e.clientX - rect.left - thumb.clientWidth / 2) / travel;
          sw.scrollLeft = Math.max(0, Math.min(1, p)) * maxScroll();
        });

        layout();
      });
    }

    /* на скрытой вкладке автопрокрутка не нужна */
    document.addEventListener('visibilitychange', function () {
      if (!modal.classList.contains('is-open')) return;
      if (document.hidden) {
        stopAuto();
      } else {
        /* вкладку показали — перезапускаем полоски с начала текущего слайда
           (если модалку открыли, пока вкладка была скрыта, анимация не шла) */
        applySlide();
        startAuto();
      }
    });

    /* ---- полноэкранные модалки «запросить расчёт» и «запросить каталог» ----
       Общая вёрстка и логика формы; различаются фоном, заголовком
       и оформлением кнопки (модификатор .pmc-modal--*). */
    function maskPhone(raw) {
      var d = String(raw).replace(/\D/g, '');
      if (!d) return '';
      if (d[0] === '8') d = '7' + d.slice(1);
      if (d[0] !== '7') d = '7' + d;
      d = d.slice(0, 11);
      var r = d.slice(1);
      var out = '+7';
      if (r.length) out += ' (' + r.slice(0, 3);
      if (r.length >= 3) out += ')';
      if (r.length > 3) out += ' ' + r.slice(3, 6);
      if (r.length > 6) out += '-' + r.slice(6, 8);
      if (r.length > 8) out += '-' + r.slice(8, 10);
      return out;
    }

    function makeFsModal(opts) {
      var el = document.createElement('div');
      el.className = 'pmc-modal ' + opts.modifier;
      el.id = opts.id;
      el.setAttribute('aria-hidden', 'true');
      el.innerHTML =
        '<div class="pmc-inner">' +
        '<button class="pmc-close" type="button" data-pmc-close aria-label="Закрыть">&times;</button>' +
        '<h2 class="pmc-title">' +
        opts.title +
        '</h2>' +
        '<form class="pmc-form" novalidate>' +
        '<p class="pmc-success" role="status" hidden>Ваш запрос принят!<br>Мы свяжемся с Вами в ближайшее время</p>' +
        '<label class="pmc-field">' +
        '<span class="pmc-label">Телефон</span>' +
        '<input class="pmc-input" type="tel" name="phone" inputmode="tel" autocomplete="tel" placeholder="+7 (999) 999-99-99" required />' +
        '</label>' +
        '<label class="pmc-agree">' +
        '<input class="pmc-agree-input" type="checkbox" name="agree" required />' +
        '<span class="pmc-agree-box" aria-hidden="true"></span>' +
        '<span class="pmc-agree-text">нажимая на кнопку, я подтверждаю согласие с ' +
        '<a href="privacy.html" target="_blank" rel="noopener">политикой конфиденциальности</a>' +
        ' и даю согласие на ' +
        '<a href="agreement.html" target="_blank" rel="noopener">обработку персональных данных</a>' +
        '</span>' +
        '</label>' +
        '<button class="pmc-submit" type="submit">запросить</button>' +
        '</form>' +
        '</div>';
      document.body.appendChild(el);

      var form = el.querySelector('.pmc-form');
      var phone = el.querySelector('.pmc-input');
      var agreeWrap = el.querySelector('.pmc-agree');
      var agree = el.querySelector('.pmc-agree-input');
      var success = el.querySelector('.pmc-success');
      var successTimer = null;

      function reset() {
        window.clearTimeout(successTimer);
        form.reset();
        if (success) success.hidden = true;
        phone.classList.remove('is-invalid');
        agreeWrap.classList.remove('is-invalid');
      }

      function open() {
        reset(); /* каждый раз открываем с чистой формой */
        el.classList.add('is-open');
        el.setAttribute('aria-hidden', 'false');
        document.body.classList.add('pm-lock');
        phone.focus();
      }

      function close() {
        el.classList.remove('is-open');
        el.setAttribute('aria-hidden', 'true');
        reset();
        if (!modal.classList.contains('is-open')) {
          document.body.classList.remove('pm-lock');
        }
      }

      el.addEventListener('click', function (e) {
        if (e.target.closest('[data-pmc-close]')) close();
      });

      phone.addEventListener('keydown', function (e) {
        /* блокируем ввод любых символов кроме цифр (служебные клавиши не трогаем) */
        if (
          e.key.length === 1 &&
          !/\d/.test(e.key) &&
          !e.ctrlKey &&
          !e.metaKey &&
          !e.altKey
        ) {
          e.preventDefault();
        }
      });

      phone.addEventListener('input', function () {
        phone.value = maskPhone(phone.value);
      });

      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var okPhone = phone.value.replace(/\D/g, '').length >= 11;
        var okAgree = agree.checked;
        phone.classList.toggle('is-invalid', !okPhone);
        agreeWrap.classList.toggle('is-invalid', !okAgree);
        if (!okPhone || !okAgree) return;
        /* успех: форма очищается, кнопка — в исходное состояние,
           зелёная плашка над формой и сама скрывается через время */
        form.reset();
        var btn = form.querySelector('.pmc-submit');
        if (btn) btn.blur();
        if (success) {
          success.hidden = false;
          window.clearTimeout(successTimer);
          successTimer = window.setTimeout(function () {
            success.hidden = true;
          }, 6000);
        }
      });

      form.addEventListener('input', function () {
        if (success) success.hidden = true;
      });

      return { el: el, open: open, close: close };
    }

    var calcModal = makeFsModal({
      id: 'calcModal',
      modifier: 'pmc-modal--calc',
      title: 'запросить расчёт или заказать образцы'
    });
    var catalogModal = makeFsModal({
      id: 'catalogModal',
      modifier: 'pmc-modal--catalog',
      title: 'запросить<br>каталог'
    });

    function openCalc() {
      calcModal.open();
    }
    function openCatalog() {
      catalogModal.open();
    }

    /* Esc закрывает верхнюю из открытых полноэкранных модалок */
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      if (catalogModal.el.classList.contains('is-open')) {
        e.stopPropagation();
        catalogModal.close();
      } else if (calcModal.el.classList.contains('is-open')) {
        e.stopPropagation();
        calcModal.close();
      }
    });

    /* есть ли для карточки заполненные данные модалки */
    function cardHasData(card) {
      var cap = card.querySelector('figcaption');
      var key =
        card.getAttribute('data-panel') || slug(cap ? cap.innerHTML : '');
      return !!(HB.panelData && HB.panelData[key]);
    }

    /* карточки-панели: hover-zoom у всех; клик/клавиатура — только у тех,
       для кого есть данные модалки */
    cards.forEach(function (card) {
      card.classList.add('catalog-panel');
      var media = card.querySelector('span[class$="-card-media"]');
      if (media) media.classList.add('catalog-panel-media');

      if (!cardHasData(card)) {
        card.classList.add('catalog-panel--nolink');
        return;
      }

      if (!card.hasAttribute('tabindex')) card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');

      card.addEventListener('click', function () {
        openModal(card);
      });
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openModal(card);
        }
      });
    });
  };
})();
