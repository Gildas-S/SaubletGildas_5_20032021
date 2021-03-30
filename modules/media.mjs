import { createImgElt, createTextualElt } from "/modules/utils.mjs";

// Create the image factory
class Photo {
  constructor(props) {
    this.src = props.image;
    this.alt = props.alt;
    this.id = props.id;
    this.type = "image";
  }

  //Create the small-size photo element
  createElt() {
    const elt = createImgElt(`FishEye_Photos/Images/${this.src}`, `${this.alt}, closeup view`);
    elt.setAttribute("role", "button");

    return elt;
  }

  //Create the full-size photo element
  createFullElt() {
    const elt = createImgElt(`FishEye_Photos/Images/${this.src}`, this.alt);
    elt.setAttribute("id", "current-media-lightbox");

    return elt;
  }
}

// Create the video factory
class Video {
  constructor(props) {
    this.src = props.video;
    this.alt = props.alt;
    this.id = props.id;
    this.type = "video";
  }

  // Create the document element for video
  domCreation(text) {
    let elt = createTextualElt("video", text, "video-elt");
    let srcElt = document.createElement("source");
    srcElt.setAttribute("src", `FishEye_Photos/Video/${this.src}`);
    elt.appendChild(srcElt);

    return elt;
  }

  // Create the small size video
  createElt() {
    const elt = this.domCreation(`${this.alt}, closeup view`);
    elt.setAttribute("role", "button");

    return elt;
  }

  // Create the full size video
  createFullElt() {
    let elt = this.domCreation(this.alt);
    elt.setAttribute("controls", true);
    elt.setAttribute("id", "current-media-lightbox");

    return elt;
  }
}

export default class MediaFactory {
  constructor(type, props) {
    if (type === "image") return new Photo(props);
    if (type === "video") return new Video(props);
  }
}