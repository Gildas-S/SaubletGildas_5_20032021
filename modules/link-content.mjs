//Add index event
//Create link-content
const createLinkContent = () => {
    const linkElt = document.getElementById("link-content");
    document.addEventListener("scroll", manageContentNav);
    linkElt.addEventListener("focus", () => (linkElt.style.top = "6px"));
    linkElt.addEventListener("blur", () => (linkElt.style.top = "-100px"));
}

// Display or hide link (scroll event)
const manageContentNav = () => {
    const linkElt = document.getElementById("link-content");
    const bannerElt = document.getElementById("header-banner");
  
    if (window.scrollY >= bannerElt.offsetHeight - 20) {
      linkElt.style.top = "6px";
    }
    if (window.scrollY < bannerElt.offsetHeight - 20) {
      linkElt.style.top = "-100px";
    }
  }

  export {
    createLinkContent, 
    manageContentNav 
    };