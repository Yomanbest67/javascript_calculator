const screenValue = document.querySelector(".bottomScreen");
const topScreen = document.querySelector('.topScreen');
let firstValue;
let secondValue; 
let operator;
let result;
const buttons = document.querySelectorAll(".button");

for(const button of buttons){
    switch(true) {
        case button.matches('#num'):
            button.addEventListener('click', () => writeNumToScreen(button));
            break;
        case button.matches('#function'):
            button.addEventListener('click', () => writeToVariable(button));
            break;
        case button.matches('#equal'):
            button.addEventListener('click', () => evaluate());
            break;
        case button.matches('#clear'):
            button.addEventListener('click', () => clearScreen());
            break;
        case button.matches('#dot'):
            button.addEventListener('click', () => addDot());
            break;
        case button.matches('#BACK'):
            button.addEventListener('click', () => undo());
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
        clearTopScreen();
        firstValue = parseFloat(screenValue.textContent);
        updateTopScreen(firstValue);
    } else if ((secondValue == null) && (screenValue.textContent != "" && screenValue.textContent != "-")) {
        secondValue = parseFloat(screenValue.textContent);
        updateTopScreen(secondValue);
    }
    debugger
    // Check if a button operator has been passed as argument, save the operator and clean the screen.
    if ((arguments.length > 0) && (screenValue.textContent != "-") && (screenValue.textContent != "") && (operator == undefined)){
        debugger
        operator = button.textContent;
        screenValue.textContent = '';
        updateTopScreen(operator);
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
    topScreen.textContent = '';
    clearValues();
}

function addDot() {
    if (screenValue.textContent.length > 0 && screenValue.textContent != "-"){
        if (screenValue.textContent.includes('.')){
        } else {
            screenValue.textContent += ".";
        } 
    }
}

function undo() {
    screenValue.textContent = screenValue.textContent.substring(0, screenValue.textContent.length - 1);
}

function updateTopScreen(value) {
    if (topScreen.textContent.includes(value)){}
    else {
        topScreen.textContent += value;
    }
}

function clearTopScreen() {
    topScreen.textContent = '';
}