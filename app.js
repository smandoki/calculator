function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return 'nice try...';
    }

    return a / b;
}

function operate (a, b, op) {
    switch (op) {
        case '+':
            return add(a, b);
        
        case '-':
            return subtract(a, b);

        case '*':
            return multiply(a, b);

        case '/':
            return divide(a, b);
    }
}

//vars for storing current working values
let memory = 0;
let operation;
let wipe = false;

//place digits pressed onto display
const display = document.querySelector('#display');
const digits = document.querySelectorAll('.digits');

for (let digit of digits) {
    digit.addEventListener('click', (e) => {
        if (wipe) {
            display.innerText = 0;
            wipe = false;
        }

        if (display.innerText === '0') {
            display.innerText = e.target.id;
        } else {
            display.innerText += e.target.id;
        }
    });
}


//clear display and memory
const clear = document.querySelector('#ac');
clear.addEventListener('click', () => {
    display.innerText = 0;
    memory = 0;
    operation = null;
});


//handle math operations
const ops = document.querySelectorAll('.operation');

for (let op of ops) {
    op.addEventListener('click', (e) => {
        wipe = true;

        if (operation) {
            evaluate();
            wipe = false;
        }

        memory = Number(display.innerText);
        operation = e.target.id;
        
        if (wipe) display.innerText = 0;

        wipe = true;
    });
}


//handle equals press
const equals = document.querySelector('#equal');
equals.addEventListener('click', evaluate);

function evaluate() {
    if (operation === null) return;

    display.innerText = operate(memory, Number(display.innerText), operation);
    operation = null;

    wipe = true;
}