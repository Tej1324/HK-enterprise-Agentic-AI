/* =====================================================
   GLOBAL MAIN.JS – USED ON ALL PAGES
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ================== REVEAL ON SCROLL ================== */
  const reveals = document.querySelectorAll(".reveal");

  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;

    reveals.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      if (elementTop < windowHeight - 80) {
        el.classList.add("show");
      }
    });
  };

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll(); // run once on load


  /* ================== AUTO STAGGER (IMPACT CARDS) ================== */
  const impactCards = document.querySelectorAll(".impact-card");

  if (impactCards.length) {
    impactCards.forEach((card, index) => {
      card.style.transitionDelay = `${index * 0.15}s`;
    });
  }


  /* ================== COUNT UP ANIMATION ================== */
  const counters = document.querySelectorAll(".counter");

  const runCounter = (counter) => {
    const target = Number(counter.dataset.target);
    let count = 0;
    const speed = target > 1000 ? 200 : 80;

    const update = () => {
      const increment = target / speed;

      if (count < target) {
        count += increment;
        counter.innerText = Math.ceil(count).toLocaleString();
        requestAnimationFrame(update);
      } else {
        counter.innerText = target.toLocaleString() + "+";
      }
    };

    update();
  };

  if (counters.length) {
    const counterObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            runCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );

    counters.forEach(counter => counterObserver.observe(counter));
  }


  /* ================== HAMBURGER MENU ================== */
  const hamburger = document.querySelector(".hamburger");
  const mobileMenu = document.querySelector(".mobile-menu");

  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", () => {
      mobileMenu.classList.toggle("show");
    });

    document.querySelectorAll(".mobile-menu a").forEach(link => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("show");
      });
    });
  }


  /* ================== HEADER SHRINK ON SCROLL ================== */
  const header = document.querySelector(".site-header");

  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 80) {
        header.style.height = "64px";
        document.body.style.paddingTop = "64px";
      } else {
        header.style.height = "80px";
        document.body.style.paddingTop = "80px";
      }
    });
  }

});
/* ================== COOKIE BANNER ================== */
document.addEventListener("click", (e) => {
  if (e.target.id === "acceptCookies") {
    localStorage.setItem("cookiesAccepted", "true");
    document.getElementById("cookieBanner").style.display = "none";
  }
});

window.addEventListener("load", () => {
  if (localStorage.getItem("cookiesAccepted") === "true") {
    const banner = document.getElementById("cookieBanner");
    if (banner) banner.style.display = "none";
  }
});
