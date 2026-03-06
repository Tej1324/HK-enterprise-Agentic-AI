const headerHTML = `
<header id="mainHeader" class="site-header">

  <div class="nav-container">
    <div id="headerInner" class="nav-inner">

      <!-- LOGO -->
      <div class="logo-wrap">
        <img src="images/logo.png" alt="HK Enterprises Logo" class="logo-img">

        <div class="logo-text">
          <span class="logo-title">HK Enterprises</span>
          <span class="logo-subtitle">
            Precision • Fabrication • Engineering
          </span>
        </div>
      </div>

      <!-- DESKTOP NAV -->
      <nav class="desktop-nav">
        <a href="/">Home</a>
<a href="/about">About</a>
<a href="/services">Services</a>
<a href="/infrastructure">Infrastructure</a>
<a href="/industries">Industries</a>
<a href="/contact">Contact</a>

        <a href="contact.html" class="quote-btn">
          Get a Quote
        </a>
      </nav>

      <!-- HAMBURGER -->
      <button id="hamburger" class="hamburger" aria-label="Menu">
        <span></span>
        <span></span>
        <span></span>
      </button>

    </div>
  </div>

  <!-- MOBILE MENU -->
  <div id="mobileMenu" class="mobile-menu">
    <nav>
      <a class="mobile-link" href="index.html">Home</a>
      <a class="mobile-link" href="about.html">About</a>
      <a class="mobile-link" href="services.html">Services</a>
      <a class="mobile-link" href="infrastructure.html">Infrastructure</a>
      <a class="mobile-link" href="industries.html">Industries</a>
      <a class="mobile-link" href="contact.html">Contact</a>
    </nav>
  </div>
</header>

<!-- WHATSAPP -->
<a href="https://wa.me/9157317896" class="whatsapp-btn" aria-label="WhatsApp">
  💬
</a>
`;

/* Inject header */
document.getElementById("site-header").innerHTML = headerHTML;

/* MOBILE MENU + HAMBURGER TOGGLE */
document.addEventListener("click", (e) => {
  const menu = document.getElementById("mobileMenu");
  const burger = document.getElementById("hamburger");

  if (!menu || !burger) return;

  if (e.target.closest("#hamburger")) {
    menu.classList.toggle("show");
    burger.classList.toggle("active");
  }
});

/* HEADER SHRINK ON SCROLL */
window.addEventListener("scroll", () => {
  const header = document.getElementById("mainHeader");
  const inner = document.getElementById("headerInner");

  if (!header || !inner) return;

  if (window.scrollY > 80) {
    header.classList.add("scrolled");
    inner.classList.add("shrink");
  } else {
    header.classList.remove("scrolled");
    inner.classList.remove("shrink");
  }
});