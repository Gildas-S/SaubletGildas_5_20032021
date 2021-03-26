import { createEltWithClassName } from "/modules/utils.mjs";
import { photographerWorks } from "/modules/photographer-page.mjs";

// Select document element
const worksElt = document.getElementById("works-elts");

// Setup the likes
const path = document.location.pathname;
if (path.includes("photographer.html")) {
  worksElt.addEventListener("click", incrementLikesOnClick);
}

//Increment likes when pressing enter
const incrementLikesOnKeyboard = (evt) => {
  if (evt.key === "Enter") {
    evt.preventDefault();
    incrementLikes(evt.target);
  }
};

//Increment likes when clicking
function incrementLikesOnClick(evt) {
  if (evt.target.tagName === "SPAN") {
    evt.preventDefault();
    incrementLikes(evt.target);
  }
}

//Increment likes logic and display on DOM
const incrementLikes = (target) => {
  let currentWork = photographerWorks.filter(
    (elt) => elt.id == target.parentElement.id
  )[0];
  currentWork.likes++;
  target.parentElement.childNodes[0].nodeValue = currentWork.likes;
  updateTotalLikesElt();
};

//Create total likes element
const createTotalLikeElt = () => {
  const elt = document.createElement("span");
  elt.setAttribute("id", "total-likes");
  let totalLikes = 0;
  photographerWorks.forEach((work) => (totalLikes += work.likes));

  const heartElt = createEltWithClassName("i", "fas");
  heartElt.classList.add("fa-heart");
  heartElt.setAttribute("aria-label", "likes");
  elt.textContent = `${totalLikes} `;
  elt.appendChild(heartElt);

  return elt;
};

//Update total likes element
const updateTotalLikesElt = () => {
  const totalLikesElt = document.getElementById("total-likes");
  let totalLikes = 0;
  photographerWorks.forEach((work) => (totalLikes += work.likes));
  totalLikesElt.childNodes[0].nodeValue = `${totalLikes} `;
};

export { createTotalLikeElt, incrementLikesOnKeyboard };