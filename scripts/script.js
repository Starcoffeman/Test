// script.js — полный файл со всей логикой
document.addEventListener("DOMContentLoaded", function () {
  // ---------- АНИМАЦИЯ ПОЯВЛЕНИЯ ПРИ СКРОЛЛЕ ----------
  const revealElements = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.01,
      rootMargin: "0px 0px 80px 0px",
    },
  );

  revealElements.forEach((el) => {
    revealObserver.observe(el);
  });
  let lastScrollTop = 0;
  const navbar = document.querySelector(".navbar");
  const mobileOverlay = document.getElementById("mobileOverlay");
  const scrollThreshold = 150;

  window.addEventListener(
    "scroll",
    function () {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (mobileOverlay && mobileOverlay.classList.contains("active")) {
        return;
      }

      /* .navbar — старая шапка; на страницах с общим хедером сайта
         (css/home/01-header.css + .header--autohide) её в разметке уже
         нет, скрытие/показ хедера делает 24-sticky-header-hide.js */
      if (!navbar) {
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        return;
      }

      if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
        navbar.classList.add("navbar--hidden");
      } else if (scrollTop < lastScrollTop) {
        navbar.classList.remove("navbar--hidden");
      }

      if (scrollTop < 10) {
        navbar.classList.remove("navbar--hidden");
      }

      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    },
    { passive: true },
  );

  // ---------- СЛАЙДЕРЫ ----------
  function initCustomSlider(wrapperSelector) {
    const wrappers = document.querySelectorAll(wrapperSelector);

    wrappers.forEach((wrapper) => {
      const slides = wrapper.querySelectorAll(".slide");
      const fills = wrapper.querySelectorAll(".progress-fill");
      const progressBars = wrapper.querySelectorAll(".progress-bar, .progress-segment");

      if (!slides.length) return;

      let current = 0;
      let timer = null;
      const slideDuration = 5000;

      function updateSlider() {
        slides.forEach((s, i) => s.classList.toggle("active", i === current));

        fills.forEach((fill, i) => {
          fill.style.transition = "none";
          if (i < current) {
            fill.style.width = "100%";
          } else if (i === current) {
            fill.style.width = "0%";
            setTimeout(() => {
              fill.style.transition = `width ${slideDuration}ms linear`;
              fill.style.width = "100%";
            }, 50);
          } else {
            fill.style.width = "0%";
          }
        });
      }

      function startTimer() {
        if (timer) clearInterval(timer);
        timer = setInterval(() => {
          current = (current + 1) % slides.length;
          updateSlider();
        }, slideDuration);
      }

      progressBars.forEach((bar, idx) => {
        bar.addEventListener("click", (e) => {
          e.stopPropagation();
          current = idx;
          updateSlider();
          startTimer();
        });
      });

      // Touch & Swipe Support
      let touchStartX = 0;
      let touchStartY = 0;
      let touchEndX = 0;
      let touchEndY = 0;

      wrapper.addEventListener(
        "touchstart",
        (e) => {
          touchStartX = e.touches[0].clientX;
          touchStartY = e.touches[0].clientY;
        },
        { passive: true }
      );

      wrapper.addEventListener(
        "touchend",
        (e) => {
          touchEndX = e.changedTouches[0].clientX;
          touchEndY = e.changedTouches[0].clientY;
          handleSwipe();
        },
        { passive: true }
      );

      // Mouse drag support for desktop testing
      let isDragging = false;
      wrapper.addEventListener("mousedown", (e) => {
        touchStartX = e.clientX;
        touchStartY = e.clientY;
        isDragging = true;
      });

      wrapper.addEventListener("mouseup", (e) => {
        if (!isDragging) return;
        isDragging = false;
        touchEndX = e.clientX;
        touchEndY = e.clientY;
        handleSwipe();
      });

      wrapper.addEventListener("mouseleave", () => {
        isDragging = false;
      });

      function handleSwipe() {
        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;

        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 30) {
          if (deltaX < 0) {
            current = (current + 1) % slides.length;
          } else {
            current = (current - 1 + slides.length) % slides.length;
          }
          updateSlider();
          startTimer();
        }
      }

      updateSlider();
      startTimer();
    });
  }

  initCustomSlider(".hero-slider");
  initCustomSlider(".living-slider-wrapper");
  initCustomSlider(".commercial-slider-wrapper");
  initCustomSlider(".fetr-slider-wrapper");
  initCustomSlider(".living-spaces-section");
  initCustomSlider(".commercial-spaces-section");

  // ---------- МАСКА ТЕЛЕФОНА ----------
  const phoneInputs = document.querySelectorAll('input[type="tel"]');
  const onPhoneInput = function (e) {
    let input = e.target;
    let val = input.value.replace(/\D/g, "");
    if (!val) {
      input.value = "";
      return;
    }
    let formatted = "";
    if (["7", "8", "9"].indexOf(val[0]) > -1) {
      if (val[0] === "9") val = "7" + val;
      let first = val[0] === "8" ? "8" : "+7";
      formatted = first + " ";
      if (val.length > 1) formatted += "(" + val.substring(1, 4);
      if (val.length >= 5) formatted += ") " + val.substring(4, 7);
      if (val.length >= 8) formatted += "-" + val.substring(7, 9);
      if (val.length >= 10) formatted += "-" + val.substring(9, 11);
    } else {
      formatted = "+" + val.substring(0, 16);
    }
    input.value = formatted;
  };
  const onPhoneKeyDown = function (e) {
    if (e.keyCode === 8 && e.target.value.replace(/\D/g, "").length === 1) {
      e.target.value = "";
    }
  };
  phoneInputs.forEach((inp) => {
    inp.addEventListener("input", onPhoneInput);
    inp.addEventListener("keydown", onPhoneKeyDown);
  });

  // ---------- БУРГЕР-МЕНЮ (ОВЕРЛЕЙ) ----------
  const burger = document.getElementById("burgerBtn");
  const overlay = document.getElementById("mobileOverlay");

  if (burger && overlay) {
    const closeMenu = () => {
      burger.classList.remove("active");
      overlay.classList.remove("active");
      document.body.style.overflow = "";
    };

    burger.addEventListener("click", function (e) {
      e.stopPropagation();
      const isActive = overlay.classList.contains("active");
      if (isActive) {
        closeMenu();
      } else {
        burger.classList.add("active");
        overlay.classList.add("active");
        document.body.style.overflow = "hidden";
      }
    });

    const mobileLinks = overlay.querySelectorAll("a");
    mobileLinks.forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && overlay.classList.contains("active")) {
        closeMenu();
      }
    });
  }

  // ---------- ВИДЕО МОДАЛКА ----------
  const playBtn = document.querySelector(".play-button-container");
  const videoModal = document.getElementById("videoModal");
  const closeVideo = document.getElementById("closeModal");
  const modalVideo = document.getElementById("modalVideo");
  const modalOverlay = document.querySelector(".video-modal .modal-overlay");

  if (playBtn && videoModal) {
    playBtn.addEventListener("click", () => {
      videoModal.classList.add("active");
      document.body.style.overflow = "hidden";
      if (modalVideo) modalVideo.play();
    });
    const closeVideoModal = () => {
      videoModal.classList.remove("active");
      document.body.style.overflow = "";
      if (modalVideo) {
        modalVideo.pause();
        modalVideo.currentTime = 0;
      }
    };
    if (closeVideo) closeVideo.addEventListener("click", closeVideoModal);
    if (modalOverlay) modalOverlay.addEventListener("click", closeVideoModal);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && videoModal.classList.contains("active"))
        closeVideoModal();
    });
  }

  const fabContainer = document.getElementById("fabContainer");
  const fabToggle = document.getElementById("fabToggle");

  if (fabToggle && fabContainer) {
    fabToggle.addEventListener("click", function () {
      fabContainer.classList.toggle("active");
    });

    // Закрывать меню при клике вне его области
    document.addEventListener("click", function (e) {
      if (!fabContainer.contains(e.target)) {
        fabContainer.classList.remove("active");
      }
    });
  }

  // ---------- CALLBACK МОДАЛКА ----------

  const callbackModal = document.getElementById("callbackModal");
  const openBtns = document.querySelectorAll(
    '.btn-callback, .btn-calculate, .modal-trigger-btn, a[href="#callbackModal"]'
  );
  const closeCallback = document.getElementById("closeCallback");
  const backdrop = callbackModal
    ? callbackModal.querySelector(".modal-backdrop")
    : null;

  if (callbackModal) {
    openBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const href = btn.getAttribute("href");
        if (href && (href.endsWith(".html") || href.includes("http") || !href.includes("Modal"))) {
          return; // Переадресация на другую страницу
        }
        // На fetr.html класс .modal-trigger-btn используют И кнопки
        // "обратный звонок" (#callbackModal), И кнопки "подробнее" у
        // фото (#imageModal), И кнопка "получить образцы" (#samplesModal) —
        // класс общий, а href.includes("Modal") пропускал их всех, из-за
        // чего клик по кнопке фото одновременно открывал ещё и эту
        // модалку. Открываем только если это реально #callbackModal.
        if (href && href !== "#callbackModal") {
          return;
        }
        e.preventDefault();
        callbackModal.classList.add("active");
        document.body.style.overflow = "hidden";
      });
    });
    const closeCallbackModal = () => {
      callbackModal.classList.remove("active");
      document.body.style.overflow = "";
    };
    if (closeCallback)
      closeCallback.addEventListener("click", closeCallbackModal);
    if (backdrop) backdrop.addEventListener("click", closeCallbackModal);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && callbackModal.classList.contains("active"))
        closeCallbackModal();
    });
  }
});

/* Бургер и мобильное меню (#mobileMenu / .header-burger) обслуживает
   js/home/02-mobile-menu.js — общий компонент сайта. Дублирующий
   обработчик отсюда убран: он безусловно ДОБАВЛЯЛ класс is-open, а
   02-mobile-menu.js его тут же ПЕРЕКЛЮЧАЛ обратно, и по клику на бургер
   меню фактически не открывалось. */
