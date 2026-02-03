document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const toggle = document.getElementById("langToggle");
  const jpTexts = document.querySelectorAll("[data-jp]");
  const defaultTexts = new Map();

  jpTexts.forEach((el) => {
    defaultTexts.set(el, el.textContent.trim());
  });

  if (toggle) {
    toggle.addEventListener("change", (e) => {
      const useJp = e.target.checked;
      jpTexts.forEach((el) => {
        el.textContent = useJp ? el.getAttribute("data-jp") : defaultTexts.get(el);
      });
    });
  }

  const revealElements = document.querySelectorAll(".reveal");
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReduced) {
    body.classList.add("is-loaded");
    revealElements.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  requestAnimationFrame(() => {
    body.classList.add("is-loaded");
  });

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -10% 0px",
    }
  );

  revealElements.forEach((el) => observer.observe(el));
});
