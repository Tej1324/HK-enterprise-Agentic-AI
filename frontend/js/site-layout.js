document.addEventListener("DOMContentLoaded", () => {
  // Inject Header
  const headerScript = document.createElement("script");
  headerScript.src = "partials-js/header.js";
  document.body.prepend(headerScript);

  // Inject Footer
  const footerScript = document.createElement("script");
  footerScript.src = "partials-js/footer.js";
  document.body.appendChild(footerScript);
});
