const questions = [
  {
    question: "Which is the largest animal?",
    answers: [
      { text: "Shark", correct: false },
      { text: "Blue Whale", correct: true },
      { text: "Tiger", correct: false },
      { text: "Lion", correct: false }
    ]
  },
  {
    question: "Which is the largest desert?",
    answers: [
      { text: "Thar", correct: false },
      { text: "Sahara", correct: true },
      { text: "Gobi", correct: false },
      { text: "Kalahari", correct: false }
    ]
  },
  {
    question: "Which is the smallest continent?",
    answers: [
      { text: "Asia", correct: false },
      { text: "Australia", correct: true },
      { text: "Africa", correct: false },
      { text: "Europe", correct: false }
    ]
  },
  {
    question: "Which is a black bird?",
    answers: [
      { text: "Crow", correct: true },
      { text: "Peacock", correct: false },
      { text: "Dog", correct: false },
      { text: "Sparrow", correct: false }
    ]
  }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    button.dataset.correct = answer.correct;
    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";

  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }

  // Show the correct answer
  Array.from(answerButtons.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });

  nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
});

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}! 🎉`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
  nextButton.onclick = startQuiz;
}

// Start the quiz on load
startQuiz();
