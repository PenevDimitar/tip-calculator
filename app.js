const billInput = document.querySelector(".bill-input");
const tipButtonsContainer = document.querySelector(".tip-buttons-container");
const tipButtons = document.querySelectorAll(".tip-button");
const tipInput = document.querySelector(".tip-input");
const peopleCountInput = document.querySelector(".people-count-input");
const warningMessage = document.querySelector(".warning-message");
const tipAmount = document.querySelector(".tip-amount");
const totalAmount = document.querySelector(".total-amount");
const resetBtn = document.querySelector(".reset-button");

// Create the tip calculator as an object.

// calcTip function:
// - Divides the total bill by the number of people.
// - As a result, it returns the amount of the tip owed by each person
// - fixed to the second digit after decimal point.

//calcTotal function:
// - Calculates and adds the total amount of the tip to the bill.
// - returns the total bill amount owed by each person
// - fixed to the second digit after decimal point.

const tipCalculator = {
  bill: 0,
  tipPersentage: 0,
  numberOfPeople: 0,

  calcTip() {
    const tipPerPerson =
      (this.bill * (this.tipPersentage / 100)) / this.numberOfPeople;
    return tipPerPerson.toFixed(2);
  },

  calcTotal() {
    const totalBillPerPerson =
      (this.bill + this.calcTip() * this.numberOfPeople) / this.numberOfPeople;
    return totalBillPerPerson.toFixed(2);
  },
};

//- On focus add border on bill input field.
//-- obtain the value of bill input field on blur.

billInput.addEventListener("focus", (e) => {
  e.target.style.border = "1.5px solid cyan";
});

billInput.addEventListener("blur", (e) => {
  const currentBill = e.target.value;
  const isNan = isNaN(currentBill);
  if (!isNan && currentBill != "") {
    tipCalculator.bill = Number(currentBill);
  } else {
    tipCalculator.bill = 0;
  }
  e.target.style.border = "";
});

//- add 'click' event listener to tip bittons container.
//-- use event delegation to determine what will be the tip persetnage.
//--- reset styles for all buttons
//--- set style for active state on clicked button
//--- obtain persentage value on blur.
tipButtonsContainer.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const clickedButton = e.target;
    let currentTipPersentage = 0;
    resetButtonStyle(tipButtons);
    resetInputStyle(tipInput);
    clickedButton.style.background = "hsl(172, 67%, 45%)";
    clickedButton.style.color = "hsl(183, 100%, 15%)";
    currentTipPersentage = clickedButton.textContent.slice(
      0,
      clickedButton.textContent.length - 1
    );
    tipCalculator.tipPersentage = Number(currentTipPersentage);
  }
});

//- On focus add border on tip input field.
//-- obtain the persetage value of tip input field on blur.
tipInput.addEventListener("focus", (e) => {
  e.target.style.border = "1.5px solid cyan";
  resetButtonStyle(tipButtons);
});

tipInput.addEventListener("blur", (e) => {
  const persentageFromInput = e.target.value;
  const isNan = isNaN(persentageFromInput);
  if (!isNan && persentageFromInput != "") {
    tipCalculator.tipPersentage = Number(persentageFromInput);
  } else {
    tipCalculator.tipPersentage = 0;
  }
});

//- On focus add border on  people count input field.
//- reveal warning message
// -- on blur obtain people count
// -- dispaly results
peopleCountInput.addEventListener("focus", (e) => {
  e.target.style.border = "1.5px solid orange";
  warningMessage.style.display = "block";
});

peopleCountInput.addEventListener("blur", (e) => {
  const peopleCount = e.target.value;
  const isNan = isNaN(peopleCount);
  if (!isNan && peopleCount != "") {
    tipCalculator.numberOfPeople = Number(peopleCount);
    tipAmount.textContent = `$${tipCalculator.calcTip()}`;
    totalAmount.textContent = `$${tipCalculator.calcTotal()}`;
    peopleCountInput.style.border = "1.5px solid rgba(0, 0, 0, 0)";
    warningMessage.style.display = "none";
  }
});

// on click reset all styles and input values.
resetBtn.addEventListener("click", (e) => {
  billInput.value = "";
  warningMessage.style.display = "none";
  resetButtonStyle(tipButtons);
  resetInputStyle(tipInput);
  resetInputStyle(peopleCountInput);
  totalAmount.textContent = "$0.00";
  tipAmount.textContent = "$0.00";
});

function resetButtonStyle(array) {
  array.forEach((element) => {
    element.style.background = "hsl(183, 100%, 15%)";
    element.style.color = "hsl(0, 0%, 100%)";
  });
}

function resetInputStyle(input) {
  input.style.border = "1.5px solid rgba(0, 0, 0, 0)";
  input.value = "";
}
