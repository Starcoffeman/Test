document.addEventListener("DOMContentLoaded", function () {
  const toggleItems = document.querySelectorAll(".ceil-toggle-bar .ceil-toggle-item");
  toggleItems.forEach(function (btn) {
    btn.addEventListener("click", function () {
      const bar = btn.closest(".ceil-toggle-bar");
      if (!bar) return;
      bar.querySelectorAll(".ceil-toggle-item").forEach(function (b) { b.classList.remove("is-active"); });
      btn.classList.add("is-active");
      const hero = btn.closest(".ceil-product-hero");
      if (!hero) return;
      const heroLight = hero.querySelector(".ceil-hero-light");
      const heroBase = hero.querySelector(".ceil-hero-base");
      const newSrc = btn.getAttribute("data-img");
      if (heroLight && heroBase && newSrc) {
        const isLightMode = btn === bar.querySelector(".ceil-toggle-item.is-active");
        if (newSrc.includes("light") || newSrc.includes("black") || btn === bar.querySelector(".ceil-toggle-item:first-child")) {
          heroLight.style.opacity = "1";
        } else {
          heroLight.style.opacity = "0";
        }
      }
    });
  });
});

(function initVerticalBafflesGallery() {
  const gallery = document.getElementById("verticalBafflesGallery");
  if (!gallery) return;
  const slides = gallery.querySelectorAll(".ceil-gallery-slide");
  const prevBtn = gallery.querySelector(".ceil-gallery-prev");
  const nextBtn = gallery.querySelector(".ceil-gallery-next");
  const lightBtn = gallery.querySelector(".ceil-gallery-light-btn");
  const titleEl = gallery.querySelector(".ceil-caption-title");
  const subEl = gallery.querySelector(".ceil-caption-sub");
  const mountEl = document.getElementById("vbMountType");
  const lightSourceEl = document.getElementById("vbLightSource");
  const spotImgEl = document.getElementById("vbSpotThumbImg");
  let currentIdx = 0;
  let isLightActive = true;

  function updateGallery() {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === currentIdx);
      if (i === currentIdx) {
        slide.classList.toggle("is-light", isLightActive);
        const cap = slide.getAttribute("data-caption");
        const sub = slide.getAttribute("data-subcaption");
        if (cap && titleEl) titleEl.textContent = cap;
        if (sub !== null && subEl) subEl.textContent = sub;
        const mount = slide.getAttribute("data-mount");
        const lightSource = slide.getAttribute("data-light-source");
        const spotImg = slide.getAttribute("data-spot-img");
        if (mount && mountEl) mountEl.textContent = mount;
        if (lightSource && lightSourceEl) lightSourceEl.textContent = lightSource;
        if (spotImg && spotImgEl) spotImgEl.src = spotImg;
      }
    });
    if (lightBtn) {
      lightBtn.classList.toggle("is-active", isLightActive);
      const span = lightBtn.querySelector("span");
      if (span) span.textContent = isLightActive ? "включенное освещение" : "выключенное освещение";
    }
  }

  if (prevBtn) prevBtn.addEventListener("click", () => { currentIdx = (currentIdx - 1 + slides.length) % slides.length; updateGallery(); });
  if (nextBtn) nextBtn.addEventListener("click", () => { currentIdx = (currentIdx + 1) % slides.length; updateGallery(); });
  if (lightBtn) lightBtn.addEventListener("click", () => { isLightActive = !isLightActive; updateGallery(); });
  updateGallery();
})();

(function initHorDesignBafflesGallery() {
  const gallery = document.getElementById("horDesignBafflesGallery");
  if (!gallery) return;
  const slides = gallery.querySelectorAll(".ceil-gallery-slide");
  const prevBtn = gallery.querySelector(".ceil-gallery-prev");
  const nextBtn = gallery.querySelector(".ceil-gallery-next");
  const lightBtn = gallery.querySelector(".ceil-gallery-light-btn");
  const titleEl = gallery.querySelector(".ceil-caption-title");
  let currentIdx = 0;
  let isLightActive = true;

  function updateGallery() {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === currentIdx);
      slide.classList.toggle("is-light", isLightActive);
      if (i === currentIdx) {
        const cap = slide.getAttribute("data-caption");
        if (cap && titleEl) titleEl.textContent = cap;
      }
    });
    if (lightBtn) {
      lightBtn.classList.toggle("is-active", isLightActive);
      const span = lightBtn.querySelector("span");
      if (span) span.textContent = isLightActive ? "включенное освещение" : "выключенное освещение";
    }
  }

  if (prevBtn) prevBtn.addEventListener("click", () => { currentIdx = (currentIdx - 1 + slides.length) % slides.length; updateGallery(); });
  if (nextBtn) nextBtn.addEventListener("click", () => { currentIdx = (currentIdx + 1) % slides.length; updateGallery(); });
  if (lightBtn) lightBtn.addEventListener("click", () => { isLightActive = !isLightActive; updateGallery(); });
  updateGallery();
})();

