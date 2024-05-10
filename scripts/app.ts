import { Clock } from './clock.js';
import { randomTimeZone } from './timeZones.js';

const questionText = document.getElementById("question") as HTMLParagraphElement;
const answerText = document.getElementById("answer") as HTMLParagraphElement;



let answer = randomTimeZone();

questionText.innerHTML = `Which clock shows the time in ${answer.placeName}`;
answerText.style.display = 'none';






 

const c1 = new Clock("clock-one");
const c2 = new Clock("clock-two", answer.code);
const c3 = new Clock("clock-three", 'Europe/Paris');

c1.animateClock();
c2.animateClock();
c3.animateClock();




