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

    // Move blobs
    blobs.forEach((blob, i) => {
      const speed = 0.15 + i * 0.05;
      const currentTop = parseFloat(blob.style.top) || blob.offsetTop;
      blob.style.transform = `translateY(${scrollTop * speed}px)`;
    });

    // Move floating shapes in opposite directions for depth
    shapes.forEach((shape, i) => {
      const speed = 0.1 + i * 0.03;
      shape.style.transform = `translateY(${-scrollTop * speed}px) rotate(${scrollTop * (0.05 + i * 0.02)}deg)`;
    });

    lastScrollTop = scrollTop;
  });
});
