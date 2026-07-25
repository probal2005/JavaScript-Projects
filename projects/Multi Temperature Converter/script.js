const inputs = {
    celsius: document.getElementById("celsius"),
    fahrenheit: document.getElementById("fahrenheit"),
    kelvin: document.getElementById("kelvin"),
    rankine: document.getElementById("rankine"),
    reaumur: document.getElementById("reaumur"),
    delisle: document.getElementById("delisle"),
    newton: document.getElementById("newton"),
    romer: document.getElementById("romer")
};

const resetBtn = document.getElementById("resetBtn");
const copyBtn = document.getElementById("copyBtn");

let updating = false;

/*==================================
    Convert Any Unit → Celsius
===================================*/

function toCelsius(value, unit) {

    switch (unit) {

        case "celsius":
            return value;

        case "fahrenheit":
            return (value - 32) * 5 / 9;

        case "kelvin":
            return value - 273.15;

        case "rankine":
            return (value - 491.67) * 5 / 9;

        case "reaumur":
            return value * 5 / 4;

        case "delisle":
            return 100 - value * 2 / 3;

        case "newton":
            return value * 100 / 33;

        case "romer":
            return (value - 7.5) * 40 / 21;

        default:
            return 0;

    }

}

/*==================================
    Celsius → All Units
===================================*/

function fromCelsius(c) {

    return {

        celsius: c,

        fahrenheit: (c * 9 / 5) + 32,

        kelvin: c + 273.15,

        rankine: (c + 273.15) * 9 / 5,

        reaumur: c * 4 / 5,

        delisle: (100 - c) * 3 / 2,

        newton: c * 33 / 100,

        romer: (c * 21 / 40) + 7.5

    };

}

/*==================================
    Format Values
===================================*/

function format(value) {

    if (!isFinite(value)) return "";

    return parseFloat(value.toFixed(4));

}

/*==================================
    Update All Inputs
===================================*/

function updateValues(unit, value) {

    if (updating) return;

    updating = true;

    if (value === "") {

        Object.values(inputs).forEach(input => input.value = "");

        updating = false;

        return;

    }

    const celsius = toCelsius(parseFloat(value), unit);

    const converted = fromCelsius(celsius);

    for (const key in converted) {

        inputs[key].value = format(converted[key]);

    }

    updating = false;

}

/*==================================
    Live Events
===================================*/

Object.keys(inputs).forEach(unit => {

    inputs[unit].addEventListener("input", (e) => {

        updateValues(unit, e.target.value);

    });

});

/*==================================
    Reset
===================================*/

resetBtn.addEventListener("click", () => {

    inputs.celsius.value = 0;

    updateValues("celsius", 0);

});

/*==================================
    Copy All Values
===================================*/

copyBtn.addEventListener("click", async () => {

    const text = `🌡 Temperature Conversion

Celsius      : ${inputs.celsius.value} °C
Fahrenheit   : ${inputs.fahrenheit.value} °F
Kelvin       : ${inputs.kelvin.value} K
Rankine      : ${inputs.rankine.value} °R
Réaumur      : ${inputs.reaumur.value} °Ré
Delisle      : ${inputs.delisle.value} °De
Newton       : ${inputs.newton.value} °N
Rømer        : ${inputs.romer.value} °Rø`;

    try {

        await navigator.clipboard.writeText(text);

        copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied';

        setTimeout(() => {

            copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copy Values';

        }, 2000);

    } catch {

        alert("Copy failed.");

    }

});

/*==================================
    Keyboard Shortcuts
===================================*/

document.addEventListener("keydown", (e) => {

    if (e.key.toLowerCase() === "r") {

        resetBtn.click();

    }

    if (e.ctrlKey && e.key.toLowerCase() === "c") {

        e.preventDefault();

        copyBtn.click();

    }

});

/*==================================
    Initialize
===================================*/

updateValues("celsius", 0);