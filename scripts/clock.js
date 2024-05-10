const SECONDS_INTERVAL = 360 / 60;
const MINUTES_INTERVAL = 360 / 60;
const HOURS_INTERVAL = 360 / 12;
export class Clock {
    constructor(name, timeZone = 'UTC') {
        this.animate = () => {
            const time = this.currentTime();
            const seconds = time.getSeconds();
            const minutes = time.getMinutes();
            const hours = time.getHours();
            const secondRotation = SECONDS_INTERVAL * seconds;
            const minuteRotation = MINUTES_INTERVAL * minutes + (seconds / 10);
            const hourRotation = HOURS_INTERVAL * hours + (MINUTES_INTERVAL / 12) * minutes;
            this.secondHand.style.transform = `rotate(${secondRotation}deg)`;
            this.minuteHand.style.transform = `rotate(${minuteRotation}deg)`;
            this.hourHand.style.transform = `rotate(${hourRotation}deg)`;
            requestAnimationFrame(this.animate);
        };
        this.name = name;
        this.timeZone = timeZone;
        this.element = document.getElementById(name);
        // ! -> This means I know it exists and will not be null
        this.secondHand = this.element.querySelector('[name="second-hand"]');
        this.minuteHand = this.element.querySelector('[name="minute-hand"]');
        this.hourHand = this.element.querySelector('[name="hour-hand"]');
    }
    currentTime() {
        const currentTimeString = new Date().toLocaleString('en-US', { timeZone: this.timeZone });
        return new Date(currentTimeString);
    }
}
