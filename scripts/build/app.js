import { Timer } from './timer.js';
import { Clock } from './clock.js';
import { getCurrentTimeZone, getUniquePlaces } from './time-zones.js';
import { markerMode } from './modal.js';
// import { markerMode } from './modal.js';
function getRandomNumberInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function calculateWinPercentage(gamesPlayed, gamesWon, decimalPlaces = 2) {
    if (gamesPlayed === 0) {
        return "0." + "0".repeat(decimalPlaces);
    }
    let winPercentage = (gamesWon / gamesPlayed) * 100;
    return winPercentage.toFixed(decimalPlaces);
}
// Grab HTML References
const rootStyles = getComputedStyle(document.documentElement);
const body = document.querySelector("#body");
// UI
const timerText = document.getElementById("timer-text");
const winCounter = document.getElementById("win-counter");
const winPercentage = document.getElementById("win-percentage");
const winMeter = document.getElementById("win-meter");
const localeInfo = document.getElementById("locale-info");
const lightThemeRadioButton = document.getElementById("light-theme");
const darkThemeRadioButton = document.getElementById("dark-theme");
// Text
const questionText = document.getElementById("question");
const answerText = document.getElementById("result-text");
const extraInfoTextOne = document.getElementById("extra-info-text-one");
const extraInfoTextTwo = document.getElementById("extra-info-text-two");
// Buttons
const playAgainButton = document.getElementById("play-again-button");
export let clocks = [];
let timer = new Timer(true);
// Game logic
//let gameState = new GameState(GameMode.Loose);
let answerIndex = 0;
let gamesPlayed = 0;
let gamesWon = 0;
const DARK_THEME_NAME = "dark";
const CURRENT_LOCALE = getCurrentTimeZone();
lightThemeRadioButton.addEventListener('change', toggleTheme);
darkThemeRadioButton.addEventListener('change', toggleTheme);
// Light / Dark mode switch
function toggleTheme() {
    body.classList.toggle(DARK_THEME_NAME);
}
function initializeGameClocks() {
    // Clean up previous clocks in the DOM
    clocks.forEach(c => c.reset());
    // Get 3 UNIQUE timeZones
    let uniquePlaces = getUniquePlaces(3);
    let clockOne = new Clock("clock-one", uniquePlaces[0]);
    let clockTwo = new Clock("clock-two", uniquePlaces[1]);
    let clockThree = new Clock("clock-three", uniquePlaces[2]);
    clocks = [clockOne, clockTwo, clockThree];
    clocks.forEach(clock => {
        clock.animate();
        clock.setMarkings(markerMode);
        // Attach event listeners for clocks
        clock.element.addEventListener('mouseover', handleMouseOver);
        clock.element.addEventListener('mouseout', handleMouseOut);
        clock.element.addEventListener('click', handleClick);
    });
    answerIndex = getRandomNumberInRange(0, 2);
}
function initializeGameHTML() {
    localeInfo.innerText = `${CURRENT_LOCALE.fullname}, ${CURRENT_LOCALE.timeZone}, ${CURRENT_LOCALE.offset}`;
    questionText.innerHTML = `Which clock shows the time in <span class="question-name-highlight">${clocks[answerIndex].place.name}</span>?`;
    questionText.style.display = "block";
    answerText.style.display = 'none';
    extraInfoTextOne.style.display = 'none';
    extraInfoTextTwo.style.display = 'none';
    playAgainButton.style.display = 'none';
}
function updateGameCounters() {
    winCounter.innerHTML = gamesWon === 1 ? `1 win` : `${gamesWon.toString()} wins`;
    let result = calculateWinPercentage(gamesPlayed, gamesWon);
    winPercentage.innerHTML = result + '%';
    winMeter.value = Number(result);
}
function handleMouseOver() {
    this.style.backgroundColor = rootStyles.getPropertyValue('--color-clock-hover');
}
function handleMouseOut() {
    this.style.backgroundColor = '';
}
function handleClick() {
    const clock = clocks.find(c => c.element === this);
    if (!clock)
        return;
    if (clock.place === clocks[answerIndex].place) {
        questionText.style.display = "none";
        answerText.innerHTML = "Correct!!!";
        answerText.classList.remove("answer-incorrect");
        // Disable clocks
        let wrongClocks = [0, 1, 2].filter(x => x != answerIndex);
        wrongClocks.forEach(x => clocks[x].disable());
        // Show Green
        clocks[answerIndex].displayCorrect();
        const place = clocks[answerIndex].place;
        const query = place.name;
        // target="_blank" is used to open the link in a new tab and keep the current game active
        extraInfoTextOne.innerHTML = `The time in ${place.region}/<a href="https://www.google.com/search?q=${query}" target="_blank">${query}</a> is ${clock.toString()} ${place.offset}`;
        extraInfoTextTwo.innerHTML = `${place.timeZone}`;
        extraInfoTextOne.style.display = "block";
        extraInfoTextTwo.style.display = "block";
        playAgainButton.style.display = "block";
        gamesWon++;
        updateGameCounters();
        clocks.forEach(c => {
            // Clean up event listeners
            c.element.removeEventListener('click', handleClick);
            c.element.removeEventListener('mouseover', handleMouseOver);
            c.element.removeEventListener('mouseout', handleMouseOut);
        });
    }
    else {
        answerText.innerHTML = "Incorrect, sorry";
        answerText.classList.add("answer-incorrect");
        extraInfoTextOne.innerHTML = "";
        extraInfoTextOne.style.display = "none";
        extraInfoTextTwo.innerHTML = "";
        extraInfoTextTwo.style.display = "none";
        playAgainButton.style.display = "none";
        clock.disable();
    }
    this.style.backgroundColor = '';
    // Clean up event listeners
    this.removeEventListener('click', handleClick);
    this.removeEventListener('mouseover', handleMouseOver);
    this.removeEventListener('mouseout', handleMouseOut);
    answerText.style.display = "block";
}
// Function to toggle the border class on and off
function toggleBorders() {
    document.body.classList.toggle('show-borders');
}
// Event listener for keydown event
document.addEventListener('keydown', function (event) {
    if (event.key === 'd' || event.key === 'D') {
        toggleBorders();
    }
});
// First cycle
initializeGameClocks();
initializeGameHTML();
updateGameCounters();
function updateTimer() {
    timer.update();
    timerText.innerHTML = timer.toString();
}
let timerInterval = window.setInterval(updateTimer, 1000);
// Subsequent cycles
playAgainButton.addEventListener("click", () => {
    gamesPlayed++;
    // gameState = new GameState(GameMode.Loose);
    initializeGameClocks();
    initializeGameHTML();
    updateGameCounters();
});
