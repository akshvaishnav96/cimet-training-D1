import questionsArray from "./question.js";
import { interval, timer } from "./quiz.js";
let answerValue;
let questionCount = 0;
let result = 0;
let alreadyDoneQuestion = {};

let questionElement = document.querySelector(".question");
let optionElements = document.querySelectorAll("button");
let clickDiv = document.querySelector(".optionsMain");
let mainDiv = document.querySelector(".main");

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

    mainDiv.innerHTML = `<h1>Quiz over ! Your result is :${result}</h1>`;
  } else {
    questionCount++;
  }

  questionElement.innerHTML = ` ${questionCount}  Question: <strong>  " ${question} " </strong> `;
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

  if (alreadyDoneQuestion[randomNumber] && questionCount < 5) {
    generateRandomQuestion();
  } else {
    const { question, options, answer } = questionsArray[randomNumber - 1];
    updateDomWithQuestion(question, options, answer);
    alreadyDoneQuestion[randomNumber] = randomNumber;
  }
}

function quizGenerater() {
  generateRandomQuestion();
}

export { quizGenerater };
