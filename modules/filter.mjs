
//Select tags list 
const selectTags = () => {
    const tagsElt = document.getElementById("tags");
    tagsElt.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("test")
    })
}

export { selectTags };