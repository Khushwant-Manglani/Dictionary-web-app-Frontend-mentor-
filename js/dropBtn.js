const body = document.querySelector("body");
const bodyContainer = document.querySelector(".container")
const dropDown = document.querySelector(".font-dropdown-btn");
const dropDownBox = document.querySelector(".dropdown-box");
const dropDownBtn = document.querySelector(".dropdown-btn");

dropDown.addEventListener("mouseover", (e) => {
  dropDownBox.classList.add("dropdown-box-display");
})

dropDown.addEventListener("mouseout", (e) => {
  dropDownBox.classList.remove("dropdown-box-display");
})

function sanSerif() {
  bodyContainer.classList.remove("serif");
  bodyContainer.classList.remove("mono");
  bodyContainer.classList.add("sanSerif");
  dropDownBtn.innerHTML="Sans";
}

function serif() {
  bodyContainer.classList.remove("sanSerif");
  bodyContainer.classList.remove("mono");
  bodyContainer.classList.add("serif");
  dropDownBtn.innerHTML="Serif";
}

function mono() {
  bodyContainer.classList.remove("sanSerif");
  bodyContainer.classList.remove("serif");
  bodyContainer.classList.add("mono");
  dropDownBtn.innerHTML="Mono";
}

const toggleCheckbox = document.querySelector("input[type=checkbox]");
toggleCheckbox.addEventListener("change", (e) => {
  if(e.target.checked) {
    body.classList.add("theme-change");
  } else {
    body.classList.remove("theme-change");
  }
})




