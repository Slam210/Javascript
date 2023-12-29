// Global variables
var RadianMode = true;
var AnswerSection = document.getElementById('AnswerSection');
var RadorDegEl = document.getElementById("RadorDeg");
var AcEl = document.getElementById("AC");
var allButtons = document.querySelectorAll('button');
var πEl = document.getElementById("π");
var eEl = document.getElementById("e");
var EEl = document.getElementById("E");
var FactorialEl = document.getElementById("!");
var LeftParanthesesCount = 0;

// Event listeners setup

allButtons.forEach(function (button) {
    if (button.id == "RadorDeg"){
        return
    }
    button.addEventListener('click', handleButtonClick);
});

for (let i = 0; i <= 9; i++) {
    var currentElement = document.getElementById(i.toString());
    if (currentElement) {
        currentElement.addEventListener("click", function() {
            if (AnswerSection) {
                AnswerSection.value += i;
            }
        });
    }
}

if (πEl) {
    πEl.addEventListener("click", handlePiClick);
}

if (eEl) {
    eEl.addEventListener("click", handleEClick);
}

if (EEl) {
    EEl.addEventListener("click", handleEClick);
}

if (FactorialEl) {
    FactorialEl.addEventListener("click", handleFactorialClick);
}

if (AcEl) {
    AcEl.addEventListener("click", handleAcClick);
}

if (RadorDegEl) {
    RadorDegEl.addEventListener("click", toggleRadianMode);
}

// Operators and parentheses event listeners
var operators = ['+', '-', 'x', '÷', '.', '%'];
operators.forEach(function (operator) {
    addOperatorEventListener(operator);
});

var leftParanOperators = ['ln', 'log', 'sin', 'cos', 'tan', '√'];
leftParanOperators.forEach(function (operator) {
    addLeftParanOperator(operator);
});

var parentheses = ['(', ')'];
parentheses.forEach(function (paren) {
    addParantheses(paren);
});

// Functions
function handleButtonClick(event) {
    if (AnswerSection.value === "") {
        AcEl.innerHTML = "CE";
        return
    }
    var lastChar = AnswerSection.value.slice(-1);
    if (lastChar == 'π' || lastChar == 'e') {
        AnswerSection.value += "x";
    }
}

function handlePiClick() {
    if (AnswerSection) {
        AnswerSection.value += 'π';
    }
}

function handleEClick() {
    if (AnswerSection) {
        var lastChar = AnswerSection.value.charAt(AnswerSection.value.length - 1);
        if (!lastChar.match(/[0-9]/)) {
            return;
        }
        if (lastChar === 'E') {
            return;
        }
        AnswerSection.value += 'E';
    }
}

function handleFactorialClick() {
    if (AnswerSection) {
        var lastChar = AnswerSection.value.charAt(AnswerSection.value.length - 1);
        if (!lastChar.match(/[0-9]/)) {
            return;
        }
        if (lastChar === '!') {
            return;
        }
        AnswerSection.value += '!';
    }
}

function handleAcClick() {
    if (AcEl.innerHTML === 'AC') {
        AnswerSection.value = "";
    } else {
        AnswerSection.value = AnswerSection.value.slice(0, -1);
        if (AnswerSection.value === "") {
            AcEl.innerHTML = "AC";
        }
    }
}

function addOperatorEventListener(operator) {
    if (document.getElementById(operator)) {
        document.getElementById(operator).addEventListener("click", function () {
            var currentExpression = AnswerSection.value;
            if (currentExpression === "") {
                if (operator === '-' || operator === '.') {
                    AnswerSection.value = operator;
                    return;
                }
            } else if (currentExpression === "-") {
                if (operator === '.') {
                    AnswerSection.value += operator;
                }
                return;
            } else {
                var lastChar = currentExpression.charAt(currentExpression.length - 1);
                var isOperator = operators.includes(lastChar);
                if (isOperator) {
                    AnswerSection.value = currentExpression.slice(0, -1) + operator;
                } else {
                    AnswerSection.value += operator;
                }
            }
        });
    }
}

function addLeftParanOperator(operator) {
    if (document.getElementById(operator)) {
        document.getElementById(operator).addEventListener("click", function () {
            AnswerSection.value += operator + "(";
            LeftParanthesesCount++;
        });
    }
}

function addParantheses(paren) {
    if (document.getElementById(paren)) {
        document.getElementById(paren).addEventListener("click", function () {
            if (paren === '(') {
                AnswerSection.value += "(";
                LeftParanthesesCount++;
            } else {
                if (LeftParanthesesCount <= 0) {
                    return;
                }
                AnswerSection.value += ")";
                LeftParanthesesCount--;
            }
        });
    }
}

function toggleRadianMode() {
    if (RadorDegEl) {
        if (RadianMode) {
            RadorDegEl.innerHTML = "Rad | <b>Deg</b>";
            RadianMode = false;
        } else {
            RadorDegEl.innerHTML = "<b>Rad</b> | Deg";
            RadianMode = true;
        }
    }
}
