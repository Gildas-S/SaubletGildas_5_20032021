import {
    openDialogModal,
    closeDialogModal,
    photographerWorks,
  } from "/modules/photographer-page.mjs";
import { createTextualElt } from "/modules/utils.mjs";
import MediaFactory from "/modules/media.mjs";
  
  // Index Position of the current media
  let indexCurrentMedia = -1;
  let focusedMedia = document.activeElement;
  
  // Select document elements
  const coverElt = document.getElementById("lightbox-cover");
  const lightboxElt = document.getElementById("lightbox");
  const contentElt = document.getElementById("lightbox-content");
  const closeElt = document.getElementById("lightbox-close");
  const bodyElt = document.getElementsByTagName("body")[0];
  const htmlElt = document.getElementsByTagName("html")[0];
  const previousElt = document.getElementById("lightbox-previous");
  const nextElt = document.getElementById("lightbox-next");
  
  // Make nav elements interactive
  const configureLightboxControls = () => {
    closeElt.addEventListener("click", closeLightBox);
    previousElt.addEventListener("click", goToPreviousMedia);
    nextElt.addEventListener("click", goToNextMedia);
  
    window.addEventListener("keydown", manageKeyboardNav);
  };
  
  // Manage lightbox when pressing enter
  const manageLightBoxOnKeyboard = function (mediaElt) {
    return function manageKeyboard(evt) {
      if (evt.key === "Enter") {
        evt.preventDefault();
        manageLightBox(mediaElt)();
      }
    };
  };
  
  // Manage individual media element inside the lightbox
  const manageLightBox = function (mediaElt) {
    return function manage() {
      openLightbox();
      fillLightbox(mediaElt);
      focusedMedia = document.activeElement;
  
      const mediaClicked = document.getElementById("current-media-lightbox");
      if (mediaElt.type === "image") closeElt.focus();
      if (mediaElt.type === "video") mediaClicked.focus();
      lightboxElt.addEventListener("keydown", keyboardTrapLightbox);
    };
  };
  
  // Display the lightbox on the browser
  const openLightbox = () => {
    openDialogModal();
  
    coverElt.style.display = "block";
    coverElt.setAttribute("aria-hidden", "false");
    lightboxElt.style.display = "block";
    lightboxElt.setAttribute("aria-hidden", "false");
    htmlElt.scrollTop = 0;
    bodyElt.scrollTop = 0;
    bodyElt.style.overflow = "hidden";
  };
  
  // Manage Keyboard trap on lightbox
  const keyboardTrapLightbox = (evt) => {
    const currentMedia = document.getElementById("current-media-lightbox");
  
    if (currentMedia.tagName === "IMG") {
      if (evt.keyCode === 9) {
        if (evt.shiftKey) {
          if (document.activeElement === closeElt) {
            evt.preventDefault();
            nextElt.focus();
          }
        } else {
          if (document.activeElement === nextElt) {
            evt.preventDefault();
            closeElt.focus();
          }
        }
      }
    } else {
      if (evt.keyCode === 9) {
        if (evt.shiftKey) {
          if (document.activeElement === currentMedia) {
            evt.preventDefault();
            nextElt.focus();
          }
        } else {
          if (document.activeElement === nextElt) {
            evt.preventDefault();
            currentMedia.focus();
          }
        }
      }
    }
  
    if (evt.keyCode === 27) closeLightBox();
  };
  
  // Remove the lightbox from the browser view
  const closeLightBox = () => {
    closeDialogModal();
    focusedMedia.focus();
  
    coverElt.style.display = "none";
    coverElt.setAttribute("aria-hidden", "true");
    lightboxElt.style.display = "none";
    lightboxElt.setAttribute("aria-hidden", "true");
    bodyElt.style.overflow = "auto";
  };
  
  // Fill the lightbox with the media the user clicked on
  const fillLightbox = (media) => {
    contentElt.innerHTML = "";
    contentElt.appendChild(media.createFullElt());
    const mediaTitle = createTextualElt("h3", media.alt, "lightbox-media-title");
    contentElt.appendChild(mediaTitle);
  
    indexCurrentMedia = getCurrentMediaPosition(media);
  };
  
  //Get the index of the current media displayed on lightbox
  const getCurrentMediaPosition = (media) => {
    for (let i = 0; i < photographerWorks.length; i++) {
      if (photographerWorks[i].id === media.id) return i;
    }
  
    return -1;
  };
  
  // Create a new DOM media
  const createNewMedia = () => {
    const mediaData = photographerWorks[indexCurrentMedia];
    const mediaType = mediaData.image ? "image" : "video";
  
    const newMedia = new MediaFactory(mediaType, mediaData);
    fillLightbox(newMedia);
  };
  
  // Display the previous media of the photographer to the lightbox
  const goToPreviousMedia = () => {
    if (indexCurrentMedia > 0) indexCurrentMedia--;
    else indexCurrentMedia = photographerWorks.length - 1;
  
    createNewMedia();
  };
  
  // Display the next media of the photographer to the lightbox
  const goToNextMedia = () => {
    if (indexCurrentMedia < photographerWorks.length - 1) indexCurrentMedia++;
    else indexCurrentMedia = 0;
  
    createNewMedia();
  };
  
  // Manage the keyboard navigation
  const manageKeyboardNav = (evt) => {
    switch (evt.key) {
      case "Left":
      case "ArrowLeft":
        goToPreviousMedia();
        break;
      case "Right":
      case "ArrowRight":
        goToNextMedia();
        break;
      case "Esc":
      case "Escape":
        closeLightBox();
        break;
      default:
        return;
    }
  
    evt.preventDefault();
  };
  
  export { manageLightBox, configureLightboxControls, manageLightBoxOnKeyboard };
  