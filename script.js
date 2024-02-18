const screenValue = document.querySelector(".screen");
let firstValue;
let secondValue; 
let operator;
let result;
const buttons = document.querySelectorAll(".button");

for(const button of buttons) {

    if (button.matches('#num')){
        // Without arrow function, writeToScreen would run automatically;
        button.addEventListener('click', () => writeNumToScreen(button));
    } else if (button.matches('#function')) {
        button.addEventListener('click', () => writeToVariable(button));
    } else if (button.matches('#equal')) {
        button.addEventListener('click', () => evaluate());
    } else {
        button.addEventListener('click', () => clearScreen());
    }
    
}

function writeResultToScreen (result) {
    if (`${result}` > 19){
        screenValue.textContent = Math.trunc(result);
    } else {
        screenValue.textContent = Math.round((result) * 100) / 100;
    }
    clearValues();
}

function writeNumToScreen (button) {
    if (screenValue.textContent.length <= 19){
        screenValue.textContent += button.textContent;
    };
}

function writeToVariable (button) {
    if (firstValue == null){
        firstValue = parseFloat(screenValue.textContent);
    } else if (secondValue == null) {
        secondValue = parseFloat(screenValue.textContent);
    }

    // Check if a button operator has been passed as argument.
    if (arguments.length > 0){
        operator = button.textContent;
    }
    screenValue.textContent = '';
}

function evaluate () {
    if (firstValue != null){
        writeToVariable();
        if (firstValue != null && secondValue != null) {
            switch(operator) {
                case "+":
                    writeResultToScreen (firstValue+secondValue);
                    break;
                
                case "-":
                    writeResultToScreen (firstValue-secondValue);
                    break;
                
                case "/":
                    writeResultToScreen (firstValue/secondValue);
                    break;

                case "*":
                    writeResultToScreen (firstValue*secondValue);
                    break;
            }
        }
    }
}



function clearValues () {
    firstValue = null;
    secondValue = null;
    operator = null;
}

function clearScreen() {
    screenValue.textContent = '';
}