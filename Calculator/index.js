// Global variables
var RadianMode = true;
var AnswerSection = document.getElementById('AnswerSection');
var RadorDegEl = document.getElementById("RadorDeg");
var AcEl = document.getElementById("AC");
var allButtons = document.querySelectorAll("button");
var πEl = document.getElementById('π');
var eEl = document.getElementById('e');
var EEl = document.getElementById('E');
var InvEl = document.getElementById("Inv");
var FactorialEl = document.getElementById('!');
var EqualEl = document.getElementById("=");
var AnsEl = document.getElementById("Ans");
var LeftParanthesesCount = 0;
var changeOperators = ['log', 'sin', 'cos', 'tan', '√'];
var inverseOperators = ["10ˣ", "sin⁻¹", "cos⁻¹", "tan⁻¹", "x²"];

// Event listeners setup
allButtons.forEach(function (button) {
    if (button.id === "RadorDeg" || button.id === "Inv" || button.id === '=' || button.id === ')' || button.id === "AC") {
        return;
    }

    button.addEventListener('click', handleButtonClick);
});

for (let i = 0; i <= 9; i++) {
    var currentElement = document.getElementById(i.toString());
    if (currentElement) {
        currentElement.addEventListener("click", function () {
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

if (InvEl) {
    InvEl.addEventListener("click", toggleInvMode);
}

if (EqualEl) {
    EqualEl.addEventListener("click", calculateAnswer);
}

if (AnsEl) {
    AnsEl.addEventListener("click", addingAnsAndRand);
}

// Operators and parentheses event listeners
var operators = ['+', '-', 'x', '÷', '.', '%'];
operators.forEach(function (operator) {
    addOperatorEventListener(operator);
});

var leftParanOperators = ['ln', 'log', 'sin', 'cos', 'tan', '√', '^'];
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
        return;
    }
    var lastChar = AnswerSection.value.slice(-1);

    if (lastChar === 'E') {
        var enteredChar = event.target.textContent;
        if (!enteredChar.match(/[0-9]/)) {
            return;
        }
    }

    if (lastChar === 'π' || lastChar === 'e' || lastChar === ')') {
        AnswerSection.value += "x";
    }
}

function handlePiClick() {
    if (AnswerSection) {
        var beforeLastChar = AnswerSection.value.slice(-1);
        if (!beforeLastChar.match(/[+\-x\/]/)) {
            AnswerSection.value += "x";
        }
        AnswerSection.value += 'π';
    }
}

function handleEClick() {
    if (AnswerSection) {
        var lastChar = AnswerSection.value.charAt(AnswerSection.value.length - 1);
        AnswerSection.value += 'e';
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
    if (AcEl.innerHTML === "AC") {
        AnswerSection.value = "";
        localStorage.clear();
        AnswerSection.placeholder = '0';
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
                var isOperator = operators.includes(lastChar) && lastChar !== '%';
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
            if (InvEl.innerHTML === "<b>Inv</b>" && operator === "log") {
                AnswerSection.value += "10^(";
                LeftParanthesesCount++;
                return;
            }
            if (InvEl.innerHTML === "<b>Inv</b>" && operator === '√') {
                AnswerSection.value += "²";
                return;
            }
            AnswerSection.value += document.getElementById(operator).innerHTML + "(";
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

function toggleInvMode() {
    if (InvEl) {
        if (InvEl.innerHTML === "Inv") {
            InvEl.innerHTML = "<b>Inv</b>";
            for (let i = 0; i < changeOperators.length; i++) {
                document.getElementById(changeOperators[i]).innerHTML = inverseOperators[i];
            }
            document.getElementById("Ans").innerHTML = "Rand";
        } else {
            InvEl.innerHTML = "Inv";
            for (let i = 0; i < inverseOperators.length; i++) {
                document.getElementById(changeOperators[i]).innerHTML = changeOperators[i];
            }
            document.getElementById("Ans").innerHTML = "Ans";
        }
    }
}

function addingAnsAndRand() {
    if (AnsEl) {
        if (InvEl.innerHTML === "Inv") {
            AnswerSection.value += "Ans";
        } else {
            AnswerSection.value += "Rand";
        }
    }
}

// Functions for calculating result

function TrigonometricFuntion(func, value) {
    return RadianMode ? func(value) : func((value * Math.PI) / 180);
}

function InverseTrignometricFunction(func, value) {
    return RadianMode ? func(value) : (func(value) * 180) / Math.PI;
}

function calculateExpression(expression) {
    var AnsValue = localStorage.getItem('calculationResult');
    localStorage.clear();
    // Replace custom symbols with their values
    expression = expression.replace(/π/g, Math.PI);
    expression = expression.replace(/e/g, Math.E);
    expression = expression.replace(/(\d+)!/g, 'factorial($1)');
    expression = expression.replace(/(\d)E(\d)/g, '$1*Math.pow(10,$2)');
    expression = expression.replace(/log\((\d+)\)/g, 'Math.log10($1)');
    expression = expression.replace(/ln\((\d+)\)/g, 'Math.log($1)');
    expression = expression.replace(/(\d+)%/g, '$1* 0.01');
    expression = expression.replace(/÷/g, '/');
    expression = expression.replace(/x/g, '*');
    expression = expression.replace(/Rand/g, Math.random());
    expression = expression.replace(/sin\(([^)]+)\)/g, (_, value) => TrigonometricFuntion(Math.sin, parseFloat(value)));
    expression = expression.replace(/cos\(([^)]+)\)/g, (_, value) => TrigonometricFuntion(Math.cos, parseFloat(value)));
    expression = expression.replace(/tan\(([^)]+)\)/g, (_, value) => TrigonometricFuntion(Math.tan, parseFloat(value)));
    expression = expression.replace(/sin⁻¹\(([^)]+)\)/g, (_, value) => InverseTrignometricFunction(Math.asin, parseFloat(value)));
    expression = expression.replace(/cos⁻¹\(([^)]+)\)/g, (_, value) => InverseTrignometricFunction(Math.acos, parseFloat(value)));
    expression = expression.replace(/tan⁻¹\(([^)]+)\)/g, (_, value) => InverseTrignometricFunction(Math.atan, parseFloat(value)));
    expression = expression.replace(/(\d)²/g, (_, digit) => digit * digit);
    expression = expression.replace(/(\d+)\^\(([^)]+)\)/g, (_, x, y) => Math.pow(x, y));
    expression = expression.replace(/√\(([^)]+)\)/g, (_, x) => Math.sqrt(x));
    expression = expression.replace(/Ans/g, AnsValue);

    // Use eval() to evaluate the expression
    try {
        return eval(expression);
    } catch (error) {
        return 'Error';
    }
}

function factorial(n) {
    if (n === 0 || n === 1) {
        return 1;
    } else {
        return n * factorial(n - 1);
    }
}

function calculateAnswer() {
    var expression = AnswerSection.value;

    // Use the calculateExpression function to evaluate the expression
    var result = calculateExpression(expression);
    if (isNaN(result) || result === 'Error' || !result) {
        localStorage.setItem("calculationResult", 0);
        AnswerSection.value = result;
        AcEl.innerHTML = "AC";
        return;
    }
    localStorage.setItem("calculationResult", result);

    // Update the AnswerSection with the result
    AnswerSection.placeholder = result;
    AnswerSection.value = "";
    AcEl.innerHTML = "AC";
}