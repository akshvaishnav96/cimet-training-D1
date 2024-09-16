let clickLinks = document.querySelectorAll("h2");
let allParas = document.querySelectorAll("p");
clickLinks.forEach((elem, index) => {
  elem.addEventListener("click", () => {
    if (allParas[index].style.display == "none") {
      allParas[index].style.display = "inline-block";
    } else {
      allParas[index].style.display = "none";
    }
  });
});


