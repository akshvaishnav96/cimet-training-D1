let avatarData = [];

let form = document.querySelector("form");
let formCancleBtn = document.querySelector(".formCancle");
let addAvatarBtn = document.querySelector(".addAvaterBtn");
let showAvatarArea = document.querySelector(".showAvatarArea");
let inputArea = document.querySelector("input");
let colorTextArray = [
  { color: "dark", background: "green" },
  { color: "light", background: "black" },
  { color: "dark", background: "pink" },
  { color: "light", background: "purple" },
  { color: "light", background: "blue" },
];

formCancleBtn.addEventListener("click", formCancle);
form.addEventListener("submit", formHandler);
addAvatarBtn.addEventListener("click", addAvatarBtnHandler);

function formCancle() {
  form.style.display = "none";
  form.reset();
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

function updateAvatarOnDom() {
  showAvatarArea.innerHTML = "";
  avatarData.forEach((item) => {
    showAvatarArea.append(item);
  });
  formCancle();
}

function deleteAvatarHandler(e) {
  avatarData.splice(avatarData.indexOf(e),1)
 updateAvatarOnDom()

}

function randomColor() {
  let randomNum = Math.floor(Math.random() * 5);
  return colorTextArray[randomNum];
}

function generateAvatar(text) {
  let color = randomColor();
  let firstChar = text.slice(0, 1).toUpperCase();
  const avatarLogo = document.createElement("div");
  avatarLogo.classList.add("avatarLogo");
  avatarLogo.style.background = color.background;
  avatarLogo.style.color = color.color === "dark" ? "black" : "white";
  const charParagraph = document.createElement("p");
  charParagraph.textContent = firstChar;
  const deleteAvatar = document.createElement("div");
  deleteAvatar.classList.add("deleteAvatar");
  deleteAvatar.textContent = "#";

  avatarLogo.appendChild(charParagraph);
  avatarLogo.appendChild(deleteAvatar);
  avatarData.push(avatarLogo);
  deleteAvatar.addEventListener("click", () => deleteAvatarHandler(avatarLogo));
}
