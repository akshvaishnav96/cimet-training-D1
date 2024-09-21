const avatarData = [];
const colorTextArray = [
  { color: "dark", background: "green" },
  { color: "light", background: "black" },
  { color: "dark", background: "pink" },
  { color: "light", background: "purple" },
  { color: "light", background: "blue" },
];

const form = document.querySelector("form");
const formcancelBtn = document.querySelector(".cancelModal");
const addAvatarBtn = document.querySelector(".addAvaterBtn");
const showAvatarArea = document.querySelector(".showAvatarArea");
const inputArea = document.querySelector("input");
const confirmDeleteBtn = document.querySelector("confirmDeleteBtn");
const wrapper = document.querySelector("#wrapper");


function randomColor() {
  let randomNum = Math.floor(Math.random() * 5);
  return colorTextArray[randomNum];
}

function formHandler(e) {
  e.preventDefault();
  if (e.target.avatarName.value.length > 0) {
    generateAvatar(e.target.avatarName.value);
    updateAvatarOnDom(avatarData);
  }
}

function addAvatarBtnHandler() {
  form.style.display = "flex";

  inputArea.focus();
}

function generateAvatar(text) {
  let color = randomColor();
  let firstChar = text.slice(0, 1).toUpperCase();
  const avatarLogo = document.createElement("div");
  avatarLogo.classList.add("avatarLogo");
  avatarLogo.style.background = color.background;
  avatarLogo.style.color = color.color === "dark" ? "black" : "white";
  const charParagraph = document.createElement("p");
  charParagraph.innerHTML = firstChar;
  const deleteAvatar = document.createElement("div");
  deleteAvatar.classList.add("deleteAvatar");
  deleteAvatar.innerHTML = `<i class="fa-solid fa-xmark"></i>`;

  avatarLogo.appendChild(charParagraph);
  avatarLogo.appendChild(deleteAvatar);
  avatarData.push(avatarLogo);
  deleteAvatar.addEventListener("click", () => deleteAvatarConfirm(avatarLogo));
}

function formcancel() {
  form.style.display = "none";
  form.reset();
}

function updateAvatarOnDom() {
  showAvatarArea.innerHTML = "";
  avatarData.forEach((item) => {
    showAvatarArea.append(item);
  });
  formcancel();
}

function createDeleteModal(elem) {
  const deleteMain = document.createElement("div");
  deleteMain.className = "deleteMain";
  const deleConfirmDiv = document.createElement("div");
  deleConfirmDiv.className = "deleConfirmDiv";
  const heading = document.createElement("h1");
  heading.innerHTML = "Are You Sure You Want to Delete This Avatar?";
  const message = document.createElement("p");
  message.innerHTML = "This action cannot be undone.";
  const formButtonMain = document.createElement("div");
  formButtonMain.className = "formButtonMain";
  const confirmDeleteBtn = document.createElement("button");
  confirmDeleteBtn.type = "button";
  confirmDeleteBtn.className = "confirmDeleteBtn";
  confirmDeleteBtn.innerHTML = "Yes, Delete";

  const cancelModal = document.createElement("button");
  cancelModal.type = "button";
  cancelModal.className = "cancelModal";
  cancelModal.innerHTML = "Cancel";

  formButtonMain.appendChild(confirmDeleteBtn);
  formButtonMain.appendChild(cancelModal);
  deleConfirmDiv.appendChild(heading);
  deleConfirmDiv.appendChild(message);
  deleConfirmDiv.appendChild(formButtonMain);
  deleteMain.appendChild(deleConfirmDiv);

  wrapper.appendChild(deleteMain);

  confirmDeleteBtn.addEventListener("click", () => deleteAvatar(elem));

  cancelModal.addEventListener("click", () => removeDeleteModal());
}


function deleteAvatarConfirm(elem) {
  createDeleteModal(elem);
  document.querySelector(".deleteMain").style.display = "flex";
}

function deleteAvatar(elem) {
  avatarData.splice(avatarData.indexOf(elem), 1);
  removeDeleteModal();
  updateAvatarOnDom();
}

function removeDeleteModal() {
  let deleteModal = document.querySelector(".deleteMain");
  if ((deleteModal.style.display = "flex")) {
    wrapper.removeChild(deleteModal);
  }
}

formcancelBtn.addEventListener("click", formcancel);
form.addEventListener("submit", formHandler);
addAvatarBtn.addEventListener("click", addAvatarBtnHandler);
