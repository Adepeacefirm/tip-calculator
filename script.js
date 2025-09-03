const billInput = document.getElementById("bill");
const peopleInput = document.getElementById("people");
const tipButtons = document.querySelectorAll(".tip-btn");
const customTip = document.getElementById("custom");
const tipPerPersonSpan = document.getElementById("tip");
const totalPerPersonSpan = document.getElementById("total");
const resetBtn = document.getElementById("reset");
const errorMsg = document.getElementById("error-msg");

let bill = 0;
let tipPercent = 0;
let people = 0;

function calculate() {
  if (people <= 0) {
    tipPerPersonSpan.textContent = "$0.00";
    totalPerPersonSpan.textContent = "$0.00";
    return;
  }
  let tipTotal = (bill * tipPercent) / 100;
  let tipPerPerson = tipTotal / people;
  let totalPerPerson = (bill + tipTotal) / people;

  tipPerPersonSpan.textContent = "$" + tipPerPerson.toFixed(2);
  totalPerPersonSpan.textContent = "$" + totalPerPerson.toFixed(2);
}

billInput.addEventListener("input", () => {
  bill = parseFloat(billInput.value) || 0;
  calculate();
});

peopleInput.addEventListener("input", () => {
  people = parseFloat(peopleInput.value) || 0;
  if (peopleInput.value <= 0) {
    errorMsg.style.display = "block";
    peopleInput.classList.add("error-border");
  } else {
    errorMsg.style.display = "none";
    peopleInput.classList.remove("error-border");
  }
  calculate();
});

tipButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    tipButtons.forEach((b) => b.classList.remove("active"));
    e.target.classList.add("active");
    tipPercent = parseFloat(e.target.dataset.tip);
    customTip.value = "";
    calculate();
  });
});

customTip.addEventListener("input", () => {
  tipPercent = parseFloat(customTip.value) || 0;
  tipButtons.forEach((b) => b.classList.remove("active"));
  calculate();
});

resetBtn.addEventListener("click", () => {
  billInput.value = "";
  peopleInput.value = "0";
  customTip.value = "";
  tipButtons.forEach((b) => b.classList.remove("active"));
  tipPerPersonSpan.textContent = "$0.00";
  totalPerPersonSpan.textContent = "$0.00";
  bill = 0;
  tipPercent = 0;
  people = 0;
});
