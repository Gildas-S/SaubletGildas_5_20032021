import { createHomepage } from "/modules/index.mjs";
import { createPhotographerPage } from "/modules/photographer-page.mjs";
import { linkContent } from "/modules/link-content.mjs"
import { selectTags } from "/modules/filter.mjs"

// Create page based on the pathname
// Select the path element
const path = window.location.pathname;

// Create the photographer page
if (path.includes("photographer.html"))
createPhotographerPage();

//Create the index Homepage
else {
  createHomepage();
  linkContent();
  selectTags();
}




