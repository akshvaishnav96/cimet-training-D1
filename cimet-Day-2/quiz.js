import {
    quizGenerater
} from "./utils.js";

let timerCount = 5;

let interval = setInterval(() => {
    quizGenerater();
}, 5000);

let timer = setInterval(() => {
    timerCount--;
    if (timerCount < 1) {
      timerCount = 5;
    }
    document.querySelector(".timer").innerText = timerCount;
  }, 1000);

export {interval,timer}

