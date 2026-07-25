const question = document.querySelector(".question");

const option1 = document.getElementById("opt1");
const option2 = document.getElementById("opt2");
const option3 = document.getElementById("opt3");
const option4 = document.getElementById("opt4");

const options = document.querySelectorAll(".answer");

const submitBtn = document.getElementById("submit");

const quizWrapper = document.getElementById("quiz-wrapper");
const result = document.getElementById("result");

const progress = document.getElementById("progress");
const questionCount = document.getElementById("question-count");

let currentQuestion = 0;
let score = 0;

/* -----------------------------
   Load Question
------------------------------ */

function loadQuestion() {

    const currentQuiz = quizArr[currentQuestion];

    question.innerHTML = `${currentQuestion + 1}. ${currentQuiz.question}`;

    option1.innerHTML = currentQuiz.opt1;
    option2.innerHTML = currentQuiz.opt2;
    option3.innerHTML = currentQuiz.opt3;
    option4.innerHTML = currentQuiz.opt4;

    questionCount.innerHTML =
        `Question ${currentQuestion + 1} / ${quizArr.length}`;

    progress.style.width =
        `${((currentQuestion + 1) / quizArr.length) * 100}%`;

}

loadQuestion();

/* -----------------------------
   Get Selected Answer
------------------------------ */

function getSelectedAnswer() {

    let selected = undefined;

    options.forEach((option) => {

        if (option.checked) {

            selected = option.id;

        }

    });

    return selected;

}

/* -----------------------------
   Deselect Answers
------------------------------ */

function deselectAnswers() {

    options.forEach((option) => {

        option.checked = false;

    });

}

/* -----------------------------
   Submit Button
------------------------------ */

submitBtn.addEventListener("click", () => {

    const answer = getSelectedAnswer();

    if (!answer) {

        alert("Please select an answer!");

        return;

    }

    if (answer === quizArr[currentQuestion].ans) {

        score++;

    }

    currentQuestion++;

    deselectAnswers();

    if (currentQuestion < quizArr.length) {

        loadQuestion();

    } else {

        showResult();

    }

});

/* -----------------------------
   Result Screen
------------------------------ */

function showResult() {

    quizWrapper.style.display = "none";

    const percentage = Math.round(
        (score / quizArr.length) * 100
    );

    let emoji = "🎉";
    let title = "Excellent!";
    let message =
        "Outstanding performance! Keep it up.";

    if (percentage < 80) {

        emoji = "👏";
        title = "Great Job!";
        message =
            "Good effort! You're doing really well.";

    }

    if (percentage < 60) {

        emoji = "🙂";
        title = "Nice Try!";
        message =
            "Practice a little more and you'll improve.";

    }

    if (percentage < 40) {

        emoji = "💪";
        title = "Keep Learning!";
        message =
            "Don't give up. Every expert was once a beginner.";

    }

    result.innerHTML = `

        <h2>${emoji} ${title}</h2>

        <p>${message}</p>

        <div style="
            font-size:3rem;
            font-weight:700;
            color:#FFD54F;
            margin:20px 0;
        ">
            ${score}/${quizArr.length}
        </div>

        <p style="
            font-size:1.1rem;
            margin-bottom:25px;
        ">
            Accuracy : <strong>${percentage}%</strong>
        </p>

        <button onclick="restartQuiz()">

            <i class="fas fa-redo"></i>

            Restart Quiz

        </button>

    `;

}

/* -----------------------------
   Restart Quiz
------------------------------ */

function restartQuiz() {

    currentQuestion = 0;

    score = 0;

    result.innerHTML = "";

    quizWrapper.style.display = "block";

    progress.style.width = "20%";

    loadQuestion();

}

/* -----------------------------
   Keyboard Support
------------------------------ */

document.addEventListener("keydown", (e) => {

    if (e.key === "Enter") {

        submitBtn.click();

    }

});