import { createPhotographerElt } from "/modules/photographer-elt.mjs";
import { createInteractiveListElt } from "/modules/utils.mjs";
import data from "/modules/data.mjs";


// Build Homepage
const createHomepage = () => {
  displayPhotographers()
  displayTagsList()
};

//Select document elements
const tagsElt = document.getElementById("tags");
const photographersElt = document.getElementById("photographers");
const photographers = data.photographers;


// Display photographers
const displayPhotographers = () => {
  photographers.forEach((photographer) => {
  photographersElt.appendChild(createPhotographerElt(photographer))
  })
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

export { createHomepage };