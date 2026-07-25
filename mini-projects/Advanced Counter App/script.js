// ==============================
// Elements
// ==============================

const counter = document.getElementById("counter");

const increase = document.getElementById("increase");
const decrease = document.getElementById("decrease");
const reset = document.getElementById("reset");

const plus5 = document.getElementById("plus5");
const minus5 = document.getElementById("minus5");
const random = document.getElementById("random");

const highest = document.getElementById("highest");
const lowest = document.getElementById("lowest");
const clicks = document.getElementById("clicks");

const time = document.getElementById("time");

// ==============================
// Local Storage
// ==============================

let count = Number(localStorage.getItem("count")) || 0;
let high = Number(localStorage.getItem("high")) || count;
let low = Number(localStorage.getItem("low")) || count;
let totalClicks = Number(localStorage.getItem("clicks")) || 0;

// ==============================
// Update UI
// ==============================

function updateUI(){

    counter.textContent = count;

    highest.textContent = high;

    lowest.textContent = low;

    clicks.textContent = totalClicks;

    localStorage.setItem("count",count);
    localStorage.setItem("high",high);
    localStorage.setItem("low",low);
    localStorage.setItem("clicks",totalClicks);

    counter.animate([
        {transform:"scale(.8)"},
        {transform:"scale(1.15)"},
        {transform:"scale(1)"}
    ],{
        duration:250
    });

}

// ==============================
// Update Stats
// ==============================

function updateStats(){

    if(count>high){
        high=count;
    }

    if(count<low){
        low=count;
    }

    totalClicks++;

    if(count===100 || count===500 || count===1000){

        alert("🎉 Congratulations!\nYou reached "+count+"!");

    }

    updateUI();

}

// ==============================
// Buttons
// ==============================

increase.onclick=()=>{

    count++;

    updateStats();

}

decrease.onclick=()=>{

    count--;

    updateStats();

}

plus5.onclick=()=>{

    count+=5;

    updateStats();

}

minus5.onclick=()=>{

    count-=5;

    updateStats();

}

reset.onclick=()=>{

    if(confirm("Reset Counter?")){

        count=0;

        updateStats();

    }

}

random.onclick=()=>{

    count=Math.floor(Math.random()*1001);

    updateStats();

}

// ==============================
// Keyboard Shortcuts
// ==============================

document.addEventListener("keydown",(e)=>{

    switch(e.key){

        case "ArrowUp":
            increase.click();
            break;

        case "ArrowDown":
            decrease.click();
            break;

        case "r":
        case "R":
            reset.click();
            break;

    }

});

// ==============================
// Live Clock
// ==============================

function clock(){

    const date=new Date();

    time.textContent=date.toLocaleTimeString();

}

setInterval(clock,1000);

clock();

// ==============================
// Initial UI
// ==============================

updateUI();