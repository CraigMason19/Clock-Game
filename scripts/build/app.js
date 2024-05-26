import { Clock } from './clock.js';
import { randomTimeZone } from './timeZones.js';
// Grab HTML References
// Text
const questionText = document.getElementById("question");
const answerText = document.getElementById("result-text");
const extraInfoText = document.getElementById("extra-info-text");
// Buttons
const playAgainButton = document.getElementById("play-again-button");
const rootStyles = getComputedStyle(document.documentElement);
let answer = randomTimeZone();
let isCorrect = true;
let clockOne;
let clockTwo;
let clockThree;
let clocks = [];
// Game loop functions
function initializeGameHTML() {
    questionText.innerHTML = `Which clock shows the time in ${answer.placeName}?`;
    questionText.style.display = "block";
    answerText.style.display = 'none';
    extraInfoText.style.display = 'none';
    playAgainButton.style.display = 'none';
}
function initializeGameClocks() {
    // Clean up previous clocks if they exist
    clocks.forEach(clock => clock.disable());
    clocks = [];
    clockOne = new Clock("clock-one");
    clockTwo = new Clock("clock-two", answer.code);
    clockThree = new Clock("clock-three", 'Europe/Paris');
    clocks = [clockOne, clockTwo, clockThree];
    console.log(clocks);
    clocks.forEach(clock => clock.animate());
    // Attach event listeners for clocks
    clocks.forEach(clock => {
        clock.element.addEventListener('mouseover', handleMouseOver);
        clock.element.addEventListener('mouseout', handleMouseOut);
        clock.element.addEventListener('click', handleClick);
    });
}
function handleMouseOver() {
    const color = rootStyles.getPropertyValue('--hover-color').trim();
    this.style.backgroundColor = rootStyles.getPropertyValue('--hover-color').trim();
}
function handleMouseOut() {
    this.style.backgroundColor = '';
}
function handleClick() {
    const clock = clocks.find(c => c.element === this);
    if (!clock)
        return;
    if (isCorrect) {
        questionText.style.display = "none";
        answerText.innerHTML = "Correct!!!";
        answerText.classList.add("answer-correct");
        extraInfoText.innerHTML = `The time in ${answer.placeName} is ${clock.toString()}`;
    }
    else {
        answerText.innerHTML = "Incorrect sorry";
        answerText.classList.add("answer-incorrect");
    }
    clock.disable();
    this.style.backgroundColor = '';
    answerText.style.display = "block";
    extraInfoText.style.display = "block";
    playAgainButton.style.display = "block";
    // Clean up event listeners
    this.removeEventListener('click', handleClick);
    this.removeEventListener('mouseover', handleMouseOver);
    this.removeEventListener('mouseout', handleMouseOut);
}
// First cycle
initializeGameHTML();
initializeGameClocks();
playAgainButton.addEventListener("click", () => {
    answer = randomTimeZone();
    initializeGameHTML();
    initializeGameClocks();
});
