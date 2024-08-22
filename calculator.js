document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    let currentInput = '';
    let operator = '';
    let previousInput = '';

    const updateDisplay = () => {
        display.textContent = currentInput || '0';
    };

    const handleButtonClick = (event) => {
        const value = event.target.textContent;

        if (value === 'C') {
            // Clear the last character of the current input
            currentInput = currentInput.slice(0, -1);
        } else if (value === 'AC') {
            // Clear all inputs
            currentInput = '';
            operator = '';
            previousInput = '';
        } else if (['+', '-', '*', '/'].includes(value)) {
            // Store the operator and previous input
            if (currentInput) {
                operator = value;
                previousInput = currentInput;
                currentInput = '';
            }
        } else if (value === '=') {
            // Calculate the result
            if (previousInput && operator && currentInput) {
                try {
                    // Use the Function constructor for safer evaluation
                    const result = new Function('return ' + `${previousInput} ${operator} ${currentInput}`)();
                    currentInput = result.toString();
                    operator = '';
                    previousInput = '';
                } catch (e) {
                    currentInput = 'Error';
                }
            }
        } else {
            // Append number or decimal point
            if (value === '.' && currentInput.includes('.')) {
                return; // Prevent multiple decimal points
            }
            currentInput += value;
        }

        updateDisplay();
    };

    // Attach event listeners to all buttons
    document.querySelectorAll('.buttons button').forEach(button => {
        button.addEventListener('click', handleButtonClick);
    });

    // Initial display update
    updateDisplay();
});
