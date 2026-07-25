const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerChars = "abcdefghijklmnopqrstuvwxyz";
const numberChars = "0123456789";
const symbolChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";

const password = document.getElementById("pwd");

const lengthInput = document.getElementById("plength");
const upperCase = document.getElementById("puppercase");
const lowerCase = document.getElementById("plowercase");
const numbers = document.getElementById("pnumber");
const symbols = document.getElementById("psymbol");

const generateBtn = document.getElementById("submit");
const copyBtn = document.getElementById("copy");

// Generate Password
generateBtn.addEventListener("click", generatePassword);

function generatePassword() {

    let chars = "";

    if (upperCase.checked) chars += upperChars;
    if (lowerCase.checked) chars += lowerChars;
    if (numbers.checked) chars += numberChars;
    if (symbols.checked) chars += symbolChars;

    if (chars === "") {
        alert("Please select at least one character type.");
        password.value = "";
        return;
    }

    const length = Number(lengthInput.value);

    if (length < 4 || length > 30) {
        alert("Password length must be between 4 and 30.");
        return;
    }

    let generatedPassword = "";

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        generatedPassword += chars[randomIndex];
    }

    password.value = generatedPassword;
}

// Copy Password
copyBtn.addEventListener("click", async () => {

    if (password.value === "") {
        alert("Generate a password first.");
        return;
    }

    try {

        await navigator.clipboard.writeText(password.value);

        const icon = copyBtn.innerHTML;

        copyBtn.innerHTML = '<i class="fas fa-check"></i>';

        setTimeout(() => {
            copyBtn.innerHTML = icon;
        }, 1500);

    } catch (error) {

        password.select();
        document.execCommand("copy");
        alert("Password copied to clipboard.");

    }

});

// Generate one password automatically when page loads
window.addEventListener("load", generatePassword);