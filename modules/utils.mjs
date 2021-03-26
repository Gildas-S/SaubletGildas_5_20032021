// Get parameter value from URL
const getParamFromUrl = (urlString, param) => {
    const url = new URL(urlString);
    const paramValue = url.searchParams.get(param);
  
    return paramValue;
  };

// Create generic elements for the document
// Create an element with html tag and css class
const createEltWithClassName = (eltTag, eltClass) => {
    const elt = document.createElement(eltTag);
    elt.classList.add(eltClass);
  
    return elt;
  };

// Create a link element with href and title attributes
const createLinkElt = (linkHref, linkTitle) => {
    const elt = document.createElement("a");
    elt.setAttribute("href", linkHref);
    elt.setAttribute("title", linkTitle);
  
    return elt;
  };

// Create an img element with src and alt attributes
const createImgElt = (imgSrc, imgAlt) => {
    const elt = document.createElement("img");
    fillImgElt(elt, imgSrc, imgAlt);
  
    return elt;
  };

const fillImgElt = (elt, imgSrc, imgAlt) => {
    elt.setAttribute("src", imgSrc);
    elt.setAttribute("alt", imgAlt);
  
    return elt;
  };

// Create text element with html content and css class
const createTextualElt = (eltTag, eltContent, eltClass) => {
    const elt = createEltWithClassName(eltTag, eltClass);
    fillEltWithText(elt, eltContent);
  
    return elt;
  };

const fillEltWithText = (elt, text) => {
    elt.textContent = text;
  
    return elt;
  };

// Create a list of interactive html tag elements
const createInteractiveListElt = (parentElt, eltText, hrefURL) => {
    const liElt = document.createElement("li");
    const aElt = createEltWithClassName("a", "filter-tag");
    aElt.setAttribute("href", hrefURL);
    aElt.setAttribute("title", eltText);
    aElt.textContent = eltText;
  
    liElt.appendChild(aElt);
  
    parentElt.appendChild(liElt);
  };

// Export const
export {
    createEltWithClassName,
    createLinkElt,
    createImgElt,
    createTextualElt,
    createInteractiveListElt,
    getParamFromUrl,
    fillEltWithText,
    fillImgElt,
  };