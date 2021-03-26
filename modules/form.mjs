import { openDialogModal, closeDialogModal } from "/modules/photographer-page.mjs";

//Select document elements
const contactElt = document.getElementById("ph-contact");
const formElt = document.getElementById("contact-form");
const formDialogElt = document.getElementById("form-dialog");
const coverFormElt = document.getElementById("cover");
const closeBtnElt = document.getElementById("close-btn");

//Select form elements
const firstnameInput = document.getElementById("first-name");
const lastnameInput = document.getElementById("last-name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const formSubmitBtnElt = document.getElementById("form-submit-btn");

// Add the event listeners for the form
const path = document.location.pathname;
if (path.includes("photographer.html")) {
  contactElt.addEventListener("click", openForm);
  closeBtnElt.addEventListener("click", closeForm);
  formElt.addEventListener("submit", submitForm);
}

//Open the form
function openForm() {
  openDialogModal();

  formDialogElt.style.display = "block";
  formDialogElt.setAttribute("aria-hidden", "false");
  coverFormElt.style.display = "block";
  coverFormElt.setAttribute("aria-hidden", "false");

  keyboardTrapForm();
}

//Manage the keyboard trap focus and listener
const keyboardTrapForm = () => {
  firstnameInput.focus();
  formDialogElt.addEventListener("keydown", keyboardNavigationForm);
};

//Manage the keyboard navigation inside the form
function keyboardNavigationForm(evt) {
  if (evt.keyCode === 9) {
    if (evt.shiftKey) {
      if (document.activeElement === closeBtnElt) {
        evt.preventDefault();
        formSubmitBtnElt.focus();
      }
    } else {
      if (document.activeElement === formSubmitBtnElt) {
        evt.preventDefault();
        closeBtnElt.focus();
      }
    }
  }

  if (evt.keyCode === 27) closeForm();
}

//Close the form
function closeForm() {
  closeDialogModal();
  contactElt.focus();

  formDialogElt.style.display = "none";
  formDialogElt.setAttribute("aria-hidden", "true");
  coverFormElt.style.display = "none";
  coverFormElt.setAttribute("aria-hidden", "true");
}

//Display form content when submitting it
function submitForm(e) {
  e.preventDefault();
  console.log(`Prénom : ${firstnameInput.value}`);
  console.log(`Nom : ${lastnameInput.value}`);
  console.log(`Email : ${emailInput.value}`);
  console.log(`Votre message : ${messageInput.value}`);

  closeForm();
}

//Add the photographer name to the form title
const addPhotographerNameInForm = (photographerName) => {
  const nameElt = document.getElementById("ph-form-name");
  nameElt.textContent = photographerName;
};

export { addPhotographerNameInForm };