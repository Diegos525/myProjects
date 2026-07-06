function goku(value) {

    if (value != "+" && value != "-" && value != "*" && value != "/") {
        if (currentOperator) {
            currentOperator.classList.remove("highlight");
            currentOperator = null;
        }
    }

    if (value == ".") {
    let display = document.getElementById("display").value;

    let parts = display.split(/[+\-*/]/);
    let currentNumber = parts[parts.length - 1];

    if (currentNumber.includes(".")) {
        return;
    }
}
    
    
    document.getElementById("display").value += value;
}


function vegeta() {

    if (currentOperator) {
        currentOperator.classList.remove("highlight");
        currentOperator = null;
    }

    let answer = eval(document.getElementById("display").value);

   document.getElementById("display").value = parseFloat(answer.toFixed(10));
}

function piccoro() {
    if(currentOperator) {
        currentOperator.classList.remove("highlight");
        currentOperator = null;
    }
    
    document.getElementById("display").value = "";
}

let currentOperator = null;

function highlight(button) {
    if (currentOperator) {
        currentOperator.classList.remove("highlight");
    }
    button.classList.add("highlight");
    currentOperator = button;
}