(function initHoveringWallsGallery() {
  const gallery = document.getElementById("hoveringWallsGallery");
  if (!gallery) return;
  const slides = gallery.querySelectorAll(".ceil-gallery-slide");
  const prevBtn = gallery.querySelector(".ceil-gallery-prev");
  const nextBtn = gallery.querySelector(".ceil-gallery-next");
  const lightBtn = gallery.querySelector(".ceil-gallery-light-btn");
  const titleEl = gallery.querySelector(".ceil-caption-title");
  let currentIdx = 0;
  let isLightActive = true;

  function updateGallery() {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === currentIdx);
      if (i === currentIdx) {
        slide.classList.toggle("is-light", isLightActive);
        const cap = slide.getAttribute("data-caption");
        if (cap && titleEl) titleEl.textContent = cap;
      }
    });
    if (lightBtn) {
      lightBtn.classList.toggle("is-active", isLightActive);
      const span = lightBtn.querySelector("span");
      if (span) span.textContent = isLightActive ? "включенное освещение" : "выключенное освещение";
    }
  }

  if (prevBtn) prevBtn.addEventListener("click", () => { currentIdx = (currentIdx - 1 + slides.length) % slides.length; updateGallery(); });
  if (nextBtn) nextBtn.addEventListener("click", () => { currentIdx = (currentIdx + 1) % slides.length; updateGallery(); });
  if (lightBtn) lightBtn.addEventListener("click", () => { isLightActive = !isLightActive; updateGallery(); });
  updateGallery();
})();

(function initArmstrongGallery() {
  const gallery = document.getElementById("armstrongGallery");
  if (!gallery) return;
  const slides = gallery.querySelectorAll(".ceil-gallery-slide");
  const prevBtn = gallery.querySelector(".ceil-gallery-prev");
  const nextBtn = gallery.querySelector(".ceil-gallery-next");
  const titleEl = gallery.querySelector(".ceil-caption-title");
  const subEl = gallery.querySelector(".ceil-caption-sub");
  let currentIdx = 0;

  function updateGallery() {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === currentIdx);
      if (i === currentIdx) {
        const cap = slide.getAttribute("data-caption");
        const sub = slide.getAttribute("data-subcaption");
        if (cap && titleEl) titleEl.textContent = cap;
        if (subEl) subEl.textContent = sub || "";
      }
    });
  }

  if (prevBtn) prevBtn.addEventListener("click", () => { currentIdx = (currentIdx - 1 + slides.length) % slides.length; updateGallery(); });
  if (nextBtn) nextBtn.addEventListener("click", () => { currentIdx = (currentIdx + 1) % slides.length; updateGallery(); });
  updateGallery();
})();

(function initComparePersonalization() {
  const toggleBtns = document.querySelectorAll(".ceil-compare-toggle-btn");
  toggleBtns.forEach((btn, idx) => {
    btn.addEventListener("click", () => {
      toggleBtns.forEach(b => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      const isOffice = (idx === 0);
      const leftOffice = document.querySelector(".ceil-comp-left-office");
      const leftHoreca = document.querySelector(".ceil-comp-left-horeca");
      const rightOffice = document.querySelector(".ceil-comp-right-office");
      const rightHoreca = document.querySelector(".ceil-comp-right-horeca");
      if (leftOffice && leftHoreca) { leftOffice.style.opacity = isOffice ? "1" : "0"; leftHoreca.style.opacity = isOffice ? "0" : "1"; }
      if (rightOffice && rightHoreca) { rightOffice.style.opacity = isOffice ? "1" : "0"; rightHoreca.style.opacity = isOffice ? "0" : "1"; }
    });
  });
})();

document.addEventListener("DOMContentLoaded", function() {
  const spotData = {
    fon1: {
      title: "встраиваемый спот",
      photo: "assets/image/ceiling/fon1.jpg",
      specs: [
        ["источник", "LED модуль"],
        ["мощность", "10 Вт"],
        ["световой поток / угол рассеивания", "680 лм / 100°"],
        ["цветовая температура", "4000 К"],
        ["размеры (мм)", "110x110x50"]
      ]
    },
    fon2: {
      title: "алюминиевый анодированный профиль с светодиодной лентой для контурной подсветки",
      photo: "assets/image/ceiling/fon2.png",
      specs: [
        ["материал", "алюминий"],
        ["цвет", "серебристый"],
        ["способ монтажа", "встраиваемый профиль в панель"],
        ["кпд профиля (световой)", "75 %"],
        ["размеры (мм)", "2400x10×8,8"],
        ["ширина площадки ленты (мм)", "7,5"]
      ]
    }
  };

  document.querySelectorAll('.ceil-spot-badge').forEach(function(badge) {
    const swap = badge.closest('.ceil-specs-swap');
    if (!swap) return;
    const detail = swap.querySelector('.ceil-specs-swap-detail');
    const titleEl = detail.querySelector('.ceil-specs-swap-detail-title');
    const specsEl = detail.querySelector('.ceil-specs-swap-detail-specs');
    const imgEl = detail.querySelector('.ceil-specs-swap-detail-photo img');
    const closeBtn = detail.querySelector('.ceil-specs-swap-close');

    function openDetail() {
      const thumbImg = badge.querySelector('.ceil-spot-thumb img');
      const src = thumbImg ? (thumbImg.getAttribute('src') || '') : '';
      const key = src.includes('fon2') ? 'fon2' : 'fon1';
      const data = spotData[key];
      if (!data) return;
      titleEl.textContent = data.title;
      specsEl.innerHTML = data.specs.map(function(row) {
        return '<div class="ceil-specs-swap-detail-row"><span>' + row[0] + '</span><span>' + row[1] + '</span></div>';
      }).join("");
      imgEl.src = data.photo;
      imgEl.alt = data.title;
      swap.classList.add("is-expanded");
    }

    function closeDetail() {
      swap.classList.remove("is-expanded");
    }

    badge.addEventListener('click', function(e) {
      e.preventDefault();
      openDetail();
    });
    badge.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openDetail();
      }
    });
    if (closeBtn) closeBtn.addEventListener('click', closeDetail);
  });
});
