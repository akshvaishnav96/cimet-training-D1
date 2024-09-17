import questionsArray from "./question.js";
import { interval } from "./quiz.js";
let answerValue;
let questionCount = 0;
let result = 0;
let timerCount = 5;

let questionElement = document.querySelector(".question");
let optionElements = document.querySelectorAll("button");
let clickDiv = document.querySelector(".optionsMain");
let mainDiv = document.querySelector(".main");

let timer = setInterval(() => {
  timerCount--;
  if (timerCount < 1) {
    timerCount = 5;
  }
  document.querySelector(".timer").innerText = timerCount;
}, 1000);

function generate_Random_Number_One_To_Five() {
  return Math.ceil(Math.random() * (5 - 0) + 0);
}

function updateDomWithQuestion(question, options, answer) {
  optionElements.forEach((item) => {
    item.removeAttribute("disabled");
    if (item.classList.contains("active")) {
      item.classList.remove("active");
    }
  });

  if (questionCount == 5) {
    clearInterval(interval);
    clearInterval(timer);
    mainDiv.innerHTML = `<h1>${result}</h1>`;
  } else {
    questionCount++;
  }

  questionElement.innerHTML = `Question ${questionCount} :  ${question}`;
  optionElements.forEach((element, index) => {
    element.innerText = options[index];
  });
  answerValue = answer;
}

clickDiv.addEventListener("click", (element) => {
  if (element.target.nodeName == "BUTTON") {
    element.target.classList.add("active");
    optionElements.forEach((item) => {
      item.setAttribute("disabled", true);
    });
    if (element.target.innerText == answerValue) {
      result++;
    }
  }
});

function generateRandomQuestion() {
  const randomNumber = generate_Random_Number_One_To_Five();

  const { question, options, answer } = questionsArray[randomNumber - 1];
  updateDomWithQuestion(question, options, answer);
}

function quizGenerater() {
  generateRandomQuestion();
}

export {
  generate_Random_Number_One_To_Five,
  generateRandomQuestion,
  updateDomWithQuestion,
  quizGenerater,
};
