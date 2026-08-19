/* ==========================================================================
   Hubox — Фетр (Fetr Page Specific Interactions)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {
  // 1. Smooth Scroll for Header Anchor Links (excluding modals)
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (
        targetId &&
        targetId !== "#" &&
        targetId.startsWith("#") &&
        !targetId.toLowerCase().includes("modal")
      ) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          const headerOffset = 100;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }
    });
  });

  // 2. Additional interactive enhancements for Fetr Page
  const specCards = document.querySelectorAll(".fetr-spec-card");
  specCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-4px)";
      this.style.transition = "transform 0.3s ease, box-shadow 0.3s ease";
    });
    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });

  // 3. Image Lightbox Modal Logic
  const imageModal = document.getElementById("imageModal");
  const imageModalImg = document.getElementById("imageModalImg");
  const closeImageModalBtn = document.getElementById("closeImageModal");
  const imageModalBackdrop = imageModal ? imageModal.querySelector(".image-modal-backdrop") : null;

  if (imageModal && imageModalImg) {
    const imageModalBtns = document.querySelectorAll('a[href="#imageModal"]');

    imageModalBtns.forEach((btn) => {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        let targetImgSrc = btn.getAttribute("data-image") || "assets/image/fetr/_1.png";
        imageModalImg.src = targetImgSrc;
        imageModal.classList.add("active");
        document.body.style.overflow = "hidden";
      });
    });

    const closeImageModal = () => {
      imageModal.classList.remove("active");
      document.body.style.overflow = "";
    };

    if (closeImageModalBtn) closeImageModalBtn.addEventListener("click", closeImageModal);
    if (imageModalBackdrop) imageModalBackdrop.addEventListener("click", closeImageModal);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && imageModal.classList.contains("active")) {
        closeImageModal();
      }
    });
  }

  // 4. Samples Modal ("Заказать образцы") Logic
  const samplesModal = document.getElementById("samplesModal");
  const samplesTriggers = document.querySelectorAll('.samples-modal-trigger, a[href="#samplesModal"]');
  const closeSamplesBtn = document.getElementById("closeSamplesModal");
  const samplesBackdrop = samplesModal ? samplesModal.querySelector(".samples-modal-backdrop") : null;

  if (samplesModal) {
    samplesTriggers.forEach((btn) => {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        samplesModal.classList.add("active");
        document.body.style.overflow = "hidden";
      });
    });

    const closeSamplesModal = () => {
      samplesModal.classList.remove("active");
      document.body.style.overflow = "";
    };

    if (closeSamplesBtn) closeSamplesBtn.addEventListener("click", closeSamplesModal);
    if (samplesBackdrop) samplesBackdrop.addEventListener("click", closeSamplesModal);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && samplesModal.classList.contains("active")) {
        closeSamplesModal();
      }
    });
  }

  // 5. Callback Modal ("Обсудим проект?") Fallback Handler
  const callbackModal = document.getElementById("callbackModal");
  const callbackTriggers = document.querySelectorAll('a[href="#callbackModal"], .modal-trigger-btn');
  const closeCallbackBtn = document.getElementById("closeCallback");
  const callbackBackdrop = callbackModal ? callbackModal.querySelector(".modal-backdrop") : null;

  if (callbackModal) {
    callbackTriggers.forEach((btn) => {
      // Avoid overriding image or samples triggers
      if (btn.getAttribute("href") === "#samplesModal" || btn.getAttribute("href") === "#imageModal") return;
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        callbackModal.classList.add("active");
        document.body.style.overflow = "hidden";
      });
    });

    const closeCallbackModal = () => {
      callbackModal.classList.remove("active");
      document.body.style.overflow = "";
    };

    if (closeCallbackBtn) closeCallbackBtn.addEventListener("click", closeCallbackModal);
    if (callbackBackdrop) callbackBackdrop.addEventListener("click", closeCallbackModal);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && callbackModal.classList.contains("active")) {
        closeCallbackModal();
      }
    });
  }
});
