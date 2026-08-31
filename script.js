/* =========================================
   FLUXION SALON
   WEBSITE MOCKUP
========================================= */

/* =========================================
   MOBILE NAVIGATION
========================================= */

const menuToggle = document.querySelector(".menu-toggle");

const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");

    document.body.classList.toggle("menu-open", isOpen);
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");

      menuToggle.setAttribute("aria-expanded", "false");

      document.body.classList.remove("menu-open");
    });
  });
}

/* =========================================
   GALLERY FILTERS
========================================= */

const filterButtons = document.querySelectorAll(".filter-button");

const galleryItems = document.querySelectorAll(".gallery-item");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => {
      item.classList.toggle("active", item === button);
    });

    galleryItems.forEach((item) => {
      const category = item.dataset.category;

      const shouldShow = filter === "all" || category === filter;

      item.classList.toggle("hidden", !shouldShow);
    });
  });
});

/* =========================================
   GALLERY LIGHTBOX
========================================= */

const lightbox = document.querySelector(".lightbox");

const lightboxImage = document.querySelector(".lightbox-content img");

const lightboxCategory = document.querySelector(".lightbox-info small");

const lightboxTitle = document.querySelector(".lightbox-info strong");

const lightboxClose = document.querySelector(".lightbox-close");

const lightboxPrev = document.querySelector(".lightbox-prev");

const lightboxNext = document.querySelector(".lightbox-next");

let currentGalleryItems = [];

let currentIndex = 0;

/* Get currently visible images */

function getVisibleGalleryItems() {
  return [...galleryItems].filter((item) => {
    return !item.classList.contains("hidden");
  });
}

/* Update image */

function updateLightbox() {
  if (!currentGalleryItems.length) {
    return;
  }

  const item = currentGalleryItems[currentIndex];

  lightboxImage.src = item.dataset.image;

  lightboxImage.alt = item.querySelector("img")?.alt || item.dataset.title;

  lightboxCategory.textContent = item.dataset.categoryLabel;

  lightboxTitle.textContent = item.dataset.title;
}

/* Open */

function openLightbox(item) {
  currentGalleryItems = getVisibleGalleryItems();

  currentIndex = currentGalleryItems.indexOf(item);

  if (currentIndex < 0) {
    currentIndex = 0;
  }

  updateLightbox();

  lightbox.classList.add("open");

  lightbox.setAttribute("aria-hidden", "false");

  document.body.classList.add("lightbox-open");
}

/* Close */

function closeLightbox() {
  lightbox.classList.remove("open");

  lightbox.setAttribute("aria-hidden", "true");

  document.body.classList.remove("lightbox-open");

  setTimeout(() => {
    if (!lightbox.classList.contains("open")) {
      lightboxImage.src = "";
    }
  }, 250);
}

/* Previous */

function showPrevious() {
  if (!currentGalleryItems.length) {
    return;
  }

  currentIndex =
    (currentIndex - 1 + currentGalleryItems.length) %
    currentGalleryItems.length;

  updateLightbox();
}

/* Next */

function showNext() {
  if (!currentGalleryItems.length) {
    return;
  }

  currentIndex = (currentIndex + 1) % currentGalleryItems.length;

  updateLightbox();
}

/* Gallery click */

galleryItems.forEach((item) => {
  item.addEventListener("click", () => {
    openLightbox(item);
  });
});

/* Buttons */

lightboxClose.addEventListener("click", closeLightbox);

lightboxPrev.addEventListener("click", showPrevious);

lightboxNext.addEventListener("click", showNext);

/* Click outside */

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

/* Keyboard */

document.addEventListener("keydown", (event) => {
  if (!lightbox.classList.contains("open")) {
    return;
  }

  if (event.key === "Escape") {
    closeLightbox();
  }

  if (event.key === "ArrowLeft") {
    showPrevious();
  }

  if (event.key === "ArrowRight") {
    showNext();
  }
});

/* =========================================
   BACK TO TOP
========================================= */

const backTop = document.querySelector(".back-top");

if (backTop) {
  window.addEventListener(
    "scroll",
    () => {
      backTop.classList.toggle("show", window.scrollY > 650);
    },
    {
      passive: true,
    },
  );

  backTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements = document.querySelectorAll(
  `
    .service-card,
    .offer,
    .gallery-item,
    .value,
    .location-card
    `,
);

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("visible");

        revealObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.08,
    },
  );

  revealElements.forEach((element) => {
    element.style.opacity = "0";

    element.style.transform = "translateY(20px)";

    element.style.transition = "opacity .65s ease, transform .65s ease";

    revealObserver.observe(element);
  });
}

/* =========================================
   REVEAL CSS
========================================= */

const revealStyle = document.createElement("style");

revealStyle.textContent = `

  .service-card.visible,
  .offer.visible,
  .gallery-item.visible,
  .value.visible,
  .location-card.visible {

    opacity: 1 !important;

    transform:
      translateY(0) !important;

  }

`;

document.head.appendChild(revealStyle);

/* =========================================
   SMOOTH ANCHOR NAVIGATION
========================================= */

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");

    if (!targetId || targetId === "#") {
      return;
    }

    const target = document.querySelector(targetId);

    if (!target) {
      return;
    }

    event.preventDefault();

    const position = target.getBoundingClientRect().top + window.scrollY - 25;

    window.scrollTo({
      top: position,

      behavior: "smooth",
    });
  });
});
