// Global variables
var RadianMode = true;
var AnswerSection = document.getElementById('AnswerSection');
var RadorDegEl = document.getElementById("RadorDeg");

// Event listener setup for numeric buttons (0-9)
for (var i = 0; i <= 9; i++) {
    var currentElement = document.getElementById(i.toString());
    addClickListener(currentElement, i);
}

// Event listener setup for RadorDegEl
if (RadorDegEl) {
    RadorDegEl.addEventListener("click", function() {
        toggleRadianMode();
    });
}

// Function to add click event listener to an element
function addClickListener(element, value) {
    if (element) {
        element.addEventListener("click", function() {
            addNumber(value);
        });
    }
}

// Function to handle toggling between Rad and Deg mode
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

// Function to add a number to the AnswerSection
function addNumber(val) {
    if (AnswerSection) {
        AnswerSection.value += val;
    }
}
