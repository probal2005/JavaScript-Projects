/* ==========================================
   Neumorphism Analog Clock
   Updated by Probal Dhali
========================================== */

const deg = 6;

const hr = document.getElementById("hr");
const mn = document.getElementById("mn");
const sc = document.getElementById("sc");

const digitalClock = document.getElementById("digitalClock");
const currentDate = document.getElementById("currentDate");
const timezone = document.getElementById("timezone");

const toggle = document.querySelector(".toggleClass");

/* ==========================================
   Update Clock
========================================== */

function updateClock() {

    const day = new Date();

    const hh = day.getHours() * 30;
    const mm = day.getMinutes() * deg;
    const ss = day.getSeconds() * deg;

    hr.style.transform =
        `rotateZ(${hh + mm / 12}deg)`;

    mn.style.transform =
        `rotateZ(${mm}deg)`;

    sc.style.transform =
        `rotateZ(${ss}deg)`;

    updateDigital(day);

}

setInterval(updateClock, 1000);

updateClock();

/* ==========================================
   Digital Clock
========================================== */

function updateDigital(now) {

    digitalClock.textContent =
        now.toLocaleTimeString();

    currentDate.textContent =
        now.toLocaleDateString(
            "en-US",
            {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
            }
        );

    timezone.textContent =
        Intl.DateTimeFormat()
            .resolvedOptions()
            .timeZone;

}

/* ==========================================
   Theme
========================================== */

loadTheme();

toggle.addEventListener("click", toggleTheme);

function toggleTheme() {

    document.body.classList.toggle("light");

    saveTheme();

    updateIcon();

}

function saveTheme() {

    const mode =
        document.body.classList.contains("light")
            ? "light"
            : "dark";

    localStorage.setItem(
        "clock-theme",
        mode
    );

}

function loadTheme() {

    const mode =
        localStorage.getItem("clock-theme");

    if (mode === "light") {

        document.body.classList.add("light");

    }

    updateIcon();

}

function updateIcon() {

    toggle.innerHTML =
        document.body.classList.contains("light")
            ? '<i class="fas fa-sun"></i>'
            : '<i class="fas fa-moon"></i>';

}

/* ==========================================
   Keyboard Shortcut
========================================== */

document.addEventListener("keydown", (e) => {

    if (e.key.toLowerCase() === "t") {

        toggleTheme();

    }

});

/* ==========================================
   Vanilla Tilt
========================================== */

if (typeof VanillaTilt !== "undefined") {

    VanillaTilt.init(
        document.querySelector(".clock"),
        {
            max: 10,
            speed: 400,
            glare: true,
            "max-glare": 0.2
        }
    );

}

/* ==========================================
   Smooth Fade
========================================== */

window.addEventListener("load", () => {

    document.querySelector(".clock").style.opacity = "0";

    document.querySelector(".clock").style.transform =
        "scale(.8)";

    setTimeout(() => {

        document.querySelector(".clock").style.transition =
            ".8s";

        document.querySelector(".clock").style.opacity = "1";

        document.querySelector(".clock").style.transform =
            "scale(1)";

    }, 100);

});

/* ==========================================
   Console
========================================== */

console.log(
    "%cNeumorphism Analog Clock",
    "color:#00bfff;font-size:22px;font-weight:bold;"
);

console.log(
    "Created by Probal Dhali"
);

console.log(
    "GitHub: https://github.com/probal2005"
);