class Calculator {
  constructor() {
    this.displayElement = document.querySelector(".display");
    this.display = "0";
    this.firstOperand = null;
    this.operator = null;
    this.secondOperand = null;
    this.isDecimalUsed = false;
  }

  set display(value) {
    this._display = value; // underscore to avoid recursion
    this.displayElement.textContent = value;
  }

  get display() {
    return this._display;
  }

  set firstOperand(value) {
    if (this.operator) return;

    this._firstOperand = value;
    this.display = value;
  }

  get firstOperand() {
    return this._firstOperand;
  }

  set operator(value) {
    if (!this.firstOperand || this.operator || this.secondOperand) return;

    this._operator = value;
    this._display = this.firstOperand + " " + value;
  }

  get operator() {
    return this._operator;
  }

  set secondOperand(value) {
    if (!this.firstOperand || !this.operator) return;

    this._secondOperand = value;
    this.display = this.firstOperand + " " + this.operator + " " + value;
  }

  get secondOperand() {
    return this._secondOperand;
  }

  clear() {
    this.display = "0";
    this.firstOperand = null;
    this.operator = null;
    this.secondOperand = null;
    this.isDecimalUsed = false;
  }
}

const cal = new Calculator();
cal.firstOperand = "23";
console.log(cal);
