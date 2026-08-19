/* ==========================================================================
   Hubox — Parallax Effect Engine for index.html & fetr.html
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {
  // 1. Initialize simpleParallax on photo elements
  function initSimpleParallax() {
    const images = document.querySelectorAll(
      "img:not(.logoIconCloud__naeNM):not(.color-icon):not(.fetr-usecases-icon):not(.modal-window img):not(#imageModalImg):not(.fab-item img)"
    );

    if (window.innerWidth > 768 && typeof simpleParallax !== "undefined" && images.length > 0) {
      const validImages = Array.from(images).filter((img) => {
        // Explicitly include trend images or parallax-designated containers
        const isExplicitParallax =
          img.closest(".trends-image") ||
          img.closest(".img-parallax") ||
          img.classList.contains("img-parallax");

        // Exclude tiny icons or hidden elements
        const width = img.offsetWidth || img.width || img.naturalWidth || 0;
        const height = img.offsetHeight || img.height || img.naturalHeight || 0;
        return (
          (isExplicitParallax || width > 60 || height > 60) &&
          !img.closest(".fab-container") &&
          !img.closest(".material-card") &&
          !img.closest(".simpleParallax") &&
          // Карточки характеристик панели (.specs-visual-block/-block1):
          // библиотека оборачивает картинку в свой <div class="simpleParallax">
          // и масштабирует её (scale: 1.3) — это ломает точный max-width и
          // центрирование, которые нужны именно здесь (панель + волна должны
          // совпадать по масштабу и центру, а не "гулять" от скролла).
          !img.closest(".specs-visual-block") &&
          !img.closest(".specs-visual-block1") &&
          // Логотип в шапке (position:fixed, всегда на экране) не должен
          // зумиться/двигаться от параллакса — заказчик попросил убрать
          // эффект в хедере вообще.
          !img.closest(".header") &&
          !img.closest(".mobile-menu") &&
          // Иконки в блоке "этапы взаимодействия" (.step-item img) —
          // это маленькие пиктограммы с точным подобранным размером,
          // им тоже не нужен зум/сдвиг от параллакса.
          !img.closest(".step-item") &&
          // Бейдж "Сделано в России" (.made-in-russia / .hero-mark) —
          // маленькая статичная плашка-логотип, ей тоже не нужен параллакс.
          !img.closest(".made-in-russia") &&
          !img.classList.contains("hero-mark") &&
          // Колонка логотипов партнёров (.client-partners-logos-col) —
          // статичные логотипы компаний, им параллакс не нужен.
          !img.closest(".client-partners-logos-col") &&
          // Карточки типов фетра (.fetr-type-visual: сам образец + волна) —
          // тот же случай, что и .specs-visual-block: библиотека оборачивает
          // картинку в свой <div class="simpleParallax"> и масштабирует её
          // (scale: 1.3), из-за чего фото вылезает за пределы своего блока
          // и обрезается overflow:hidden карточки ("слишком приближено"),
          // а декоративная волна на скролле уезжает со своего центрированного
          // места. Тут нужна точная статичная раскладка, без параллакса.
          !img.closest(".fetr-type-visual") &&
          // Слайдер галереи на странице "Потолочные решения"
          // (.ceil-gallery-slides) — слайды и так меняются через
          // fade/крестфейд между .ceil-gallery-slide, параллакс поверх
          // этого лишний и ломает позиционирование слоёв.
          !img.closest(".ceil-gallery-slides") &&
          // Фото фурнитуры (.ceil-hardware-photo) — тот же случай, что и
          // .fetr-type-visual: параллакс оборачивает картинку и
          // масштабирует (scale: 1.3), из-за чего фото вылезает за
          // пределы своей колонки и обрезается overflow:hidden.
          !img.closest(".ceil-hardware-photo") &&
          // Фото радиусных поверхностей (.radius-image-block) — та же
          // история: обёртка simpleParallax ломает position:absolute;inset:0
          // у картинки (она должна всегда заполнять блок целиком по высоте).
          !img.closest(".radius-image-block") &&
          // Иконки в блоке "свойства" (.prop-icon img) — маленькие SVG без
          // явного width/height (только max-width/max-height); обёрнутые в
          // simpleParallax, они схлопывались в 0×0 и просто исчезали.
          !img.closest(".prop-icon") &&
          // Картинка палитры цветов на странице "Фетр" (.fetr-palettes-image-wrap) —
          // должна быть всегда прижата к правому краю блока (justify-content:
          // flex-end у обёртки), обёртка simpleParallax это ломает.
          !img.closest(".fetr-palettes-image-wrap") &&
          // Статистическая картинка в блоке про производство фетра
          // (.fetr-prod-stat-img) — заказчик попросил убрать параллакс.
          !img.closest(".fetr-prod-stat-img") &&
          // Сертификат пожарной безопасности (.fetr-fire-safety-cert) —
          // заказчик попросил убрать параллакс.
          !img.closest(".fetr-fire-safety-cert") &&
          // Сетка блока переработки (.fetr-recyc-grid) — заказчик попросил
          // убрать параллакс.
          !img.closest(".fetr-recyc-grid") &&
          // SVG-иконки в .fetr-usecases-list (.fetr-usecases-icon) — базовый
          // фильтр выше пытался исключить их через
          // "img:not(.fetr-usecases-icon)", но этот класс висит на
          // родительском div, а не на самом <img>, поэтому :not() не
          // срабатывал. Исключаем явно через closest().
          !img.closest(".fetr-usecases-icon") &&
          // Фото в блоках .fetr-small-panels-right — должно всегда
          // заполнять весь блок, обёртка simpleParallax (scale: 1.3) это
          // ломает.
          !img.closest(".fetr-small-panels-right") &&
          // Фото в .fetr-veneer-left — та же история, должно всегда
          // заполнять весь блок по высоте.
          !img.closest(".fetr-veneer-left") &&
          // Hero-фото товарных карточек на странице "Потолочные решения"
          // (.ceil-product-hero: вертикальные баффлы, горизонтальные
          // дизайн-баффлы, парящие стены) — заказчик попросил убрать
          // параллакс в этих 3 блоках.
          !img.closest(".ceil-product-hero") &&
          // Фото в блоке "собственное производство баффлов" на странице
          // "Потолочные решения" (.ceil-production-photo) — тот же случай,
          // что и .ceil-hardware-photo/.radius-image-block: картинка должна
          // заполнять блок через height:100%+object-fit:cover, а обёртка
          // simpleParallax даёт родителю height:auto — height:100% у
          // картинки перестаёт резолвиться, и фото не дотягивается до низа
          // блока (сообщил заказчик, видно на iPhone).
          !img.closest(".ceil-production-photo") &&
          // Блок "варианты укладки" на странице "Стеновые панели"
          // (.pattern-item) — та же самая история: замер показал разрыв
          // 67px между высотой блока и высотой картинки (обёртка
          // simpleParallax ломает height:100%).
          !img.closest(".pattern-item") &&
          // Фото на странице "Фетр" (.fetr-shape-right/.fetr-thick-left) —
          // те же 80px разрыва по той же причине.
          !img.closest(".fetr-shape-right") &&
          !img.closest(".fetr-thick-left")
        );
      });

      if (validImages.length > 0) {
        // simpleParallax принимает NodeList/строку-селектор/один элемент, а для
        // ЛЮБОГО другого типа (в т.ч. обычный Array — а именно им и является
        // validImages после .filter()) заворачивает переданное значение целиком
        // в массив из одного "элемента": [validImages]. На выходе получаем один
        // экземпляр, где this.element — это сам массив картинок, а не DOM-узел,
        // и вызов this.element.addEventListener(...) падает с TypeError —
        // поэтому эффект молча не запускался ни на одной картинке. Создаём
        // отдельный экземпляр на каждую картинку — с одиночным DOM-элементом
        // библиотека работает штатно.
        validImages.forEach((img) => {
          try {
            new simpleParallax(img, {
              scale: 1.3,
              delay: 1.2,
              orientation: "up",
              transition: "cubic-bezier(0, 0, 0, 1)",
              overflow: false,
            });
          } catch (err) {
            console.warn("simpleParallax initialization notice:", err);
          }
        });
      }
    }
  }

  initSimpleParallax();

  // Re-run on window load to ensure images loaded asynchronously are initialized
  window.addEventListener("load", function () {
    initSimpleParallax();
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 300);
  });

  // 1b. Параллакс на мобильном для отдельных блоков страницы walls.html —
  // основной initSimpleParallax() выше сознательно выключен на мобильном
  // (window.innerWidth > 768) для всех картинок сайта, но заказчик отдельно
  // попросил эффект именно для этих 4 фото и именно на телефонах тоже.
  // CSS-правила под .simpleParallax для этих блоков — см.
  // .trends-image/.problems-image/.offer-image/.system-image-block
  // в css/sections.css.
  function initWallsMobileParallax() {
    if (
      !/walls\.html$/.test(location.pathname) ||
      typeof simpleParallax === "undefined"
    ) {
      return;
    }
    const imgs = document.querySelectorAll(
      ".trends-image img, .problems-image img, .offer-image img, .system-image-block img",
    );
    imgs.forEach((img) => {
      if (img.closest(".simpleParallax")) return; // уже обёрнут
      try {
        new simpleParallax(img, {
          scale: 1.3,
          delay: 1.2,
          orientation: "up",
          transition: "cubic-bezier(0, 0, 0, 1)",
          overflow: false,
        });
      } catch (err) {
        console.warn("mobile parallax (walls) initialization notice:", err);
      }
    });
  }

  if (window.innerWidth <= 768) {
    initWallsMobileParallax();
    window.addEventListener("load", function () {
      initWallsMobileParallax();
      setTimeout(() => {
        window.dispatchEvent(new Event("resize"));
      }, 300);
    });
  }

  // 2. Smooth Background Parallax for Background Image Banners
  const bgSections = document.querySelectorAll(
    ".product-type-section-fetr, .product-type-section, .fetr-cleaning-banner, [style*='background-image']"
  );

  if (bgSections.length > 0) {
    let ticking = false;

    function updateBgParallax() {
      const windowHeight = window.innerHeight;

      bgSections.forEach((sec) => {
        // Exclude sliders, SVGs or small widgets
        if (
          sec.classList.contains("hero-slider") ||
          sec.classList.contains("slide") ||
          sec.classList.contains("logoIconCloud__naeNM") ||
          sec.classList.contains("fab-container")
        ) {
          return;
        }

        const rect = sec.getBoundingClientRect();
        if (rect.bottom >= 0 && rect.top <= windowHeight) {
          const scrollProgress = (windowHeight - rect.top) / (windowHeight + rect.height);
          const yOffset = (scrollProgress - 0.5) * 50; // smooth 50px vertical shift
          sec.style.backgroundPositionY = `calc(50% + ${yOffset}px)`;
        }
      });

      ticking = false;
    }

    window.addEventListener(
      "scroll",
      function () {
        if (!ticking) {
          window.requestAnimationFrame(updateBgParallax);
          ticking = true;
        }
      },
      { passive: true }
    );

    updateBgParallax();
  }
});
