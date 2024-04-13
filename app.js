/*-------------------------------- Constants --------------------------------*/
 const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.button');
    
/*-------------------------------- Variables --------------------------------*/
    let currentOperand = '';
    let previousOperand = '';
    let operation = undefined;
/*------------------------ Cached Element References ------------------------*/

/*----------------------------- Event Listeners -----------------------------*/
buttons.forEach(button => {
        button.addEventListener('click', () => { // adds event listeners to all the buttons.
            handleButton(button.innerText);
        });
    });

/*-------------------------------- Functions --------------------------------*/
function handleButton(value) { // checks whether the clicked button is a digit, an operation, or the clear or equal button
        if (value === 'C') {
            clear();
            updateDisplay();
            return;
        }

        if (value === '=') {
            compute();
            updateDisplay();
            return;
        }

        if (isOperation(value)) {
            setOperation(value);
            return;
        }

        currentOperand += value;
        updateDisplay();
    }

    function clear() { // clears the display
        currentOperand = '';
        previousOperand = '';
        operation = undefined;
    }

    function isOperation(value) {
        return value === '+' || value === '-' || value === '*' || value === '/'; // chectks to see if it is one of the four math operations.
    }

    function setOperation(op) {
        if (currentOperand === '') return;
        if (previousOperand !== '') {
            compute();
        }
        operation = op;
        previousOperand = currentOperand;
        currentOperand = '';
    }

    function compute() {
        let computation;
        const prev = parseFloat(previousOperand); // this converts stings into floating point numbers, 
        const current = parseFloat(currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        switch (operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '/':
                computation = prev / current;
                break;
            default:
                return;
        }
        currentOperand = computation;
        operation = undefined;
        previousOperand = '';
    }

    function updateDisplay() {
        display.innerText = currentOperand;
    }

