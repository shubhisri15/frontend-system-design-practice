class Calculator {
    constructor(displayNode) {
        this.displayNode = displayNode
        this.clear()
    }

    clear() {
        this.currentEl = ''
        this.previousEl = ''
        this.operator = ''
        this.updateDisplay();
    }

    delete() {
        this.currentEl = this.currentEl.toString().slice(0, -1)
        this.updateDisplay();
    }

    setOperator(operator) {
        if (this.currentEl === '' && this.previousEl === '') return;
        if (this.currentEl === '') {
        // allow changing operator
            this.operator = operator;
            return;
        }
        if (this.previousEl !== '') {
            this.compute();
        }
        this.operator = operator
        this.previousEl = this.currentEl
        this.currentEl = ''
        
    }

    appendNumber(number) {
        this.currentEl += number
        this.updateDisplay()
    }

    compute() {
        const prev = parseFloat(this.previousEl)
        const curr = parseFloat(this.currentEl)
        if (isNaN(prev) || isNaN(curr)) {
            return
        }

        let result

        switch (this.operator) {
            case '+': result = prev + curr; break;
            case '-': result = prev - curr; break;
            case '/': result = curr === 0 ? 'Error' : prev / curr; break;
            case '*': result = prev * curr; break;
            default: return;
        }

        this.currentEl = result
        this.previousEl = ''
        this.operator = ''
        this.updateDisplay()
    }

    updateDisplay() {
        this.displayNode.value = this.currentEl || this.previousEl || '0'
    }
}

const display = document.querySelector('.display')
const calculator = new Calculator(display)

const btnContainer = document.querySelector('.buttons')

btnContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;

    const value = btn.textContent
    console.log(value)

    if (btn.classList.contains('operator')) {
        calculator.setOperator(value);
    } else if (btn.classList.contains('equal')) {
        calculator.compute();
    } else if (btn.classList.contains('clear')) {
        calculator.clear();
    } else if (btn.classList.contains('delete')) {
        calculator.delete();
    } else {
        calculator.appendNumber(value);
    }
})