const hrTxt = document.getElementById("hr");
const minTxt = document.getElementById("min");
const secTxt = document.getElementById("sec");
const countTxt = document.getElementById("count");

let hr = 0;
let min = 0;
let sec = 0;
let count = 0;

let timer = false;
let timerId = null;

/* ==========================
   Start Stopwatch
========================== */

function start() {

    if (timer) return;

    timer = true;

    stopwatch();

}

/* ==========================
   Stop Stopwatch
========================== */

function stop() {

    timer = false;

    clearTimeout(timerId);

}

/* ==========================
   Reset Stopwatch
========================== */

function reset() {

    timer = false;

    clearTimeout(timerId);

    hr = 0;
    min = 0;
    sec = 0;
    count = 0;

    updateDisplay();

}

/* ==========================
   Stopwatch Logic
========================== */

function stopwatch() {

    if (!timer) return;

    count++;

    if (count === 100) {

        sec++;
        count = 0;

    }

    if (sec === 60) {

        min++;
        sec = 0;

    }

    if (min === 60) {

        hr++;
        min = 0;

    }

    updateDisplay();

    timerId = setTimeout(stopwatch, 10);

}

/* ==========================
   Update Display
========================== */

function updateDisplay() {

    hrTxt.textContent = formatTime(hr);

    minTxt.textContent = formatTime(min);

    secTxt.textContent = formatTime(sec);

    countTxt.textContent = formatTime(count);

}

/* ==========================
   Format Time
========================== */

function formatTime(value) {

    return value < 10 ? `0${value}` : value;

}

/* ==========================
   Keyboard Shortcuts
========================== */

document.addEventListener("keydown", (e) => {

    switch (e.code) {

        case "Space":

            e.preventDefault();

            timer ? stop() : start();

            break;

        case "KeyR":

            reset();

            break;

    }

});

/* ==========================
   Button Animation
========================== */

const buttons = document.querySelectorAll(".btn");

buttons.forEach((button) => {

    button.addEventListener("click", () => {

        button.style.transform = "scale(.95)";

        setTimeout(() => {

            button.style.transform = "";

        }, 150);

    });

});

/* ==========================
   Initialize
========================== */

updateDisplay();