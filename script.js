const questions = [
    {
        question: "Simplify: 3x + 2x - 4",
        options: ["5x - 4", "6x - 4", "5x", "4x - 4"],
        correct: 0
    },
    {
        question: "Solve for x: 2x + 5 = 15",
        options: ["5", "10", "15", "20"],
        correct: 0
    },
    {
        question: "Expand: (x + 3)(x - 2)",
        options: ["x² - x - 6", "x² + x - 6", "x² - x + 6", "x² + x + 6"],
        correct: 0
    },
    {
        question: "Factorize: x² + 5x + 6",
        options: ["(x + 2)(x + 3)", "(x - 2)(x - 3)", "(x + 1)(x + 6)", "(x - 1)(x - 6)"],
        correct: 0
    },
    {
        question: "Solve for x: 5x - 7 = 18",
        options: ["5", "4", "3", "2"],
        correct: 0
    },
    {
        question: "Simplify: 4(2x - 3) + x",
        options: ["9x - 12", "8x - 12", "8x - 3", "9x - 3"],
        correct: 1
    },
    {
        question: "Solve for x: 3x/2 = 9",
        options: ["3", "6", "9", "12"],
        correct: 1
    },
    {
        question: "Simplify: 2(x + 4) - 3(x - 2)",
        options: ["-x + 14", "x + 14", "-x - 14", "x - 14"],
        correct: 0
    },
    {
        question: "What is the coefficient of x in the expression 7x - 4?",
        options: ["7", "-4", "1", "0"],
        correct: 0
    },
    {
        question: "Solve for x: 4x + 3 = 2x + 9",
        options: ["3", "6", "2", "1"],
        correct: 0
    }
];


let currentQuestion = 0;
let score = 0;
let timeLeft = 60;
let timer;
let quizEnded = false;

const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const timerEl = document.querySelector('.timer');
const progressBar = document.querySelector('.progress');
const questionNumber = document.querySelector('.question-number');

startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', nextQuestion);

function startQuiz() {
    startScreen.classList.add('hide');
    quizScreen.classList.remove('hide');
    showQuestion();
    startTimer();
}

function startTimer() {
    timeLeft = 60;
    timerEl.textContent = `Time left: ${timeLeft}s`;
    timerEl.classList.remove('warning');
    
    timer = setInterval(() => {
        timeLeft--;
        timerEl.textContent = `Time left: ${timeLeft}s`;
        progressBar.style.width = `${(timeLeft/60) * 100}%`;
        
        if (timeLeft <= 10) {
            timerEl.classList.add('warning');
        }
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            autoSelectIncorrect();
        }
    }, 1000);
}

function autoSelectIncorrect() {
    const options = document.querySelectorAll('.option');
    options.forEach(option => option.style.pointerEvents = 'none');
    options[questions[currentQuestion].correct].classList.add('correct');
    nextBtn.classList.remove('hide');
}

function showQuestion() {
    const question = questions[currentQuestion];
    questionNumber.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
    questionEl.textContent = question.question;
    
    optionsEl.innerHTML = '';
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option');
        button.addEventListener('click', () => selectOption(index));
        optionsEl.appendChild(button);
    });

    progressBar.style.width = '100%';
}

function selectOption(index) {
    clearInterval(timer);
    
    const options = document.querySelectorAll('.option');
    options.forEach(option => option.classList.remove('selected'));
    options[index].classList.add('selected');
    
    if (index === questions[currentQuestion].correct) {
        options[index].classList.add('correct');
        score++;
    } else {
        options[index].classList.add('incorrect');
        options[questions[currentQuestion].correct].classList.add('correct');
    }
    
    nextBtn.classList.remove('hide');
    options.forEach(option => option.style.pointerEvents = 'none');
}

function nextQuestion() {
    currentQuestion++;
    nextBtn.classList.add('hide');
    
    if (currentQuestion < questions.length) {
        showQuestion();
        startTimer();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    clearInterval(timer);
    quizEnded = true;
    quizScreen.classList.add('hide');
    resultScreen.classList.remove('hide');
    
    const resultEl = document.querySelector('.result');
    const percentage = (score / questions.length) * 100;
    
    resultEl.innerHTML = `
        <h2>Quiz Complete!</h2>
        <p>Your score: ${score} out of ${questions.length}</p>
        <p>Percentage: ${percentage}%</p>
        <p>Performance Rating: ${getPerformanceRating(percentage)}</p>
    `;

    // Show next level link if score is above 50%
    if (percentage > 50) {
        const nextLevelContainer = document.getElementById('next-level-container');
        const nextLevelLink = document.getElementById('next-level-link');
        const link = 'https://mathquiz101.github.io/mathquiz4/';
        
        nextLevelLink.href = link;
        nextLevelLink.textContent = link;
        nextLevelContainer.classList.remove('hide');
        
        // Add celebration animation
        nextLevelContainer.classList.add('celebration');
        setTimeout(() => {
            nextLevelContainer.classList.remove('celebration');
        }, 1000);
    }
}

function getPerformanceRating(percentage) {
    if (percentage >= 90) return "Outstanding! 🏆";
    if (percentage >= 80) return "Excellent! 🌟";
    if (percentage >= 70) return "Good Job! 👍";
    if (percentage >= 60) return "Keep Practicing! 📚";
    return "Need More Practice 💪";
}

function copyLink() {
    const link = document.getElementById('next-level-link').href;
    navigator.clipboard.writeText(link).then(() => {
        const copyBtn = document.querySelector('.copy-btn');
        copyBtn.textContent = 'Copied!';
        copyBtn.style.backgroundColor = '#27ae60';
        setTimeout(() => {
            copyBtn.textContent = 'Copy Link';
            copyBtn.style.backgroundColor = '#2ecc71';
        }, 2000);
    });
}
