import { Clock } from './clock.js';
import { randomTimeZone } from './timeZones.js';
// Text
const questionText = document.getElementById("question");
const answerText = document.getElementById("result-text");
const extraInfoText = document.getElementById("extra-info-text");
// Buttons
const playAgainButton = document.getElementById("play-again-button");
let answer = randomTimeZone();
let isCorrect = true;
questionText.innerHTML = `Which clock shows the time in ${answer.name}?`;
answerText.style.display = 'none';
extraInfoText.style.display = 'none';
playAgainButton.style.display = 'none';
const clockOne = new Clock("clock-one");
const clockTwo = new Clock("clock-two", answer.timeZone);
const clockThree = new Clock("clock-three", 'Europe/Paris');
let clocks = [clockOne, clockTwo, clockThree];
clocks.forEach(clock => clock.animate());
clocks.forEach(clock => {
    clock.element.addEventListener('mouseover', () => {
        clock.element.style.backgroundColor = 'lightblue';
    });
    clock.element.addEventListener('mouseout', () => {
        clock.element.style.backgroundColor = '';
    });
    clock.element.addEventListener('click', () => {
        if (isCorrect) {
            questionText.style.display = "none";
            answerText.innerHTML = "Correct!!!";
            answerText.classList.add("answer-correct");
            extraInfoText.innerHTML = `The time in ${answer.name} is ${clockTwo.toString()} ${answer.timeZoneName} - ${answer.offset}`;
        }
        else {
            answerText.innerHTML = "Incorrect sorry";
            answerText.classList.add("answer-incorrect");
        }
        answerText.style.display = "block";
        extraInfoText.style.display = "block";
        playAgainButton.style.display = "block";
    });
});
playAgainButton.addEventListener("click", () => {
    answerText.style.display = "none";
    extraInfoText.style.display = "none";
    playAgainButton.style.display = "none";
    questionText.style.display = "block";
});
