/* ============================================================
   STUDIO LUANA RODRIGUES — interações
   Menu mobile, reveal on scroll e lightbox da galeria.
   ============================================================ */

(function () {
  "use strict";

  /* ---------------- MENU MOBILE ---------------- */
  var menuBtn = document.getElementById("menuBtn");
  var nav = document.getElementById("nav");

  if (menuBtn && nav) {
    menuBtn.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
      menuBtn.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
      menuBtn.textContent = open ? "✕" : "☰";
    });

    nav.addEventListener("click", function (e) {
      if (e.target.closest("a") && nav.classList.contains("open")) {
        nav.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.setAttribute("aria-label", "Abrir menu");
        menuBtn.textContent = "☰";
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("open")) {
        nav.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.setAttribute("aria-label", "Abrir menu");
        menuBtn.textContent = "☰";
      }
    });
  }

  /* ---------------- REVEAL ON SCROLL ---------------- */
  var reveals = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && reveals.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("vis");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );

    reveals.forEach(function (el, i) {
      el.style.transitionDelay = Math.min(i % 4, 3) * 70 + "ms";
      observer.observe(el);
    });
  } else {
    reveals.forEach(function (el) {
      el.classList.add("vis");
    });
  }

  /* ---------------- LIGHTBOX ---------------- */
  var lightbox = document.getElementById("lightbox");
  var lightboxImg = document.getElementById("lightboxImg");
  var lightboxClose = document.getElementById("lightboxClose");
  var items = document.querySelectorAll(".gallery-item");
  var lastFocused = null;

  function openLightbox(button) {
    var full = button.getAttribute("data-full");
    var img = button.querySelector("img");
    if (!full || !lightbox || !lightboxImg) return;

    lastFocused = document.activeElement;
    lightboxImg.src = full;
    lightboxImg.alt = img ? img.alt : "Foto ampliada";
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
    if (lightboxClose) lightboxClose.focus();
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.hidden = true;
    lightboxImg.src = "";
    document.body.style.overflow = "";
    if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
  }

  items.forEach(function (button) {
    button.addEventListener("click", function () {
      openLightbox(button);
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !lightbox.hidden) closeLightbox();
    });
  }

  /* ---------------- LINK ATIVO NO MENU ---------------- */
  var sections = document.querySelectorAll("main section[id]");
  var navLinks = nav ? nav.querySelectorAll('a[href^="#"]') : [];

  if ("IntersectionObserver" in window && sections.length && navLinks.length) {
    var activeObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var id = "#" + entry.target.id;
          navLinks.forEach(function (link) {
            var isActive = link.getAttribute("href") === id;
            link.style.color = isActive ? "var(--gold)" : "";
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    sections.forEach(function (s) {
      activeObserver.observe(s);
    });
  }
})();
