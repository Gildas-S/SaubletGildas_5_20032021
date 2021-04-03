import { createPhotographerElt } from "/modules/photographer-elt.mjs";
import { createInteractiveListElt } from "/modules/utils.mjs";
import data from "/modules/data.mjs";


// Build Homepage
const createHomepage = () => {
  displayPhotographers();
  displayTagsList();
  filterTags();
};

//Select document elements
let tagsElt = document.getElementById("tags");
let photographersElt = document.getElementById("photographers");
let photographers = data.photographers;


// Display photographers
const displayPhotographers = () => {
  console.log(photographersElt);
  removeAllChildNodes(photographersElt)
  photographers.forEach((photographer) => {
  photographersElt.appendChild(createPhotographerElt(photographer))
  })
  console.log(photographersElt);
}

// Display tags list
const displayTagsList = () => {
  let tagsList = [];
  photographers.forEach(photographer => {
    tagsList.push(...photographer.tags)
  })
  tagsList = new Set(tagsList)
  tagsList.forEach((tag) => {
    createInteractiveListElt(tagsElt, tag, "index.html")
  })
};

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
}
//Filter index tags list 
const filterTags = () => {
  const tagsElt = document.getElementById("tags");
  tagsElt.addEventListener("click", (e) => {
  e.preventDefault();
  photographers = photographers.filter(photographer => photographer.tags.includes(e.target.outerText.trim()))
  displayPhotographers();
  })
}

export { createHomepage, displayPhotographers };