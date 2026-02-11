const operators = {
  "+": (a, b) => a.plus(b),
  "-": (a, b) => a.minus(b),
  "*": (a, b) => a.times(b),
  "/": (a, b) => a.div(b),
};

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
    if (!this.firstOperand) return;

    this.isDecimalUsed = false;
    this._operator = value;
  }

  get operator() {
    return this._operator;
  }

  set secondOperand(value) {
    if (!this.firstOperand || !this.operator) return;

    this._secondOperand = value;
    this.display = value;
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

  back() {
    if (this.display.length === 1) {
      if (!this.operator) {
        this.firstOperand = null;
      } else {
        this.secondOperand = null;
      }
      this.display = "0";
    }

    if (!this.operator) {
      this.firstOperand = this.firstOperand.slice(0, -1); // slice is not in place
      this.display = this.firstOperand;
      return;
    }

    this.secondOperand = this.secondOperand.slice(0, -1);
    this.display = this.secondOperand;
  }

  signSwitch() {
    if (!this.operator) {
      if (!this.firstOperand) return;

      if (this.firstOperand.startsWith("-")) {
        this.display = this.firstOperand.slice(1);
      } else {
        this.display = "-" + this.firstOperand;
      }
    }

    if (!this.secondOperand) return;

    if (this.secondOperand.startsWith("-")) {
      this.display = this.secondOperand.slice(1);
    } else {
      this.display = "-" + this.secondOperand;
    }
  }

  equals() {
    if (!this.firstOperand || !this.operator || !this.secondOperand) return;

    const a = parseFloat(this.firstOperand);
    const b = parseFloat(this.secondOperand);

    const first = Big(this.firstOperand);
    const second = Big(this.secondOperand);

    const operation = operators[this.operator];
    const result = operation(first, second).toString();

    this.display = result;

    this.clear();
    this.firstOperand = result;
  }
}

const cal = new Calculator();
cal.firstOperand = "1";
cal.back();

console.log(cal);
