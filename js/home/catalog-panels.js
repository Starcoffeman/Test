/* ==========================================================================
   catalog-panels.js — ДАННЫЕ для модальных окон каталога.

   Модальное окно не верстается отдельно под каждую панель — оно собирается
   генератором (catalog-modal.js) из объекта ниже. Чтобы у панели появилось
   своё окно, добавьте запись в HB.panelData.

   Ключ записи — это либо значение атрибута data-panel на <figure> карточки,
   либо (если атрибута нет) «слаг» жирного текста подписи: например подпись
   «…панель <b>флэт волны</b>» даёт ключ «флэт-волны».

   Любое поле можно не указывать — тогда берётся значение из самой карточки:
   заголовок — из подписи, первый слайд — из картинки карточки.

   Кружки цвета (faceColors / backingColors) принимают либо путь к картинке-
   текстуре, либо цвет (#hex / rgb(...)).
   ========================================================================== */
(function () {
  'use strict';

  var HB = (window.HB = window.HB || {});

  /* Общие для всех модалок значения (кнопки и правый нижний блок «образцы»).
     \n в строках — перенос строки. */
  HB.panelDefaults = {
    ctaPrimary: 'запросить расчёт или заказать образцы',
    ctaSecondary: 'запросить каталог',
    samplesTitle: 'закажите\nтестовые образцы',
    samplesText: 'выберите идеальный вариант\nдля вашего интерьера',
    /* фото в правом нижнем углу окна */
    samplesImage:
      'assets/image/catalog/panel/097dc6b78b0e6d77c32ecd31e90a9aea303a81cb.webp'
  };

  /* --------------------------------------------------------------------------
     ПАЛИТРА A — основная палитра фетра (лицевой слой = подложка), 37 оттенков.
     Картинки-кружки лежат в assets/image/catalog/tex/pal-01..pal-37.webp
     (перекодированы из исходников заказчика).
     -------------------------------------------------------------------------- */
  function palList(prefix, count) {
    var list = [];
    for (var i = 1; i <= count; i++) {
      list.push(
        'assets/image/catalog/tex/' + prefix + (i < 10 ? '0' + i : i) + '.webp'
      );
    }
    return list;
  }

  HB.feltPalette = palList('pal-', 37);

  /* ПАЛИТРА B — для малоформатных панелей, 29 оттенков (pal2-01..pal2-29) */
  HB.smallPalette = palList('pal2-', 29);

  /* Дерево для лицевого слоя шпонированных панелей */
  var veneerWood = [
    'assets/image/catalog/tex/rosewood.webp',
    'assets/image/catalog/tex/black-walnut.webp',
    'assets/image/catalog/tex/wenge.webp'
  ];

  /* Общие данные всех карточек блока «шпонированные панели» —
     различаются только заголовком и вторым слайдом. */
  var veneerBase = {
    price: 'от 7900 ₽ м²',
    stats: [
      { value: 'A', label: 'класс звукопоглощения' },
      { value: '0,9', label: 'коэффициент шумоподавления NRC' }
    ],
    description:
      'панели изготовлены из фетровой акустической подложки и лицевого слоя ' +
      'натурального шпона, что обеспечивает высокие звукоизоляционные ' +
      'свойства для пространств требовательных к акустическому комфорту ' +
      'и акцентному зонированию',
    specs: [
      { label: 'размер панели (мм) от и до', value: '300 x 600\n2400 x 1200' },
      { label: 'толщина лицевого слоя (мм)', value: '0,9' },
      { label: 'толщина базового слоя (мм)', value: '11' }
    ],
    faceColorsTitle: 'цвет лицевого слоя',
    faceColors: veneerWood,
    backingColorsTitle: 'цвет подложки',
    backingColors: HB.feltPalette
  };

  function veneer(title, panelImg, secondImg) {
    return Object.assign({}, veneerBase, {
      title: 'двуслойная шпонированная<br>стеновая панель <b>' + title + '</b>',
      /* первый слайд — картинка самой панели, второй — как указано */
      slides: ['assets/image/wall/' + panelImg, secondImg]
    });
  }

  /* --------------------------------------------------------------------------
     Блок «панели из фетра». Палитра лицевого слоя и подложки одинакова
     (HB.feltPalette). Двуслойные и однослойные различаются ценой, описанием,
     спецификой и набором кружков цвета.
     -------------------------------------------------------------------------- */
  var PANEL = 'assets/image/catalog/panel/';

  var feltStats = [
    { value: 'A', label: 'класс звукопоглощения' },
    { value: '0,9', label: 'коэффициент шумоподавления NRC' }
  ];

  function feltTwo(name, panelImg, secondImg) {
    return {
      title: 'двуслойная стеновая<br>панель <b>' + name + '</b>',
      price: 'от 7000 ₽ м²',
      stats: feltStats,
      description:
        'панель изготовлена из двух слоёв фетра разной плотности и толщины, ' +
        'что обеспечивает поглощение широкого спектра звуковых волн разной ' +
        'частоты для пространств с повышенным требованием к акустическому ' +
        'комфорту и изысканному внешнему виду',
      specs: [
        { label: 'размер панели (мм) от и до', value: '600 x 600\n2400 x 1150' },
        { label: 'толщина лицевого слоя (мм)', value: '3/5' },
        { label: 'толщина базового слоя (мм)', value: '9' }
      ],
      slides: [PANEL + panelImg, PANEL + secondImg],
      faceColorsTitle: 'цвет лицевого слоя',
      faceColors: HB.feltPalette,
      backingColorsTitle: 'цвет подложки',
      backingColors: HB.feltPalette
    };
  }

  function feltOne(name, panelImg, secondImg) {
    return {
      title: 'однослойная стеновая<br>панель <b>' + name + '</b>',
      price: 'от 3000 ₽ м²',
      stats: feltStats,
      description:
        'панель изготовлена из базового слоя фетра толщиной 9 мм, что ' +
        'обеспечивает как высокий уровень шумопоглощения, так и оригинальный ' +
        'декор с тактильным эффектом',
      specs: [
        { label: 'размер панели (мм) от и до', value: '600 x 600\n2400 x 1150' },
        { label: 'толщина (мм)', value: '9' }
      ],
      slides: [PANEL + panelImg, PANEL + secondImg],
      faceColorsTitle: 'цвет',
      faceColors: HB.feltPalette,
      backingColors: []
    };
  }

  /* --------------------------------------------------------------------------
     Блок «малоформатные панели». Своя палитра (HB.smallPalette).
     Крупные (60×60, описание A) — со вторым слайдом; компактные (30×30,
     описание B) — только фото панели.
     -------------------------------------------------------------------------- */
  var SMALL_DESC_A =
    'лаконичные акустические панели из фетра, которые помогают снизить ' +
    'уровень шума и создать комфортную акустику в помещении. формат 60 × 60 см ' +
    'открывает широкие возможности для оформления стен, а разнообразие цветов ' +
    'позволяет гармонично вписать панели в интерьер';
  var SMALL_DESC_B =
    'компактный формат для создания оригинальных акустических композиций. ' +
    'панели можно комбинировать между собой и сочетать с крупноформатными ' +
    'панелями, создавая новые узоры и ритмы на стене. разнообразие цветов ' +
    'позволяет адаптировать композицию под стиль любого интерьера';

  function small(name, size, desc, slides) {
    return {
      title: 'однослойная стеновая<br>панель <b>' + name + '</b>',
      price: 'от 3000 ₽ м²',
      stats: feltStats,
      description: desc,
      specs: [
        { label: 'размер панели (мм) от и до', value: size },
        { label: 'толщина слоя (мм)', value: '9' }
      ],
      slides: slides,
      faceColorsTitle: 'цвет',
      faceColors: HB.smallPalette,
      backingColors: []
    };
  }

  function smallA(name, panelImg, secondImg) {
    return small(name, '600 x 600', SMALL_DESC_A, [
      PANEL + panelImg,
      PANEL + secondImg
    ]);
  }

  function smallB(name, panelImg) {
    return small(name, '300 x 300', SMALL_DESC_B, [PANEL + panelImg]);
  }

  /* --------------------------------------------------------------------------
     Блок «вертикальные баффлы». Первая палитра (HB.feltPalette).
     Спецификация из 4 строк (2×2): размер+тип крепления слева,
     толщина+световой источник справа.
     -------------------------------------------------------------------------- */
  function baffle(name, panelImg, secondImg, mount, light) {
    return {
      title: 'потолочный баффл<br><b>' + name + '</b>',
      price: 'от 7000 ₽ м²',
      stats: feltStats,
      description:
        'оцените наше высокоэффективное потолочное решение для любых ' +
        'помещений. прямые баффлы создают создают исключительный акустический ' +
        'комфорт в офисах, ресторанах и производственных пространствах',
      specs: [
        { label: 'вариативный размер баффла (мм)', value: 'от 200 x 1200' },
        { label: 'толщина (мм)', value: '24' },
        { label: 'тип крепления', value: mount },
        { label: 'световой источник', value: light }
      ],
      specsSplit: 'grid',
      slides: [PANEL + panelImg, PANEL + secondImg],
      faceColorsTitle: 'цвет',
      faceColors: HB.feltPalette,
      backingColors: []
    };
  }

  /* --------------------------------------------------------------------------
     Блок «потолочная система армстронг». Палитра — HB.feltPalette.
     -------------------------------------------------------------------------- */
  var ARM_DESC =
    'панели совместимы с системой armstrong, улучшают акустику помещения ' +
    'и позволяют создавать индивидуальный дизайн благодаря декоративным ' +
    'узорам. доступны в однослойном и двухслойном исполнении с контрастной ' +
    'подложкой';
  var ARM_DESC_3D =
    'готовые модули армсофт 3D являются компромиссом между классическими ' +
    'подвесными панелями для системы армстронг и подвесными баффлами. высокие ' +
    'шумопоглощающие свойства и превосходный декор для коммерческих пространств';
  var ARM_SPECS_1 = [
    { label: 'размер панели (мм)', value: '600 x 600' },
    { label: 'толщина (мм)', value: '9' }
  ];
  var ARM_SPECS_2 = [
    { label: 'размер панели (мм)', value: '600 x 600' },
    { label: 'толщина лицевого слоя (мм)', value: '3' },
    { label: 'толщина базового слоя (мм)', value: '9' }
  ];

  function arm(o) {
    var d = {
      title: o.prefix + '<br>панель <b>' + o.name + '</b>',
      price: o.price,
      stats: feltStats,
      description: o.desc || ARM_DESC,
      specs: o.specs,
      /* первый слайд крупнее (contain-tight) */
      slides: [
        { src: PANEL + o.panel, fit: 'contain-tight' },
        PANEL + o.second
      ],
      faceColorsTitle: o.two ? 'цвет лицевого слоя' : 'цвет',
      faceColors: HB.feltPalette,
      backingColors: []
    };
    if (o.two) {
      d.backingColorsTitle = 'цвет подложки';
      d.backingColors = HB.feltPalette;
    }
    return d;
  }

  /* Парящие стены — подвесные панели */
  function floatPanel(name, panelImg, secondImg) {
    return {
      title: 'подвесная панель<br><b>' + name + '</b>',
      price: 'от 7000 ₽ м²',
      stats: feltStats,
      description:
        'потолочные подвесные панели создают комфортную акустическую среду, ' +
        'зонируют пространство и расширяют возможности интерьерного дизайна',
      specs: [
        { label: 'вариативный размер баффла (мм)', value: 'до 1200 x 2400' },
        { label: 'толщина (мм)', value: '24' },
        { label: 'тип крепления', value: BAFFLE_TROS },
        { label: 'световой источник', value: BAFFLE_LPROF }
      ],
      specsSplit: 'grid',
      slides: [PANEL + panelImg, PANEL + secondImg],
      faceColorsTitle: 'цвет',
      faceColors: HB.feltPalette,
      backingColors: []
    };
  }

  var BAFFLE_TROS = 'регулируемый тросиковый подвес';
  var BAFFLE_SPOT = 'встраиваемый спот';
  var BAFFLE_PROF = 'стальной потолочный профиль';
  var BAFFLE_LPROF = 'встраиваемый световой профиль';

  /* Горизонтальные дизайн-баффлы (круг/квадрат/треугольник) */
  function hbaffle(name, panelImg, secondImg) {
    return {
      title: 'потолочный баффл<br><b>' + name + '</b>',
      price: 'от 7000 ₽ м²',
      stats: feltStats,
      description:
        'лаконичные акустические баффлы, которые сочетают высокую ' +
        'эффективность и широкие возможности дизайна благодаря разнообразию ' +
        'размеров, узоров и цветов',
      specs: [
        { label: 'вариативный размер баффла (мм)', value: 'до 1200' },
        { label: 'толщина (мм)', value: '24' },
        { label: 'тип крепления', value: BAFFLE_TROS },
        { label: 'световой источник', value: BAFFLE_LPROF }
      ],
      specsSplit: 'grid',
      /* первый слайд крупнее (contain-tight), второй — во всю область (cover);
         картинки 2-го слайда заранее вытянуты в портрет с фоновой заливкой */
      slides: [
        { src: PANEL + panelImg, fit: 'contain-tight' },
        PANEL + secondImg
      ],
      faceColorsTitle: 'цвет',
      faceColors: HB.feltPalette,
      backingColors: []
    };
  }

  HB.panelData = {
    'veneer-flat-waves': veneer(
      'флэт волны',
      'flat-lines.webp',
      'assets/image/catalog/panel/7c5705eb323dcec879e72e5ca68d8bb6f9bd0cd1.webp'
    ),
    'veneer-flat-lines': veneer(
      'флэт линии',
      'flat-waves.webp',
      'assets/image/catalog/panel/284c49d3b5e3b42caf5bed358d34b5465af2b83e.webp'
    ),
    'veneer-flat-radius': veneer(
      'флэт радиус',
      'flat-radius.webp',
      'assets/image/catalog/panel/0b8ca26f69c99869da4a2c2bbd71f10e550415d5.webp'
    ),

    /* --- панели из фетра --- */
    'felt-riel': feltTwo(
      'риэл',
      'e8202120c6729a8ef36be3b060748718fff65054.webp',
      '64f2ca2d61eb89cadf88f99ae8e572e365b8fd62.webp'
    ),
    'felt-neuro': feltTwo(
      'нейро',
      'c64e55828e2004de82820b93133ba0df8d7c58d0.webp',
      '47cf941c48e66193041a9900bfc3624e33285ab0.webp'
    ),
    'felt-neuro-2': feltTwo(
      'нейро',
      'c7c9805cc46400015aca892508cde68d836792f2.webp',
      '310c33a42119cc2b5391797b5d30165fa4c8a696.webp'
    ),
    'felt-avangard': feltTwo(
      'авангард',
      'c1fd7037c6ac64767af3ba3e94444bac97ebdeca.webp',
      '937734b2069eb1a56e84888ba9abc0cf90195f23.webp'
    ),
    'felt-dzen': feltTwo(
      'дзен',
      'fa37cd5654a9bd44978a07cc626e93ddbb222359.webp',
      '3f4c229739aceab718954cebe128eab9b4a8c760.webp'
    ),
    'felt-reika': feltOne(
      'рейка',
      '6d9d211808268361bb56c3deffd77c0f1fd7651b.webp',
      '9cf6e4c709cf51ed036773a0359fe7651dcf2082.webp'
    ),
    'felt-reika-accent': feltOne(
      'рейка-акцент',
      'eafd39c47aff2ba2a245c9b313b3d70ba8b492f4.webp',
      'ddffad97805a12ea267a22001995bfb1074bddfd.webp'
    ),

    /* --- панели pvc --- */
    'pvc-reika': {
      title: 'двуслойная стеновая<br>pvc панель <b>рейка</b>',
      price: 'от 7000 ₽ м²',
      stats: [
        { value: 'B', label: 'класс звукопоглощения' },
        { value: '0,8', label: 'коэффициент шумоподавления NRC' }
      ],
      description:
        'современное сочетание выразительной текстуры дерева и акустического ' +
        'фетра. водонепроницаемый полимерный слой обеспечивает практичность, ' +
        'а фетр толщиной 9 мм помогает создать более комфортную акустическую ' +
        'среду. самоклеящаяся основа делает монтаж быстрым и аккуратным',
      specs: [
        { label: 'размер панели (мм) от и до', value: '300 x 600\n2400 x 1200' },
        { label: 'толщина лицевого слоя (мм)', value: '1' },
        { label: 'толщина базового слоя (мм)', value: '9' }
      ],
      slides: [
        PANEL + '907ffd0f67e59d1201079665c3caedd2abc074b0.webp',
        PANEL + '183afa3f589d5c5d3c7e77732926353495f97c13.webp'
      ],
      faceColorsTitle: 'цвет лицевого слоя',
      faceColors: [
        PANEL + '907ffd0f67e59d1201079665c3caedd2abc074b0.webp',
        PANEL + '2599190c490b1c95532dca0b31d75efae9efe24e.webp'
      ],
      backingColorsTitle: 'цвет подложки',
      backingColors: HB.feltPalette
    },

    /* --- малоформатные панели --- */
    'small-plain': smallA(
      'плейн',
      '374ecae59ae1407eae211fc3ba7e555467c3236c.webp',
      'f73b8c709e312133e5a7abc0b1480a478a49cdd3.webp'
    ),
    'small-volny': smallA(
      'волны',
      '51f34bea8b67c740183b4b35f8505b8fed91589d.webp',
      '7ac09c117326873eb632e82089f25028027bc6da.webp'
    ),
    'small-arka': smallA(
      'арка',
      'a482441196acb729326180c436fcaa085713b264.webp',
      '315a440d41605763af9321840ea6aca942d963d4.webp'
    ),
    'small-segment': smallA(
      'сегмент',
      '91caf06a6e23ad498661057613f8b0290efebc56.webp',
      'edbf41a1498d8286a8372ea1cbb253b8e2c1d1ac.webp'
    ),
    'small-fraktal': smallA(
      'фрактал',
      'f01ef8be119c62b68b05d91d539fd260a60a6927.webp',
      'a5c6369c17e7ead004ce1fc21b1a48dd0a72395f.webp'
    ),
    'small-reiki-accent': smallA(
      'рейки-акцент',
      '87c58aa88480fdffcf4349b26a9a87be48945a0f.webp',
      '6660300c39b92709c0be504be89f03128d9930c4.webp'
    ),
    'small-kvadraty': smallB(
      'квадраты',
      '080591804b1fcda09ab89f291d15311f045b1484.webp'
    ),
    'small-pyramids': smallB(
      '3D пирамиды',
      'dc782e6eaec6aadc7d45ead16670cbd4d07f9848.webp'
    ),
    'small-reika': smallB(
      'рейка',
      'b444ef22d076680cafd3301a1cc85ea2a9926a32.webp'
    ),
    'small-soty': smallB(
      'соты',
      'fc47a794bfaa09ec775a82e1377c502841397897.webp'
    ),

    /* --- вертикальные баффлы --- */
    'baffle-mesh': baffle(
      'модуль-сетка',
      '852d0e551b6984a3a650be8cccfe5da8da3685ce.webp',
      '42dd2ed41bfe8ad88c149488e23f773e204a2bc7.webp',
      BAFFLE_TROS,
      BAFFLE_SPOT
    ),
    'baffle-plank': baffle(
      'модуль-планка',
      '1a3afb84b1777faac173064334141cd861ad4d97.webp',
      'b9922f63524b25464ec9c83cb42f93a34978d679.webp',
      BAFFLE_PROF,
      BAFFLE_LPROF
    ),
    'baffle-wave': baffle(
      'модуль-волна',
      'cc16f6075c5a7a46cf4dba62cbc5939c596c33f9.webp',
      '3865a51bdb074d3c464bb2b4631591d795e7b83f.webp',
      BAFFLE_PROF,
      BAFFLE_LPROF
    ),
    'baffle-peak': baffle(
      'рейки-пик',
      '179b51e15c1cca2bfa6e94211b1f5cc2745b6329.webp',
      '4ec7231c0d6e122c2ab2737dac5b8cb92110a98a.webp',
      BAFFLE_TROS,
      BAFFLE_SPOT
    ),
    'baffle-circle': baffle(
      'рейки-круг',
      'e7aefc3a904d4eae7c6a6c612bb79a0139ea22b8.webp',
      'f48e271a5e793615d1a8e58ca216bbcc42216d5d.webp',
      BAFFLE_TROS,
      BAFFLE_SPOT
    ),
    'baffle-swave': baffle(
      'рейки-волна',
      '19e880e7e814f898ae58d54f8346023e78cc8c14.webp',
      '7e56034b9e005ad3c4d43f73f4891a53ad94f5c4.webp',
      BAFFLE_TROS,
      BAFFLE_SPOT
    ),

    /* --- горизонтальные дизайн-баффлы --- */
    'hbaffle-circle-lines': hbaffle(
      'круг-линии',
      '09a8f2ec67b74c4b54f280708161c4d9c1d14829.webp',
      '9388934a05a6986c64893aaef2b1ad2fde79ef21.webp?v=4'
    ),
    'hbaffle-circle-wave': hbaffle(
      'круг-волна',
      'eb7ad55c879ab2bbadadfea219b01024a535c307.webp',
      'e9f0659778b12f8447ee6ce6579e7699993b4d26.webp?v=4'
    ),
    'hbaffle-circle-wave-3d': hbaffle(
      'круг-волна 3D',
      'b6fc9ef728aa7bb38e9ea1c0dda69673ccf0c312.webp',
      'a49da991df71f8ec80c47a9439a9e0409c93935e.webp?v=4'
    ),

    /* --- парящие стены --- */
    'float-lines': floatPanel(
      'линии',
      '7c0d9fd4583318d465a198748fe2e5b31761ee24.webp',
      '6b82accc8807a26456f1acb09c03d7f791cf9f2d.webp'
    ),

    /* --- потолочная система армстронг --- */
    'arm-soft': arm({
      prefix: 'однослойная потолочная',
      name: 'армсофт',
      price: 'от 3000 ₽ м²',
      specs: ARM_SPECS_1,
      panel: 'e4dac8ce3efd90b044141db53ffff1634857c906.webp',
      second: 'bf0baffff70903477a6c3dccbf2c573ac59907e0.webp'
    }),
    'arm-soft-lines': arm({
      prefix: 'двуслойная потолочная',
      name: 'армсофт-линии',
      price: 'от 7000 ₽ м²',
      specs: ARM_SPECS_2,
      two: true,
      panel: '0ff0f2ef0d29b386bc30fd89781faafb8ead5dba.webp',
      second: '7938b03706ddd1b1f417624e374400d5f5e2dbb3.webp'
    }),
    'arm-soft-radius': arm({
      prefix: 'двуслойная потолочная',
      name: 'армсофт-радиус',
      price: 'от 7000 ₽ м²',
      specs: ARM_SPECS_2,
      two: true,
      panel: 'b11c0ee2dfc23eb7fc04835ff12a63362153dcc6.webp',
      second: 'c8308ae36f9ca32fad2584080bbbd336f3381f3b-1.webp'
    }),
    'arm-soft-3d': arm({
      prefix: 'объёмная потолочная',
      name: 'армсофт 3D',
      price: 'от 7000 ₽ м²',
      desc: ARM_DESC_3D,
      specs: ARM_SPECS_1,
      panel: '309b18c0cb4bb7bfcbc42b9818db177c9398a271.webp',
      second: '309b18c0cb4bb7bfcbc42b9818db177c9398a271-1.webp'
    })
  };
})();
