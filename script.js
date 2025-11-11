(function () {
  const docEl = document.documentElement;
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");
  const themeToggle = document.getElementById("themeToggle");
  const yearEl = document.getElementById("year");
  const avatarImg = document.querySelector(".avatar img");

  // Year
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Navigation toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });
    // Close on outside click (small screens)
    document.addEventListener("click", (e) => {
      if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navMenu.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
    // Smooth close on link click
    navMenu.querySelectorAll("a[href^='#']").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Smooth scroll for internal links
  document.querySelectorAll("a[href^='#']").forEach((link) => {
    link.addEventListener("click", (ev) => {
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      ev.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", id);
    });
  });

  // Theme
  const storageKey = "uk-portfolio-theme";
  const prefersLight = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
  const initialTheme = localStorage.getItem(storageKey) || (prefersLight ? "light" : "dark");
  docEl.setAttribute("data-theme", initialTheme === "light" ? "light" : "dark");
  updateThemeIcon(initialTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const current = docEl.getAttribute("data-theme") === "light" ? "light" : "dark";
      const next = current === "light" ? "dark" : "light";
      docEl.setAttribute("data-theme", next);
      localStorage.setItem(storageKey, next);
      updateThemeIcon(next);
    });
  }

  function updateThemeIcon(mode) {
    if (!themeToggle) return;
    themeToggle.textContent = mode === "light" ? "🌙" : "☀️";
    themeToggle.setAttribute("aria-label", mode === "light" ? "Switch to dark mode" : "Switch to light mode");
  }

  // Avatar fallback and diagnostics
  if (avatarImg) {
    avatarImg.addEventListener("error", () => {
      console.warn("[Avatar] Failed to load image:", avatarImg.getAttribute("src"));
      avatarImg.src = "assets/img/profile-fallback.svg";
      avatarImg.alt = "Avatar placeholder";
      avatarImg.classList.add("avatar--fallback");
    }, { once: true });
  }
})();


