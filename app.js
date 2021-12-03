const inputContainer = document.querySelector(".input-container");
const billInput = document.querySelector(".bill-input");
const tipButtonsContainer = document.querySelector(".tip-buttons-container");
const tipButtons = document.querySelectorAll(".tip-button");
const tipInput = document.querySelector(".tip-input");
const peopleCountInput = document.querySelector(".people-input");
const warningMessage = document.querySelector(".warning-message");
const tipAmount = document.querySelector(".tip-amount");
const totalAmount = document.querySelector(".total-amount");
const resetBtn = document.querySelector(".reset-button");

const calculator = {
  bill: 0,
  tipPersent: 0,
  peopleCount: 0,
  calcTip(){
    return this.bill * this.tipPersent / this.peopleCount;
  },
  calcTotal(){
    return (this.bill + (this.bill * this.tipPersent)) / this.peopleCount;
  }
};

// Using event delegetaion to:
//-add some styles when input fields are focused.
inputContainer.addEventListener("focusin", addBorders);

function addBorders(e) {
  if (e.target.tagName === "INPUT") {
    let input = e.target;
    switch (input) {
      case billInput:
      case tipInput:
        input.style.border = "1.5px solid cyan";
        input.style.transition = "border 1s ease";
        break;
      case peopleCountInput:
        input.style.border = "1.5px solid orange";
        input.style.transition = "border 1s ease";
        warningMessage.style.display = "block";
        break;
      default:
        "ERROR!";
    }
  }
}

// Using event delegation to :
//- verify data and remove styles when input fields are losing focus.
// -- set values to calculator if they are correct.
inputContainer.addEventListener("focusout", verifyDataRemoveBorders);

function verifyDataRemoveBorders(e) {
  if (e.target.tagName === "INPUT") {
    let input = e.target;
    let inputValue = e.target.value;

    switch (input) {
      case billInput:
        calculator.bill = verifyBillValue(inputValue);
        input.style.border = "1.5px solid rgba(0,0,0,0)";
        break;
      case tipInput:
        calculator.tipPersent = verifyTipValue(inputValue);
        input.style.border = "1.5px solid rgba(0,0,0,0)";
        console.log(calculator.tipPersent);
        break;
      case peopleCountInput:
        input.style.border = "1.5px solid rgba(0,0,0,0)";
        warningMessage.style.display = "none";
        break;
      default:
        "ERROR!";
    }
  }
}

// Using event delegation to:
//- Remove value from custom input.
//- add styles on buttons when they are clicked.
//-- if clicked element is not a button reset all button styles to initial.
//-- determin persentage value depending on which button is clicked.
//--- set obtained value to calculator.

tipButtonsContainer.addEventListener("click", setTipPersentage);

function setTipPersentage(e) {
  if (e.target.tagName === "BUTTON") {
    console.log(e.target);
    tipInput.value = "";
    const currentBtn = e.target;
    tipButtons.forEach((button) => {
      if (currentBtn === button) {
        currentBtn.classList.add("tip-button-clicked");
      } else {
        button.classList.remove("tip-button-clicked");
      }
    });
    calculator.tipPersent = obtainPersentFromButton(currentBtn);
  } else {
    const foundBtn = Array.from(tipButtons).find((button) =>
      button.classList.contains("tip-button-clicked")
    );
    if (foundBtn) {
      foundBtn.classList.remove("tip-button-clicked");
    }
  }
}

// Using input event to:
//- verify user input data
//-- set peopleCount value to calculator
//--- calculate result
//---- display result in output fields.

peopleCountInput.addEventListener("input", displayResult);

function displayResult(e) {
  let count = e.target.value;
  let result = verifyPeopleCount(count);
  
  if(result){
  calculator.peopleCount = result;  
  tipAmount.textContent = `$${calculator.calcTip().toFixed(2)}`
  totalAmount.textContent = `$${calculator.calcTotal().toFixed(2)}`
  }
  
  
}





resetBtn.addEventListener("click", resetCalculator);

// Resets calculator to initial state.
function resetCalculator(e){
  billInput.value = "";
  tipButtons.forEach(button =>{
    button.classList.remove("tip-button-clicked");
  })
  tipInput.value = "";
  peopleCountInput.value = "";
  tipAmount.textContent = "$0.00";
  totalAmount.textContent = "$0.00";
}



// Verifycation functions :
//- prevent users to enter negative numbers or letters.
function verifyBillValue(bill) {
  if (isNaN(bill) || !bill) {
    billInput.value = "";
  } else if (bill < 0) {
    bill = Math.abs(bill);
    billInput.value = bill;
  }
  return Number(bill);
}

function verifyTipValue(tip) {
  if (isNaN(tip) || !tip) {
    tipInput.value = "";
  } else if (tip < 0) {
    tip = Math.abs(tip);
    tipInput.value = tip;
  }
  return Number(tip / 100);
}

function verifyPeopleCount(count) {
  if (isNaN(count) || count == "" || count == 0) {
    warningMessage.style.display = "block";
    peopleCountInput.style.border = "1.5px solid orange"
    peopleCountInput.value = "";
    tipAmount.textContent = '$0.00';
    totalAmount.textContent = '$0.00';
    return 
  } else{
    warningMessage.style.display = "none";
    peopleCountInput.style.border = "1.5px solid rgba(0,0,0,0)"
    return Number(count);
  }
}


// Removes the %-sign from button textContent.
// returns value to be set as tipPersentage in calculator.
function obtainPersentFromButton(button) {
  let persent = button.textContent;
  return Number(persent.slice(0, persent.length - 1) / 100);
}
