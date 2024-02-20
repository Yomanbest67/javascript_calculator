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
    // Check if subtraction button has been passed and allow the user to negate current number. 
    if (arguments.length > 0){
        if (button.textContent == '-' && screenValue.textContent == ""){
            screenValue.textContent = button.textContent;
        }
    }
   
    // Save the current number in one of the two variables as long as the screen has a valid number on it.
    if ((firstValue == null) && (screenValue.textContent != "" && screenValue.textContent != "-")){
        firstValue = parseFloat(screenValue.textContent);
        screenValue.textContent = '';
    } else if ((secondValue == null) && (screenValue.textContent != "" && screenValue.textContent != "-")) {
        secondValue = parseFloat(screenValue.textContent);
        screenValue.textContent = '';
    }

    // Check if a button operator has been passed as argument, save the operator and clean the screen.
    if ((arguments.length > 0) && (screenValue.textContent != "-")){
        operator = button.textContent;
        screenValue.textContent = '';
    }
    
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
