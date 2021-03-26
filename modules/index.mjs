import { createHomepage } from "/modules/homepage.mjs";
import { createPhotographerPage } from "/modules/photographer-page.mjs";

const path = window.location.pathname;

// Create page based on the pathname
if (path.includes("photographer.html")) createPhotographerPage();
else {
  const linkElt = document.getElementById("link-content");
  createHomepage();
  document.addEventListener("scroll", manageContentNav);
  linkElt.addEventListener("focus", () => (linkElt.style.top = "6px"));
  linkElt.addEventListener("blur", () => (linkElt.style.top = "-100px"));
}

// Display or hide link (scroll event)
function manageContentNav() {
    const linkElt = document.getElementById("link-content");
    const bannerElt = document.getElementById("header-banner");
  
    if (window.scrollY >= bannerElt.offsetHeight - 20) {
      linkElt.style.top = "6px";
    }
    if (window.scrollY < bannerElt.offsetHeight - 20) {
      linkElt.style.top = "-100px";
    }
  }