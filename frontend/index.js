import { backend } from 'declarations/backend';

let display = document.getElementById('display');
let currentValue = '';
let storedValue = '';
let currentOperation = null;

window.appendToDisplay = (value) => {
    currentValue += value;
    display.value = currentValue;
};

window.clearDisplay = () => {
    currentValue = '';
    storedValue = '';
    currentOperation = null;
    display.value = '';
};

window.setOperation = (operation) => {
    if (currentValue !== '') {
        storedValue = currentValue;
        currentValue = '';
        currentOperation = operation;
    }
};

window.calculate = async () => {
    if (storedValue !== '' && currentValue !== '' && currentOperation) {
        const spinner = document.getElementById('spinner');
        spinner.classList.remove('d-none');

        try {
            let result;
            const x = parseFloat(storedValue);
            const y = parseFloat(currentValue);

            switch (currentOperation) {
                case '+':
                    result = await backend.add(x, y);
                    break;
                case '-':
                    result = await backend.subtract(x, y);
                    break;
                case '*':
                    result = await backend.multiply(x, y);
                    break;
                case '/':
                    const divisionResult = await backend.divide(x, y);
                    result = divisionResult[0] !== null ? divisionResult[0] : 'Error';
                    break;
            }

            display.value = result;
            currentValue = result.toString();
            storedValue = '';
            currentOperation = null;
        } catch (error) {
            console.error('Calculation error:', error);
            display.value = 'Error';
        } finally {
            spinner.classList.add('d-none');
        }
    }
};
