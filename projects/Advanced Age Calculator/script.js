// ======================================
// Advanced Age Calculator
// ======================================

const inputDate = document.getElementById("input-date");
const calculateBtn = document.getElementById("calculate");

const years = document.getElementById("years");
const months = document.getElementById("months");
const days = document.getElementById("days");

const weekday = document.getElementById("weekday");
const zodiac = document.getElementById("zodiac");
const chinese = document.getElementById("chinese");
const nextBirthday = document.getElementById("nextBirthday");
const status = document.getElementById("status");

const totalDays = document.getElementById("totalDays");
const totalHours = document.getElementById("totalHours");
const totalMinutes = document.getElementById("totalMinutes");

const birthdayMessage = document.getElementById("birthdayMessage");

const copyBtn = document.getElementById("copyBtn");
const resetBtn = document.getElementById("resetBtn");

// ======================================
// Auto Calculate
// ======================================

calculateBtn.addEventListener("click", calculateAge);
inputDate.addEventListener("change", calculateAge);

// ======================================
// Main Function
// ======================================

function calculateAge(){

    if(inputDate.value===""){
        alert("Please select your birth date.");
        return;
    }

    const birth = new Date(inputDate.value);
    const today = new Date();

    if(birth > today){
        alert("Birth date cannot be in the future.");
        return;
    }

    let ageYears = today.getFullYear() - birth.getFullYear();
    let ageMonths = today.getMonth() - birth.getMonth();
    let ageDays = today.getDate() - birth.getDate();

    if(ageDays < 0){
        ageMonths--;
        const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        ageDays += prevMonth.getDate();
    }

    if(ageMonths < 0){
        ageYears--;
        ageMonths += 12;
    }

    years.textContent = ageYears;
    months.textContent = ageMonths;
    days.textContent = ageDays;

    // Day of Birth
    weekday.textContent = birth.toLocaleDateString("en-US",{weekday:"long"});

    // Zodiac
    zodiac.textContent = getZodiac(birth.getDate(),birth.getMonth()+1);

    // Chinese Zodiac
    chinese.textContent = getChineseZodiac(birth.getFullYear());

    // Age Status
    status.textContent = getStatus(ageYears);

    // Totals
    const diff = today - birth;

    totalDays.textContent =
        Math.floor(diff/(1000*60*60*24)).toLocaleString();

    totalHours.textContent =
        Math.floor(diff/(1000*60*60)).toLocaleString();

    totalMinutes.textContent =
        Math.floor(diff/(1000*60)).toLocaleString();

    // Next Birthday

    let next = new Date(today.getFullYear(),birth.getMonth(),birth.getDate());

    if(next < today){
        next.setFullYear(today.getFullYear()+1);
    }

    const remain =
        Math.ceil((next-today)/(1000*60*60*24));

    nextBirthday.textContent =
        remain+" Day(s) Remaining";

    // Birthday

    if(
        birth.getDate()==today.getDate() &&
        birth.getMonth()==today.getMonth()
    ){

        birthdayMessage.style.display="block";

    }else{

        birthdayMessage.style.display="none";

    }

}

// ======================================
// Zodiac
// ======================================

function getZodiac(day,month){

if((month==3&&day>=21)||(month==4&&day<=19)) return "Aries ♈";
if((month==4&&day>=20)||(month==5&&day<=20)) return "Taurus ♉";
if((month==5&&day>=21)||(month==6&&day<=20)) return "Gemini ♊";
if((month==6&&day>=21)||(month==7&&day<=22)) return "Cancer ♋";
if((month==7&&day>=23)||(month==8&&day<=22)) return "Leo ♌";
if((month==8&&day>=23)||(month==9&&day<=22)) return "Virgo ♍";
if((month==9&&day>=23)||(month==10&&day<=22)) return "Libra ♎";
if((month==10&&day>=23)||(month==11&&day<=21)) return "Scorpio ♏";
if((month==11&&day>=22)||(month==12&&day<=21)) return "Sagittarius ♐";
if((month==12&&day>=22)||(month==1&&day<=19)) return "Capricorn ♑";
if((month==1&&day>=20)||(month==2&&day<=18)) return "Aquarius ♒";

return "Pisces ♓";

}

// ======================================
// Chinese Zodiac
// ======================================

function getChineseZodiac(year){

const animals=[
"Monkey 🐒",
"Rooster 🐓",
"Dog 🐕",
"Pig 🐖",
"Rat 🐀",
"Ox 🐂",
"Tiger 🐅",
"Rabbit 🐇",
"Dragon 🐉",
"Snake 🐍",
"Horse 🐎",
"Goat 🐐"
];

return animals[year%12];

}

// ======================================
// Age Category
// ======================================

function getStatus(age){

if(age<13) return "Child 👶";

if(age<20) return "Teenager 🧑";

if(age<60) return "Adult 👨";

return "Senior 👴";

}

// ======================================
// Copy Result
// ======================================

copyBtn.addEventListener("click",()=>{

const text=`
Age : ${years.textContent} Years
${months.textContent} Months
${days.textContent} Days

Day : ${weekday.textContent}

Zodiac : ${zodiac.textContent}

Chinese Zodiac : ${chinese.textContent}

Status : ${status.textContent}

Total Days : ${totalDays.textContent}

Total Hours : ${totalHours.textContent}

Total Minutes : ${totalMinutes.textContent}

Next Birthday : ${nextBirthday.textContent}
`;

navigator.clipboard.writeText(text);

alert("Age details copied successfully!");

});

// ======================================
// Reset
// ======================================

resetBtn.addEventListener("click",()=>{

inputDate.value="";

years.textContent="0";
months.textContent="0";
days.textContent="0";

weekday.textContent="-";
zodiac.textContent="-";
chinese.textContent="-";
status.textContent="-";
nextBirthday.textContent="-";

totalDays.textContent="0";
totalHours.textContent="0";
totalMinutes.textContent="0";

birthdayMessage.style.display="none";

});