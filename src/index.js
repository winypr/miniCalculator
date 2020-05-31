
const calGrid = document.querySelector(".wrapper");
let totalGrid;
let firstCalText = ""; // 첫번째 계산 값
let secondCalText = ""; // 두번째 계산 값
let inputText = "";
let equalsOp = "";

function calculate(operation) {
  let result;

  if (secondCalText !== "") {
    if (operation === "+") result = firstCalText + secondCalText;
    else if (operation === "-") result = firstCalText - secondCalText;
    else if (operation === "*") result = firstCalText * secondCalText;
    else if (operation === "/") result = firstCalText / secondCalText;
  } else {
    result = inputText;
  }
  console.log(firstCalText, operation, secondCalText);
  return parseInt(result, 10);
}

function calResult(text, operation) {
  let result = "";

  if (text !== "") {
    if (firstCalText === "") {
      firstCalText = parseInt(text, 10);
    } else {
      secondCalText = parseInt(text, 10);
    }
  }

  if (operation === "C") {
    result = 0;
    firstCalText = "";
    secondCalText = "";
  } else if (operation === "=") {
    if (equalsOp === "") {
      result = "";
    } else if (firstCalText >= 0 && secondCalText >= 0) {
      console.log("=");
      result = calculate(equalsOp);
      firstCalText = result;
      equalsOp = "";
    }
  } else {
    if (firstCalText >= 0 && secondCalText >= 0 && text !== "") {
      result = calculate(operation);
      firstCalText = result;
    }
    equalsOp = operation;
  }
  console.log("result", result);
  return result;
}
function paintTotal(text) {
  totalGrid.innerText = text;
}

function inputCal(text) {
  const notNoArr = ["+", "-", "*", "/", "=", "C"];
  let resultTotal;
  let chk = 0;

  for (var i = 0; i < notNoArr.length; i++) {
    if (text === notNoArr[i]) chk = 1;
  }
  if (chk === 0) {
    if (inputText === "" && text === "0") inputText = 0;
    else if (inputText === 0 && text === "0") inputText = 0;
    else if (inputText === 0 && text !== "0") inputText = text;
    else inputText = inputText + text;
    resultTotal = inputText;
  } else {
    const calText = calResult(inputText, text);

    if (calText === "") resultTotal = totalGrid.innerText;
    else resultTotal = calText;

    inputText = "";
  }
  paintTotal(resultTotal);
}

function handleCal(event) {
  event.preventDefault();
  const calText = event.path[0].innerText;

  inputCal(calText);
}

function paintCal() {
  let check = 0;
  for (var i = 0; i < 17; i++) {
    const div = document.createElement("div");
    div.classList.add("item");

    if (i === 0) {
      div.classList.add("total");
      div.innerText = 0;
    } else if (i === 1) {
      div.classList.add("reset-color");
      div.innerText = "C";
    } else if (i % 4 === 1 || i === 16) {
      div.classList.add("operate-color");
      const operate = ["+", "-", "*", "/"];
      div.innerText = operate[Math.floor(i / 4) - 1];
    } else {
      div.classList.add("number-color");
      const tempNo = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0, "="];
      div.innerText = tempNo[check];
      check++;
    }
    calGrid.appendChild(div);
  }
  totalGrid = calGrid.querySelector(".total");
}

function init() {
  paintCal();
  calGrid.addEventListener("click", handleCal);
}

init();
