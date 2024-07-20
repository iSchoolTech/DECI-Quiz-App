const questions = [
    {
        question: "What is the primary greenhouse gas responsible for climate change?",
        answers: [
            {prefix: "A", text: "Oxygen", correct: false},
            {prefix: "B", text: "Carbon Dioxide", correct: true},
            {prefix: "C", text: "Nitrogen", correct: false},
            {prefix: "D", text: "Methane", correct: false},
        ]
    },
    {
        question: "What does SDG stand for in the context of global goals?",
        answers: [
            {prefix: "A", text: "Sustainable Development Goals", correct: true},
            {prefix: "B", text: "Social Development Goals", correct: false},
            {prefix: "C", text: "Scientific Development Goals", correct: false},
            {prefix: "D", text: "Sustainable Development Grants", correct: false},
        ]
    },
    {
        question: "What is the main purpose of the United Nations Sustainable Development Goals (SDGs)?",
        answers: [
            {prefix: "A", text: "To promote global trade", correct: false},
            {prefix: "B", text: "To end poverty and protect the planet", correct: true},
            {prefix: "C", text: "To establish international military alliances", correct: false},
            {prefix: "D", text: "To increase global energy consumption", correct: false},
        ]
    },
    {
        question: "Which of the following is a renewable energy source?",
        answers: [
            {prefix: "A", text: "Coal", correct: false},
            {prefix: "B", text: "Natural Gas", correct: false},
            {prefix: "C", text: "Solar Power", correct: true},
            {prefix: "D", text: "Oil", correct: false},
        ]
    },
    {
        question: "Which global organization is responsible for coordinating international efforts to combat climate change?",
        answers: [
            {prefix: "A", text: "World Health Organization (WHO)", correct: false},
            {prefix: "B", text: "International Monetary Fund (IMF)", correct: false},
            {prefix: "C", text: "United Nations Framework Convention on Climate Change (UNFCCC)", correct: true},
            {prefix: "D", text: "World Trade Organization (WTO)", correct: false},
        ]
    },
    {
        question: "Which practice is essential for reducing plastic pollution?",
        answers: [
            {prefix: "A", text: "Using single-use plastic bags", correct: false},
            {prefix: "B", text: "Recycling plastic waste", correct: true},
            {prefix: "C", text: "Disposing of plastic in landfills", correct: false},
            {prefix: "D", text: "Burning plastic waste", correct: false},
        ]
    }
];




const scoreELement = document.getElementById("score");
const quizArea = document.getElementById("quiz-area");
const answerButtons = document.getElementById("answers-area");
const nextButton = document.getElementById("submit-button");
const bulletsSpanContainer = document.querySelector(".bullets .spans");

let currentQuestionIndex = 0;
let score = 0;
let winScore = 3;

function startQuiz() {
    score = 0;
    currentQuestionIndex = 0;
    score = 0;
    createBullets(questions.length);
    showQuestion();
}

function createBullets(num) { 
    // Reset
    bulletsSpanContainer.innerHTML = "" 

    // Create Spans
    for (let i = 0; i < num; i++) {

      // Create Bullet
      let theBullet = document.createElement("span");
  
      // Check If Its First Span
      if (i === 0) {
        theBullet.className = "on";
      }
  
      // Append Bullets To Main Bullet Container
      bulletsSpanContainer.appendChild(theBullet);
    }
}

function resetState() {
    scoreELement.innerHTML = score;
    nextButton.innerHTML = "Next";
    quizArea.innerHTML = ""
    nextButton.style.display = "none";
    while(answerButtons.firstChild)  {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function showQuestion() {
    resetState();

    let currentQuestion = questions[currentQuestionIndex]
    let questionNo = currentQuestionIndex + 1;

    questionTitle(questionNo, currentQuestion);

    listQuestions(currentQuestion);
    handleBullets();
}



function handleBullets() {
    let bulletsSpans = document.querySelectorAll(".bullets .spans span");
    let arrayOfSpans = Array.from(bulletsSpans);
    for (const [i, span] of arrayOfSpans.entries()) {
        if (currentQuestionIndex === i) {
            span.className = "on";
        }   
    }
}


function handleAnsweredBullets(isCorrect) {
    console.log(currentQuestionIndex, isCorrect)
    let bulletsSpans = document.querySelectorAll(".bullets .spans span");
    let arrayOfSpans = Array.from(bulletsSpans);
    for (const [i, span] of arrayOfSpans.entries()) {
        if (currentQuestionIndex === i) {
            isCorrect ? span.className = "correct" : span.className = "wrong"
        }   
    }
}

function questionTitle(questionNo, currentQuestion) {
    // Create H2 Question Title
    let questionTitle = document.createElement("h2");

    // Create Question Text
    let questionText = document.createTextNode(`${questionNo}. ${currentQuestion.question}`);

    // Append Text To H2
    questionTitle.appendChild(questionText);

    // Append The H2 To The Quiz Area
    quizArea.appendChild(questionTitle);
}


function listQuestions(currentQuestion) {
    const answers = currentQuestion.answers;

    for (const answer of answers) {
        const divQuestion = document.createElement("div");
        // Create Prefix Question
        const prefix = document.createElement("p");
        const button = document.createElement("button");
        prefix.innerHTML = answer.prefix;
        button.innerHTML = answer.text;

        divQuestion.classList.add("choice-container");
        prefix.classList.add("choice-prefix");
        button.classList.add("answer-button");

        divQuestion.appendChild(prefix);
        divQuestion.appendChild(button);

        answerButtons.appendChild(divQuestion);

        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    }
}

function selectAnswer(e) {
    const prefixBtn = e.target.parentNode.children[0];
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct;
    let gotItRight = false;

    if(isCorrect) {
        prefixBtn.classList.add("correct")
        selectedBtn.classList.add("correct");
        gotItRight = true;
        score++;
        scoreELement.innerHTML = score;
        handleAnsweredBullets(true)
    } else {
        prefixBtn.classList.add("incorrect")
        selectedBtn.classList.add("incorrect");
        handleAnsweredBullets(false)
    }

    const answerButtonChildren = Array.from(answerButtons.children);

    for (const answerButtonChild of answerButtonChildren) {
        const prefix = answerButtonChild.children[0]
        const button = answerButtonChild.children[1];
        if(button.dataset.correct && !gotItRight) {
            button.classList.add("answered-wrong-here-correct")
            prefix.classList.add("answered-wrong-here-correct")
        }
        button.disabled = true;
    }
    nextButton.style.display = "block";
}

function showFinalScore() {
    resetState();

    finalScore = `<div class="text-center mb-3"> <h1 class="h1 ${winScore <= score ? "text-success" : "text-danger"}">${winScore <= score ? "Passed." : "Failed."}</h1> <h1 class="h1 text-primary">${score}</h1> <h3 class="h3 text-primary">out of ${questions.length}</h3> </div>`
    quizArea.innerHTML = finalScore;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showFinalScore();
    }
}


nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
})

startQuiz();