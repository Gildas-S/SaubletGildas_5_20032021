import {
    createEltWithClassName,
    createLinkElt,
    createImgElt,
    createTextualElt,
    createInteractiveListElt,
  } from "/modules/utils.mjs";

// Build a dynamic photographer element

const createPhotographerElt = (data) => {
    // Create the structure of a photographer elt (article, a, p, ul)
    const articleElt = createEltWithClassName("article", "photographers-elt");
    const aElt = createLinkElt(`photographer.html?id=${data.id}`, data.name);
    const pElt = createEltWithClassName("p", "infos");
    const ulElt = createEltWithClassName("ul", "tags");
    articleElt.appendChild(aElt);
    articleElt.appendChild(pElt);
    articleElt.appendChild(ulElt);

    // Create the dynamic portrait and name (related with a)
    const imgElt = createImgElt(`FishEye_Photos/Portraits/${data.portrait}`, "");
    const h2Elt = createTextualElt("h2", data.name, "photographer-name");
    aElt.appendChild(imgElt);
    aElt.appendChild(h2Elt);

    // Create the dynamic photographer info (related with p)
    const cityElt = createTextualElt("span",`${data.city}, ${data.country}`,"infos-city");
    const taglineElt = createTextualElt("span", data.tagline, "infos-tagline");
    const priceElt = createTextualElt("span",`${data.price}€/jour`,"infos-price");
    pElt.appendChild(cityElt);
    pElt.appendChild(taglineElt);
    pElt.appendChild(priceElt);

    // Create the related tags
    data.tags.forEach((tag) =>
        createInteractiveListElt(ulElt, tag, "index.html")
    );

    return articleElt;
    };

export { createPhotographerElt };