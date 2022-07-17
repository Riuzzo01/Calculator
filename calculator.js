function changeColorOnClick(e) {
    e.target.style.backgroundColor = "#A38B76";
    setInterval(() => {changeColorOnRelease(e)}, 200);
}

function changeColorOnRelease(e) {
    e.target.style.backgroundColor = "peachpuff";
}

function clearDisplay() {
    displayInput.textContent = null;
    displayHistory.textContent = null;
    operands = new Array;
    index = 0;
}

function operate(content) {
    displayInput.textContent = null;
    if(content !== "=") {
        operands.push((Number) (displayHistory.textContent.slice(index, -1)));
    }
    else {
        operands.push((Number) (displayHistory.textContent.slice(index)));
    }
    if(content !== "=") {
        index = displayHistory.textContent.length;
    }
    else {
        index = 0;
    }
    if(operands[1] !== undefined) {
        console.log(operands[0] + " " + operands[1]);
        let result = calculate();
        displayInput.textContent = "=  " + result.toString();
        operands = new Array;
        if(content !== "=") {
            operands.unshift(result);
        }
    }
}

function calculate() {
    let result = 0;
    if(operator === "+") {
        result = operands[0] + operands[1];
    }
    else if(operator === "-") {
        result = operands[0] - operands[1];
    }
    else if(operator === "x" || operator === "*") {
        result = operands[0] * operands[1];
    }
    else {
        result = operands[0] / operands[1];
    }
    return result;
}

function undo() {
    if(!(displayHistory.textContent.charAt(displayHistory.textContent.length - 1) === "+" || displayHistory.textContent.charAt(displayHistory.textContent.length - 1) === "-" || displayHistory.textContent.charAt(displayHistory.textContent.length - 1) === "*" || displayHistory.textContent.charAt(displayHistory.textContent.length - 1) === "/")) {
        displayHistory.textContent = displayHistory.textContent.slice(0, -1);
        doEvaluate();
    }
    else {
        displayHistory.textContent = displayHistory.textContent.slice(0, -1);
        if(operator === "x" || operator === "*" || operator === "/") {
            operands[1] = 1;
        }
        else {
            operands[1] = 0;
        }
        
    }
}

function doEvaluate(context) {
    if(operands[0] !== undefined && operator !== null) {
        if(!(displayHistory.textContent.charAt(displayHistory.textContent.length - 1) === "+" || displayHistory.textContent.charAt(displayHistory.textContent.length - 1) === "-" || displayHistory.textContent.charAt(displayHistory.textContent.length - 1) === "*" || displayHistory.textContent.charAt(displayHistory.textContent.length - 1) === "/")) {
            operate(context);
            operator = null;
            displayHistory.textContent = displayInput.textContent.slice(3);
        }
    }
}

function keyboardSupport(key) {
    if(key === "1" || key === "0" || key === "2" || key === "3" || key === "4" || key === "5" || key === "6" || key === "7" || key === "8" || key === "9" || key === ".") {
        displayHistory.textContent += key;
    }
    else if(key === "+" || key === "-" || key === "*" || key === "/") {
        displayHistory.textContent += key;
        operate(key);
        operator = displayHistory.textContent.charAt(displayHistory.textContent.length - 1);
        
    }
    else if(key === "=" || key ==="Enter") {
        doEvaluate(key);
    }
    else if(key === "Backspace") {
        undo();
    }
    else if(key === "Escape") {
        clearDisplay();
    }
}

const displayInput = document.querySelector(".input");
const displayHistory = document.querySelector(".history");

const buttons = document.querySelectorAll(".button");
buttons.forEach(element => {element.addEventListener("click", (e) => {displayHistory.textContent += (e.target.textContent)})});

document.querySelectorAll("button").forEach(element => {element.addEventListener("mousedown", (e) => {changeColorOnClick(e)})});

const undoButton = document.querySelector("#undo");
undoButton.addEventListener("click", undo);

const clearButton = document.querySelector("#clear");
clearButton.addEventListener("click", clearDisplay);

let operands = new Array;
let index = 0;
let operator = null;

const operators = document.querySelectorAll("#operator");
operators.forEach(element => {element.addEventListener("click", (e) => {operate(e.target.textContent); 
                                                                        operator = displayHistory.textContent.charAt(displayHistory.textContent.length - 1);})})

const evaluate = document.querySelector("#evaluate");
evaluate.addEventListener("click", (e) => {doEvaluate(e.target.textContent)});

document.addEventListener("keydown", (e) => {keyboardSupport(e.key)})


