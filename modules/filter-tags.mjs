import data from "/modules/data.mjs";
import { createPhotographerElt } from "/modules/photographer-elt.mjs";

//Select document elements
const tagsElt = document.getElementById("tags");
const photographersElt = document.getElementById("photographers");

// Photographers data
const photographers = data.photographers;

// Manage the whole toggle logic to display correct photographers in the document
const toggleFilter = (evt) => {
    evt.preventDefault();
    const selectedTag = getClassToToggle(evt.target);
    addTagParamToURL(selectedTag);
    toggleNavSelectedTags();
    const tagsInURL = getParamsFromURL("tag");
    const photographerToDisplay = getFilteredPhotographers(tagsInURL);
  
    displayFilteredPhotographers(photographerToDisplay);
    toggleEltSelectedTags();
  
    const tagsListElts = document.querySelectorAll(".ph-elt-tags");
    tagsListElts.forEach((elt) => elt.addEventListener("click", toggleFilter));
  };

// Get the class that was clicked
const getClassToToggle = (target) => {
    let tagSelected = "";
    if (target.tagName === "A") tagSelected = target.textContent;
    if (target.tagName === "LI") tagSelected = target.lastChild.textContent;
  
    return tagSelected.toLowerCase();
  };

// Add a new tag to the current URL
const addTagParamToURL = (tagToAdd) => {
    if (tagToAdd == "") return;
  
    let url = "https://saubletg.gitlab.io/saubletgildas_5_20032021/";
    let tagParams = getParamsFromURL("tag");
  
    if (tagParams.includes(tagToAdd))
      tagParams = tagParams.filter((tag) => tag !== tagToAdd);
    else tagParams.push(tagToAdd);
  
    tagParams.forEach((tag, index) => {
      if (index === 0) url += `?tag=${tag}`;
      else url += `&tag=${tag}`;
    });
    window.history.pushState({}, "", url);
  };

// Toggle the selected class to the tags on the main navbar
const toggleNavSelectedTags = () => {
    const tagParams = getParamsFromURL("tag");
    tagsElt.childNodes.forEach((elt) => {
      if (tagParams.includes(elt.lastChild.textContent.toLowerCase()))
        elt.classList.add("selected");
      else elt.className = "";
    });
  };

// Create the document with the photographer elements to display
const displayFilteredPhotographers = (photographerToDisplay) => {
    photographersElt.innerHTML = "";
    photographerToDisplay.forEach((photographer) =>
      photographersElt.appendChild(createPhotographerElt(photographer))
    );
  };

// Toggle the selected class to the tags on the photograhers' elements
const toggleEltSelectedTags = () => {
    const tagParams = getParamsFromURL("tag");
    const phTagsElts = document.querySelectorAll(".ph-elt-tags li");
    phTagsElts.forEach((elt) => {
      if (tagParams.includes(elt.lastChild.textContent.toLowerCase()))
        elt.classList.add("selected");
      else elt.className = "";
    });
  };

// Generate an array of photographers to display based on a given array of tags
const getFilteredPhotographers = (tagsList) => {
    let photographersToDisplay = photographers;
    photographersToDisplay = photographersToDisplay.filter((photographer) => {
      for (let i = 0; i < tagsList.length; i++) {
        if (!photographer.tags.includes(tagsList[i])) return false;
      }
      return true;
    });
  
    return photographersToDisplay;
  };

// Display the filtered photographers based on the params in the URL (page creation)
const checkFilterOnPageCreation = () => {
    toggleNavSelectedTags();
    const tagsInURL = getParamsFromURL("tag");
    const photographerToDisplay = getFilteredPhotographers(tagsInURL);
  
    displayFilteredPhotographers(photographerToDisplay);
    toggleEltSelectedTags();
  
    const tagsListElts = document.querySelectorAll(".ph-elt-tags");
    tagsListElts.forEach((elt) => elt.addEventListener("click", toggleFilter));
  };
  
  export { getFilteredPhotographers, toggleFilter, checkFilterOnPageCreation };
  
