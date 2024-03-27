const body = document.querySelector("body");

const toggleCheckbox = document.querySelector("input[type=checkbox]");
toggleCheckbox.addEventListener("change", (e) => {
  if(e.target.checked) {
    body.classList.add("theme-change");
  } else {
    body.classList.remove("theme-change");
  }
})
