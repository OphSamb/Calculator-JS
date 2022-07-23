const calculator = document.querySelector(".calculator");
const buttons = calculator.querySelector(".btn-container");
const calculatorDisplay = document.querySelector(".display");

const operate = (num1, operator, num2) => {
  const firstNumber = parseFloat(num1);
  const secondNumber = parseFloat(num2);
  if (operator === "addition") {
    return firstNumber + secondNumber;
  } else if (operator === "substraction") {
    return firstNumber - secondNumber;
  } else if (operator === "multiplication") {
    return firstNumber * secondNumber;
  } else if (operator === "division") {
    return firstNumber / secondNumber;
  }
};

buttons.addEventListener("click", (e) => {
  if (e.target.matches("button")) {
    const key = e.target;
    const action = key.datasetAction;
    const keyContent = key.textContent;
    const displayedNumber = calculatorDisplay.textContent;
    const previousKeyType = calculator.dataset.previousKeyType;

    if (!action) {
      if (displayedNumber === "0" || previousKeyType === "operator" || previousKeyType === "operate") {
        calculatorDisplay.textContent = keyContent;
      } else {
        calculatorDisplay.textContent = displayedNumber + keyContent;
      }
      calculator.dataset.previousKeyType = "number";
    }

    if (action === "decimal") {
      if (!displayedNumber.includes(".")) {
        calculatorDisplay.textContent = displayedNumber + ".";
      } else if (previousKeyType === "operator" || previousKeyType === "operate") {
        calculatorDisplay.textContent = "0.";
      }
      calculator.dataset.previousKeyType = "decimal";
    }

    if (action === "addition" || action === "substraction" || action === "multiplication" || action === "division") {
      const firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      const secondValue = displayedNumber;

      if (firstValue && operator && previousKeyType !== "operator" && previousKeyType !== "operate") {
        const operateValue = operate(firstValue, operator, secondValue);
        calculatorDisplay.textContent = operateValue;
        calculator.dataset.firstValue = operateValue;
      } else {
        calculator.dataset.firstValue = displayedNumber;
      }
      calculator.dataset.previousKeyType = "operator";
      calculator.dataset.operator = action;
    }
    if (action === "clear") {
      if (key.textContent === "AC") {
        calculator.dataset.firstValue = "";
        calculator.dataset.modifiedValue = "";
        calculator.dataset.operator = "";
        calculator.dataset.previousKeyType = "";
      } else {
        key.textContent = "AC";
      }
      calculatorDisplay.textContent = 0;
      calculator.dataset.previousKeyType = "clear";
    }
    if (action === "operate") {
      let firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      let secondValue = displayedNumber;

      if (firstValue) {
        if (previousKeyType === "operate") {
          firstValue = displayedNumber;
          secondValue = calculator.dataset.modifiedValue;
        }
        calculatorDisplay.textContent = operate(firstValue, operator, secondValue);
      }
      calculator.dataset.modValue = secondValue;
      calculator.dataset.previousKeyType = "operate";
    }
  }
});
