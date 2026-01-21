document.addEventListener("DOMContentLoaded", () => {
  // Fade-in reveal
  const revealElements = document.querySelectorAll(
    ".fade-in, .info-card, .project-card, .skill-card, .stack-card"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("show");
          }, index * 150);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach((el) => observer.observe(el));

  // Parallax elements
  const blobs = document.querySelectorAll(".animated-bg span");
  const shapes = document.querySelectorAll(".floating-shapes .shape");

  let lastScrollTop = window.scrollY;

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;

    // Scroll progress bar
    const bar = document.getElementById("scroll-progress");
    if (bar) bar.style.width = progress + "%";

    const delta = scrollTop - lastScrollTop;

    // ---- Heavy parallax for blobs ----
    blobs.forEach((blob, i) => {
      const speed = 0.25 + i * 0.1; // faster movement for deeper effect
      const currentY = parseFloat(blob.dataset.offset || blob.offsetTop);
      blob.style.transform = `translateY(${currentY + scrollTop * speed}px)`;
    });

    // ---- Heavy parallax for floating shapes ----
    shapes.forEach((shape, i) => {
      const speedY = 0.15 + i * 0.05; // vertical speed
      const speedRot = 0.08 + i * 0.02; // rotation speed
      const baseY = parseFloat(shape.dataset.offset || shape.offsetTop);

      // Smooth easing
      shape.style.transform = `translateY(${
        baseY - scrollTop * speedY
      }px) rotate(${scrollTop * speedRot}deg)`;
    });

    lastScrollTop = scrollTop;
  });

  // Initialize data-offset for smooth relative movement
  blobs.forEach((b) => b.setAttribute("data-offset", b.offsetTop));
  shapes.forEach((s) => s.setAttribute("data-offset", s.offsetTop));
});
