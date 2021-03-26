import { createPhotographerElt } from "/modules/photographer-elt.mjs";
import {
  getFilteredPhotographers,
  toggleFilter,
  checkFilterOnPageCreation,
} from "/modules/filter-tags.mjs";

// Select document elements
const photographersElt = document.getElementById("photographers");
const tagsElt = document.getElementById("tags");

// Build Homepage
const createHomepage = () => {
    tagsElt.addEventListener("click", toggleFilter);
  
    let photographersToDisplay = getFilteredPhotographers([]);
    photographersToDisplay.forEach((photographer) =>
      photographersElt.appendChild(createPhotographerElt(photographer))
    );
  
    const tagsListElts = document.querySelectorAll(".ph-elt-tags");
    tagsListElts.forEach((elt) => elt.addEventListener("click", toggleFilter));
  
    checkFilterOnPageCreation();
  };
  
  export { createHomepage };