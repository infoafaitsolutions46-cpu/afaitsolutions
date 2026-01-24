document.addEventListener("DOMContentLoaded", () => {
  // 1) Fade-in on scroll
  const fadeEls = document.querySelectorAll(".fade-in");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );
  fadeEls.forEach((el) => io.observe(el));

  // 2) Smooth scroll for in-page anchors
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // 3) Reading progress bar
  const progress = document.createElement("div");
  progress.className = "seo-progress";
  document.body.appendChild(progress);

  const updateProgress = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progress.style.width = `${pct}%`;
  };

  // Throttle using requestAnimationFrame
  let ticking = false;
  const onScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateProgress();
        ticking = false;
      });
      ticking = true;
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  updateProgress();

  // 4) Optional: highlight section on scroll (adds .active to h2 in view)
  const headings = document.querySelectorAll(".prose h2");
  const ho = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const h2 = entry.target;
        if (entry.isIntersecting) {
          h2.style.backgroundSize = "100% 3px";
        } else {
          h2.style.backgroundSize = "64px 3px";
        }
      });
    },
    { threshold: 0.6 }
  );
  headings.forEach((h) => {
    // Initialize decorative underline size
    h.style.backgroundSize = "64px 3px";
    ho.observe(h);
  });

  // 5) Respect reduced motion
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) {
    fadeEls.forEach((el) => el.classList.add("visible"));
  }
});
