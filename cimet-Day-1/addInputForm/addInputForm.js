let mainDiv = document.querySelector("#dynamicInput");

let clickArea = mainDiv.querySelector("a");
let inputAreaToClone = mainDiv.querySelector("input");

let count = 1;
clickArea.addEventListener("click",addInputs)

function addInputs(e) {
    e.preventDefault();
    if (count <= 5) {
      let clone = inputAreaToClone.cloneNode();
    clickArea.insertAdjacentElement("beforebegin",clone)
    count++
  } else {
    alert("maximum limit reached 5");
  }
}
