import { Clock } from './clock.js';
import { randomTimeZone } from './timeZones.js';

// Grab HTML References

// Text
const questionText = document.getElementById("question") as HTMLParagraphElement;
const answerText = document.getElementById("result-text") as HTMLParagraphElement;
const extraInfoText = document.getElementById("extra-info-text") as HTMLParagraphElement;

// Buttons
const playAgainButton = document.getElementById("play-again-button") as HTMLButtonElement;



let answer = randomTimeZone();
let isCorrect = true;

let clockOne: Clock;
let clockTwo: Clock;
let clockThree: Clock;

let clocks: Clock[] = [];


// Game loop functions

function initializeGameHTML(): void {
    questionText.innerHTML = `Which clock shows the time in ${answer.placeName}?`;
    questionText.style.display = "block";

    answerText.style.display = 'none';
    extraInfoText.style.display = 'none';
    playAgainButton.style.display = 'none';
}

function initializeGameClocks(): void {
    clockOne = new Clock("clock-one");
    clockTwo = new Clock("clock-two", answer.code);
    clockThree = new Clock("clock-three", 'Europe/Paris');

    clocks = [clockOne, clockTwo, clockThree];
}

// First cycle
initializeGameHTML();
initializeGameClocks();


clocks.forEach(clock => clock.animate()); // always called


clocks.forEach(clock => {
    clock.element.addEventListener('mouseover', () => {
        clock.element.style.backgroundColor = 'lightblue';
    });
    
    clock.element.addEventListener('mouseout', () => {
        clock.element.style.backgroundColor = '';
    });
    
    clock.element.addEventListener('click', () => {
        if(isCorrect) {
            questionText.style.display = "none";
            answerText.innerHTML = "Correct!!!";
            answerText.classList.add("answer-correct");
            extraInfoText.innerHTML = `The time in ${answer.placeName} is ${clockOne.toString()}`;
            
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
    initializeGameHTML();
    initializeGameClocks();
});