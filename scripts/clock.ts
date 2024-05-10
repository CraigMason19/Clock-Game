const SECONDS_INTERVAL = 360 / 60;
const MINUTES_INTERVAL = 360 / 60;
const HOURS_INTERVAL = 360 / 12;

export class Clock {
    timeZone: string;

    secondHand: HTMLDivElement;
    minuteHand: HTMLDivElement;
    hourHand: HTMLDivElement;

    constructor(name: string, timeZone: string = 'UTC') {
        this.timeZone = timeZone;

        const clockDiv = document.getElementById(name) as HTMLDivElement;

        // ! -> This means I know it exists and will not be null
        this.secondHand = clockDiv.querySelector('[name="second-hand"]')!; 
        this.minuteHand = clockDiv.querySelector('[name="minute-hand"]')!;
        this.hourHand = clockDiv.querySelector('[name="hour-hand"]')!;
    }

    getCurrentTime(): Date {
        const currentTimeString = new Date().toLocaleString('en-US', { timeZone: this.timeZone });
        return new Date(currentTimeString);
    }
 
    animateClock = (): void => {
        const time = this.getCurrentTime();

        const seconds = time.getSeconds();
        const minutes = time.getMinutes();
        const hours = time.getHours();
        
        const secondRotation = SECONDS_INTERVAL * seconds;
        const minuteRotation = MINUTES_INTERVAL * minutes + (seconds / 10);
        const hourRotation = HOURS_INTERVAL * hours + (MINUTES_INTERVAL / 12) * minutes;
    
        this.secondHand.style.transform = `rotate(${secondRotation}deg)`;
        this.minuteHand.style.transform = `rotate(${minuteRotation}deg)`;
        this.hourHand.style.transform = `rotate(${hourRotation}deg)`;  
    
        requestAnimationFrame(this.animateClock);
    };
}