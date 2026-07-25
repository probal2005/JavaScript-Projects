// ==============================
// Modern Scientific Calculator
// Developed by Probal Dhali
// ==============================

const num1 = document.getElementById("num1");
const num2 = document.getElementById("num2");
const operation = document.getElementById("operation");

const result = document.getElementById("result");
const message = document.getElementById("message");

const calculateBtn = document.getElementById("calculateBtn");
const resetBtn = document.getElementById("resetBtn");
const copyBtn = document.getElementById("copyBtn");

const historyList = document.getElementById("historyList");
const clearHistoryBtn = document.getElementById("clearHistory");

let history = JSON.parse(localStorage.getItem("calculatorHistory")) || [];

/* ======================================
        Render History
====================================== */

function renderHistory() {

    historyList.innerHTML = "";

    if (history.length === 0) {

        historyList.innerHTML =
        `
        <li>No calculations yet.</li>
        `;

        return;

    }

    history.forEach(item => {

        const li = document.createElement("li");

        li.innerHTML = `
            <span>${item.expression}</span>
            <strong>${item.answer}</strong>
        `;

        historyList.prepend(li);

    });

}

/* ======================================
        Save History
====================================== */

function saveHistory(expression, answer) {

    history.push({

        expression,

        answer

    });

    if (history.length > 20) {

        history.shift();

    }

    localStorage.setItem(
        "calculatorHistory",
        JSON.stringify(history)
    );

    renderHistory();

}

/* ======================================
        Calculator
====================================== */

function calculate() {

    let a = parseFloat(num1.value);

    let b = parseFloat(num2.value);

    let op = operation.value;

    let ans;

    let exp;

    if (

        ["sqrt", "cube"].includes(op)

    ) {

        if (isNaN(a)) {

            showError("Enter the first number.");

            return;

        }

    } else {

        if (

            isNaN(a) ||

            isNaN(b)

        ) {

            showError("Please enter both numbers.");

            return;

        }

    }

    switch (op) {

        case "add":

            ans = a + b;
            exp = `${a} + ${b}`;

            break;

        case "subtract":

            ans = a - b;
            exp = `${a} - ${b}`;

            break;

        case "multiply":

            ans = a * b;
            exp = `${a} × ${b}`;

            break;

        case "divide":

            if (b === 0) {

                showError("Cannot divide by zero.");

                return;

            }

            ans = a / b;
            exp = `${a} ÷ ${b}`;

            break;

        case "modulus":

            ans = a % b;
            exp = `${a} % ${b}`;

            break;

        case "power":

            ans = Math.pow(a, b);
            exp = `${a} ^ ${b}`;

            break;

        case "sqrt":

            if (a < 0) {

                showError("Invalid input.");

                return;

            }

            ans = Math.sqrt(a);
            exp = `√${a}`;

            break;

        case "cube":

            ans = Math.pow(a, 3);
            exp = `${a}³`;

            break;

        case "percentage":

            ans = (a / b) * 100;
            exp = `${a}/${b} ×100`;

            break;

        case "average":

            ans = (a + b) / 2;
            exp = `Average(${a},${b})`;

            break;

        case "maximum":

            ans = Math.max(a, b);
            exp = `Max(${a},${b})`;

            break;

        case "minimum":

            ans = Math.min(a, b);
            exp = `Min(${a},${b})`;

            break;

        default:

            showError("Unknown operation.");

            return;

    }

    ans = Number(ans.toFixed(6));

    result.textContent = ans;

    message.textContent = "Calculation Successful ✅";

    saveHistory(exp, ans);

}

/* ======================================
        Error
====================================== */

function showError(text) {

    result.textContent = "--";

    message.textContent = text;

}

/* ======================================
        Reset
====================================== */

function resetCalculator() {

    num1.value = "";

    num2.value = "";

    operation.selectedIndex = 0;

    result.textContent = "0";

    message.textContent = "Ready to calculate";

}

/* ======================================
        Copy Result
====================================== */

async function copyResult() {

    if (

        result.textContent === "0" ||

        result.textContent === "--"

    ) return;

    await navigator.clipboard.writeText(

        result.textContent

    );

    copyBtn.innerHTML =

    `<i class="fas fa-check"></i> Copied`;

    setTimeout(() => {

        copyBtn.innerHTML =

        `<i class="fas fa-copy"></i> Copy`;

    }, 2000);

}

/* ======================================
        Clear History
====================================== */

function clearHistory() {

    if (

        !confirm(

            "Clear calculation history?"

        )

    ) return;

    history = [];

    localStorage.removeItem(

        "calculatorHistory"

    );

    renderHistory();

}

/* ======================================
        Keyboard Shortcut
====================================== */

document.addEventListener(

    "keydown",

    (e) => {

        if (

            e.key === "Enter"

        ) {

            calculate();

        }

        if (

            e.key === "Escape"

        ) {

            resetCalculator();

        }

    }

);

/* ======================================
        Events
====================================== */

calculateBtn.addEventListener(

    "click",

    calculate

);

resetBtn.addEventListener(

    "click",

    resetCalculator

);

copyBtn.addEventListener(

    "click",

    copyResult

);

clearHistoryBtn.addEventListener(

    "click",

    clearHistory

);

/* ======================================
        Initialize
====================================== */

renderHistory();