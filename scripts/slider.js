document.addEventListener("DOMContentLoaded", function () {
    const burgerBtn = document.getElementById("burgerBtn");
    const centerMenu = document.getElementById("centerMenu");

    if (burgerBtn && centerMenu) {
        burgerBtn.addEventListener("click", () => {
            burgerBtn.classList.toggle("active");
            centerMenu.classList.toggle("active");
            document.body.style.overflow = centerMenu.classList.contains("active") ? "hidden" : "";
        });

        document.querySelectorAll("#centerMenu a").forEach(link => {
            link.addEventListener("click", () => {
                burgerBtn.classList.remove("active");
                centerMenu.classList.remove("active");
                document.body.style.overflow = "";
            });
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
  const burgerBtn = document.getElementById("burgerBtn");
  const centerMenu = document.getElementById("centerMenu");

  if (burgerBtn && centerMenu) {
    burgerBtn.addEventListener("click", () => {
      burgerBtn.classList.toggle("active");
      centerMenu.classList.toggle("active");
      document.body.style.overflow = centerMenu.classList.contains("active") ? "hidden" : "";
    });

    document.querySelectorAll(".center-menu a").forEach(link => {
      link.addEventListener("click", () => {
        burgerBtn.classList.remove("active");
        centerMenu.classList.remove("active");
        document.body.style.overflow = "";
      });
    });
  }

  function initCustomSlider(containerSelector) {
    const containers = document.querySelectorAll(containerSelector);
    containers.forEach((container) => {
      // Некоторые блоки (например .hero-slider + .living-slider-wrapper на
      // ceiling.html) попадают под НЕСКОЛЬКО селекторов ниже одновременно —
      // без этой защиты initCustomSlider запускался на одном и том же
      // контейнере дважды: два независимых таймера постоянно сбрасывали
      // друг другу transition/width у .progress-fill, из-за чего анимация
      // полосок прогресса не успевала визуально проиграться (хотя сама
      // смена слайдов работала, потому что переключение класса .active
      // идемпотентно).
      if (container.hasAttribute("data-custom-slider-ready")) return;
      container.setAttribute("data-custom-slider-ready", "");

      const slides = container.querySelectorAll(".slide");
      const fills = container.querySelectorAll(".progress-fill");
      const progressBars = container.querySelectorAll(".progress-bar, .progress-segment");
      if (!slides.length) return;
      let current = 0;
      let timer = null;
      const slideDuration = 5000;

      function updateSlider() {
        slides.forEach((slide, index) => slide.classList.toggle("active", index === current));
        fills.forEach((fill, index) => {
          fill.style.transition = "none";
          if (index < current) fill.style.width = "100%";
          else if (index === current) {
            fill.style.width = "0%";
            setTimeout(() => {
              fill.style.transition = `width ${slideDuration}ms linear`;
              fill.style.width = "100%";
            }, 50);
          } else fill.style.width = "0%";
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

      let touchStartX = 0;
      let touchStartY = 0;
      let touchEndX = 0;
      let touchEndY = 0;

      container.addEventListener("touchstart", (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }, { passive: true });

      container.addEventListener("touchend", (e) => {
        touchEndX = e.changedTouches[0].clientX;
        touchEndY = e.changedTouches[0].clientY;
        handleSwipe();
      }, { passive: true });

      let isDragging = false;
      container.addEventListener("mousedown", (e) => {
        touchStartX = e.clientX;
        touchStartY = e.clientY;
        isDragging = true;
      });

      container.addEventListener("mouseup", (e) => {
        if (!isDragging) return;
        isDragging = false;
        touchEndX = e.clientX;
        touchEndY = e.clientY;
        handleSwipe();
      });

      container.addEventListener("mouseleave", () => {
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
  initCustomSlider(".living-spaces-section");
  initCustomSlider(".commercial-spaces-section");
  initCustomSlider(".living-slider-wrapper");
  initCustomSlider(".commercial-slider-wrapper");
  initCustomSlider(".fetr-slider-wrapper");

  const modal = document.getElementById("callbackModal");
  const openBtns = document.querySelectorAll(".btn-callback, .btn-calculate"); 
  const closeBtn = document.getElementById("closeCallback");

  if (modal) {
    openBtns.forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        modal.classList.add("active");
        document.body.style.overflow = "hidden";
      });
    });

    const closeModal = () => {
      modal.classList.remove("active");
      document.body.style.overflow = "";
    };

    if (closeBtn) closeBtn.addEventListener("click", closeModal);
    window.addEventListener("click", (e) => { if (e.target.classList.contains("modal-backdrop")) closeModal(); });
  }
});