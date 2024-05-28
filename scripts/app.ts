import { Clock } from './clock.js';
import { getUniquePlaces, Place } from './timeZones.js';

function getRandomNumberInRange(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Grab HTML References

// Text
const questionText = document.getElementById("question") as HTMLParagraphElement;
const answerText = document.getElementById("result-text") as HTMLParagraphElement;
const extraInfoText = document.getElementById("extra-info-text") as HTMLParagraphElement;

// Buttons
const playAgainButton = document.getElementById("play-again-button") as HTMLButtonElement;

const rootStyles = getComputedStyle(document.documentElement);

let clocks: Clock[] = [];

// Game logic
let MAX_GUESSES = 3;

let answer = 0;
let isCorrect = true;
let guesses = 0;

// Game loop functions

function initializeGameClocks(): void {
    // Clean up previous clocks if they exist
    clocks.forEach(clock => clock.disable());

    // Get 3 UNIQUE timeZones
    let uniquePlaces: Place[] = getUniquePlaces(3);

    let clockOne = new Clock("clock-one", uniquePlaces[0]);
    let clockTwo = new Clock("clock-two", uniquePlaces[1]);
    let clockThree = new Clock("clock-three", uniquePlaces[2]);

    clocks = [clockOne, clockTwo, clockThree];

    clocks.forEach(clock => {
        clock.animate()

        // Attach event listeners for clocks
        clock.element.addEventListener('mouseover', handleMouseOver);
        clock.element.addEventListener('mouseout', handleMouseOut);
        clock.element.addEventListener('click', handleClick);
    }); 

    answer = getRandomNumberInRange(0, 2);
}

function initializeGameHTML(): void {
    questionText.innerHTML = `Which clock shows the time in ${clocks[answer].place.name}?`;
    questionText.style.display = "block";

    answerText.style.display = 'none';
    extraInfoText.style.display = 'none';
    playAgainButton.style.display = 'none';
}

function handleMouseOver(this: HTMLElement): void {
    this.style.backgroundColor = rootStyles.getPropertyValue('--hover-color');
}

function handleMouseOut(this: HTMLElement): void {
    this.style.backgroundColor = '';
}

function handleClick(this: HTMLElement): void {
    const clock = clocks.find(c => c.element === this);
    if (!clock) return;

    if (isCorrect) {
        questionText.style.display = "none";
        answerText.innerHTML = "Correct!!!";
        answerText.classList.add("answer-correct");
        extraInfoText.innerHTML = `The time in ${clocks[answer].place.timeZone} is ${clock.toString()} ${clocks[answer].place.offset}`;
    } 
    else if (guesses < 2) {
        answerText.innerHTML = "Incorrect sorry";
        answerText.classList.add("answer-incorrect");
    }

    guesses++;
    clock.disable();
    this.style.backgroundColor = '';

    // Clean up event listeners
    this.removeEventListener('click', handleClick);
    this.removeEventListener('mouseover', handleMouseOver);
    this.removeEventListener('mouseout', handleMouseOut);

    answerText.style.display = "block";
    extraInfoText.style.display = "block";
    playAgainButton.style.display = "block";

}

// First cycle
initializeGameClocks();
initializeGameHTML();

playAgainButton.addEventListener("click", () => {
    initializeGameClocks();
    initializeGameHTML();
});