/* ==========================================
   Modern Calculator
   JavaScript
========================================== */

const display = document.getElementById("display");

let expression = "";

/* ===========================
   Button Clicks
=========================== */

document.querySelectorAll(".buttons button").forEach(button => {

    button.addEventListener("click", () => {

        const value = button.innerText;

        switch (value) {

            case "AC":
                clearDisplay();
                break;

            case "⌫":
                backspace();
                break;

            case "=":
                calculate();
                break;

            case "×":
                append("*");
                break;

            case "÷":
                append("/");
                break;

            case "−":
                append("-");
                break;

            default:
                append(value);

        }

    });

});

/* ===========================
   Append Value
=========================== */

function append(value){

    expression += value;

    display.value = expression;

}

/* ===========================
   Clear
=========================== */

function clearDisplay(){

    expression = "";

    display.value = "";

}

/* ===========================
   Delete
=========================== */

function backspace(){

    expression = expression.slice(0,-1);

    display.value = expression;

}

/* ===========================
   Calculate
=========================== */

function calculate(){

    if(expression === "") return;

    try{

        let result = eval(expression);

        result = Number(result.toFixed(10));

        display.value = result;

        expression = result.toString();

    }

    catch{

        display.value = "Error";

        expression = "";

    }

}

/* ===========================
   Keyboard Support
=========================== */

document.addEventListener("keydown",(e)=>{

    const key = e.key;

    if(/[0-9]/.test(key)){

        append(key);

        return;

    }

    if(["+","-","*","/",".","%"].includes(key)){

        append(key);

        return;

    }

    if(key==="Enter"){

        e.preventDefault();

        calculate();

        return;

    }

    if(key==="Backspace"){

        backspace();

        return;

    }

    if(key==="Delete"){

        clearDisplay();

        return;

    }

});

/* ===========================
   Button Animation
=========================== */

document.querySelectorAll(".buttons button").forEach(btn=>{

    btn.addEventListener("click",()=>{

        btn.style.transform="scale(.92)";

        setTimeout(()=>{

            btn.style.transform="scale(1)";

        },120);

    });

});