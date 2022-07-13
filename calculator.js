const displayInput = document.querySelector(".input");

const numbers = document.querySelectorAll("#number");
numbers.forEach(element => {element.addEventListener("click", (e) => {displayInput.textContent += (e.target.textContent)})});
numbers.forEach(element => {element.addEventListener("mousedown", (e) => {changeColorOnClick(e)})});

const undoButton = document.querySelector("#undo");
undoButton.addEventListener("click", {});

function changeColorOnClick(e) {
    e.target.style.backgroundColor = "#A38B76";
    setInterval(() => {changeColorOnRelease(e)}, 200);
}

function changeColorOnRelease(e) {
    e.target.style.backgroundColor = "peachpuff";
}