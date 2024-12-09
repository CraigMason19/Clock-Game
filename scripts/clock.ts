import { Place, DEFAULT_LOCATION } from './time-zones.js';

interface Time {
    hours: number;
    minutes: number;
    seconds: number;
}

const SECONDS_INTERVAL = 360 / 60;
const MINUTES_INTERVAL = 360 / 60;
const HOURS_INTERVAL = 360 / 12;

export class Clock {
    name: string;
    place: Place;
    enabled: boolean = true;

    element: HTMLDivElement;

    secondHand: HTMLDivElement;
    secondCenter: HTMLDivElement;

    minuteHand: HTMLDivElement;
    minuteCenter: HTMLDivElement;

    hourHand: HTMLDivElement;
    hourCenter: HTMLDivElement;

    debugString: HTMLParagraphElement;

    constructor(name: string, place: Place) {
        this.name = name;
        this.place = place;

        this.element = document.getElementById(name) as HTMLDivElement;

        // ! -> This means I know it exists and will not be null
        this.secondHand = this.element.querySelector('[id="second-hand"]')!; 
        this.secondCenter = this.element.querySelector('[id="second-center"]')!; 

        this.minuteHand = this.element.querySelector('[id="minute-hand"]')!;
        this.minuteCenter = this.element.querySelector('[id="minute-center"]')!;

        this.hourHand = this.element.querySelector('[id="hour-hand"]')!;
        this.hourCenter = this.element.querySelector('[id="hour-center"]')!;

        this.debugString = this.element.querySelector('[id="debug-str"]')!;

        this.debugString.innerText = this.place.fullname + "\n" + this.place.timeZone;

        this.createMarkings();

        this.enable();
    }

    currentTime(): Time {
        let currentTimeString = new Date().toLocaleString(DEFAULT_LOCATION, {
            timeZone: this.place.fullname,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });

        // Remove AM or PM
        currentTimeString = currentTimeString.split(" ")[0];

        const [hours, minutes, seconds] = currentTimeString.split(':').map(Number);

        return {
            hours: hours,
            minutes: minutes,
            seconds: seconds,
        };
    }

    toString(): string {
        return new Date().toLocaleTimeString(DEFAULT_LOCATION, { timeZone: this.place.fullname });
    }

    isEnabled(): boolean { return this.enabled; }
 
    animate = (): void => {
        if(this.enabled)
        {
            const time = this.currentTime();
            
            const secondRotation = SECONDS_INTERVAL * time.seconds;
            const minuteRotation = MINUTES_INTERVAL * time.minutes + (time.seconds / 10);
            const hourRotation = HOURS_INTERVAL * time.hours + (MINUTES_INTERVAL / 12) * time.minutes;
        
            this.secondHand.style.transform = `rotate(${secondRotation}deg)`;
            this.minuteHand.style.transform = `rotate(${minuteRotation}deg)`;
            this.hourHand.style.transform = `rotate(${hourRotation}deg)`;  
        
            requestAnimationFrame(this.animate);
        }
    };

    enable = (): void => {
        this.enabled = true;

        this.element.classList.remove("clock-disabled");

        this.secondHand.classList.remove("second-hand-disabled");
        this.secondCenter.classList.remove("second-hand-disabled");

        this.minuteHand.classList.remove("minute-hand-disabled");
        this.minuteCenter.classList.remove("minute-hand-disabled");

        this.hourHand.classList.remove("hour-hand-disabled");
        this.hourCenter.classList.remove("hour-hand-disabled");
    };

    disable = (): void => {
        this.enabled = false;
        
        this.element.classList.add("clock-disabled");

        this.secondHand.classList.add("second-hand-disabled");
        this.secondCenter.classList.add("second-hand-disabled");

        this.minuteHand.classList.add("minute-hand-disabled");
        this.minuteCenter.classList.add("minute-hand-disabled");

        this.hourHand.classList.add("hour-hand-disabled");
        this.hourCenter.classList.add("hour-hand-disabled");
    };

    displayCorrect = (): void => {
        this.enabled = false;

        this.element.classList.add("clock-correct");

        this.secondHand.classList.add("second-hand-correct");
        this.secondCenter.classList.add("second-hand-correct");

        this.minuteHand.classList.add("minute-hand-correct");
        this.minuteCenter.classList.add("minute-hand-correct");

        this.hourHand.classList.add("hour-hand-correct");
        this.hourCenter.classList.add("hour-hand-correct");
    }

    reset = (): void => {
        this.element.classList.remove("clock-correct");

        this.secondHand.classList.remove("second-hand-correct");
        this.secondCenter.classList.remove("second-hand-correct");

        this.minuteHand.classList.remove("minute-hand-correct");
        this.minuteCenter.classList.remove("minute-hand-correct");

        this.hourHand.classList.remove("hour-hand-correct");
        this.hourCenter.classList.remove("hour-hand-correct");
    }

    createMarkings = (): void => {
        // Clear existing markings
        const existingMarkings = this.element.querySelectorAll('.hour-marking');
        existingMarkings.forEach(marking => marking.remove());

        for(let i = 0; i < 12; i++) {
            let markinglDiv = document.createElement('div');
            markinglDiv.classList.add('hour-marking');
            markinglDiv.style.transform = `rotate(calc((360deg / 12)  * ${i}))`;      
            
            let p = document.createElement('p');
            p.innerHTML = '';
            markinglDiv.appendChild(p);
    
            this.element.appendChild(markinglDiv);
        }
    }

    setMarkings = (markingType: string): void => {
        const numerals = ['XII', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI'];
        const numbers = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

        const markingDivs = this.element.getElementsByClassName('hour-marking') as HTMLCollectionOf<HTMLDivElement>;

        for (let i = 0; i < markingDivs.length; i++) {
            const p = markingDivs[i].querySelector('p')!;

            switch (markingType) {
                case 'marker-dash':
                    p.innerHTML = '|';
                    break;

                case 'marker-numeral':
                    p.innerHTML = numerals[i].toString();
                    break;

                case 'marker-number':
                    p.innerHTML = numbers[i].toString();
                    break;

                case 'marker-random':
                    let options = ['marker-none', 'marker-number', 'marker-numeral', 'marker-dash'];
                    let randomIndex = Math.floor(Math.random() * options.length);
                    this.setMarkings(options[randomIndex]);
                    break;

                case 'marker-none':
                default:
                    p.innerHTML = '';
                    break
            }
        }    
    }
}