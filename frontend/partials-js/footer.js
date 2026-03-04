const footerHTML = `
<footer class="site-footer">

  <div class="footer-main">

    <!-- LEFT -->
    <div class="footer-col footer-contact">

      <img src="images/logo.png" class="footer-logo">

      <p>
        Precision fabrication and engineering solutions delivering
        reliability, scalability and advanced manufacturing capabilities.
      </p>

      <a href="mailto:info@hkenterprises.com" class="footer-email">
        info@hkenterprises.com
      </a>

    </div>

    <!-- COMPANY -->
    <div class="footer-col">
      <h3>Company</h3>
      <ul>
        <li><a href="#">About</a></li>
        <li><a href="#">Infrastructure</a></li>
        <li><a href="#">Industries</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </div>

    <!-- SERVICES -->
    <div class="footer-col">
      <h3>Services</h3>
      <ul>
        <li><a href="#">Laser Cutting</a></li>
        <li><a href="#">CNC Bending</a></li>
        <li><a href="#">Metal Fabrication</a></li>
        <li><a href="#">Engineering</a></li>
      </ul>
    </div>

  </div>


  <!-- BIG CTA SECTION -->

  <div class="footer-cta">

    <div class="cta-content">

      <div class="cta-left">
        <h2>Stay Connected</h2>
        <p>
          Get updates about our latest fabrication projects and engineering
          innovations.
        </p>
      </div>

      <div class="cta-right">
        <input type="email" placeholder="Enter your email address">
        <button>JOIN</button>
      </div>

    </div>

    <div class="footer-bg-text">HK</div>

  </div>


  <!-- COPYRIGHT -->

  <div class="footer-bottom">
    © 2026 HK Enterprises. All Rights Reserved.
  </div>

</footer>
`;

document.getElementById("site-footer").innerHTML = footerHTML;