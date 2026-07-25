// ===============================
// Elements
// ===============================

const emoji = document.querySelector(".emoji");
const button = document.getElementById("btn");

// ===============================
// Emoji Collection (100+ Emojis)
// ===============================

const emojis = [

"😀","😃","😄","😁","😆","😅","😂","🤣","😊","😇",
"🙂","🙃","😉","😌","😍","🥰","😘","😗","😙","😚",
"😋","😛","😜","🤪","😝","🤑","🤗","🤭","🫢","🫣",
"🤫","🤔","🫡","🤐","🤨","😐","😑","😶","🫥","😶‍🌫️",
"😏","😒","🙄","😬","😮‍💨","🤥","😌","😔","😪","🤤",
"😴","😷","🤒","🤕","🤢","🤮","🤧","🥵","🥶","🥴",
"😵","🤯","🤠","🥳","😎","🤓","🧐","😕","😟","🙁",
"☹️","😮","😯","😲","😳","🥺","🥹","😦","😧","😨",
"😰","😥","😢","😭","😱","😖","😣","😞","😓","😩",
"😫","🥱","😤","😡","🤬","👻","💀","🤖","👽","👾",
"🐶","🐱","🐼","🦁","🐯","🐵","🐸","🐧","🦄","🐲",
"❤️","💖","💙","💚","💜","🖤","🤍","🔥","⚡","🌈",
"⭐","🌟","✨","🎉","🎊","🎈","🎁","🚀","🌍","🍕"

];

// ===============================
// Variables
// ===============================

let lastIndex = -1;

// ===============================
// Generate Random Emoji
// ===============================

function generateEmoji(){

    let randomIndex;

    do{

        randomIndex = Math.floor(Math.random() * emojis.length);

    }while(randomIndex === lastIndex);

    lastIndex = randomIndex;

    // Remove old animation
    emoji.classList.remove("animate");

    // Force reflow
    void emoji.offsetWidth;

    // Add animation again
    emoji.classList.add("animate");

    // Change Emoji
    emoji.textContent = emojis[randomIndex];

    // Random Glow Color
    const hue = Math.floor(Math.random() * 360);

    emoji.style.filter =
    `drop-shadow(0 0 25px hsl(${hue},100%,60%))
     drop-shadow(0 0 50px hsl(${hue},100%,60%))`;
}

// ===============================
// Events
// ===============================

// Click Emoji
emoji.addEventListener("click", generateEmoji);

// Click Button
button.addEventListener("click", generateEmoji);

// Spacebar Support
document.addEventListener("keydown", (e)=>{

    if(e.code === "Space"){

        e.preventDefault();

        generateEmoji();

    }

});

// Generate Random Emoji on Page Load
generateEmoji();