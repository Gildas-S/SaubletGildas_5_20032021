import { createHomepage } from "/modules/index.mjs";
import { createPhotographerPage } from "/modules/photographer-page.mjs";
import {
  createLinkContent,
  manageContentNav
} from "/modules/link-content.mjs"
import {
  selectTags
} from "/modules/filter.mjs"

// Select the path element
const path = window.location.pathname;

// Create page based on the pathname
// Create the photographer page
if (path.includes("photographer.html")) createPhotographerPage();
//Create the index Homepage
else {
  createHomepage();
  createLinkContent();
  manageContentNav();
  selectTags();


}




