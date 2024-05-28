const SECONDS_INTERVAL = 360 / 60;
const MINUTES_INTERVAL = 360 / 60;
const HOURS_INTERVAL = 360 / 12;
export class Clock {
    constructor(name, place) {
        this.enabled = true;
        this.animate = () => {
            if (this.enabled) {
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
            }
        };
        this.enable = () => {
            this.enabled = true;
            this.element.classList.remove("clock-disabled");
            this.secondHand.classList.remove("second-hand-disabled");
            this.secondCenter.classList.remove("second-hand-disabled");
            this.minuteHand.classList.remove("minute-hand-disabled");
            this.minuteCenter.classList.remove("minute-hand-disabled");
            this.hourHand.classList.remove("hour-hand-disabled");
            this.hourCenter.classList.remove("hour-hand-disabled");
        };
        this.disable = () => {
            this.enabled = false;
            this.element.classList.add("clock-disabled");
            this.secondHand.classList.add("second-hand-disabled");
            this.secondCenter.classList.add("second-hand-disabled");
            this.minuteHand.classList.add("minute-hand-disabled");
            this.minuteCenter.classList.add("minute-hand-disabled");
            this.hourHand.classList.add("hour-hand-disabled");
            this.hourCenter.classList.add("hour-hand-disabled");
        };
        this.name = name;
        this.place = place;
        this.element = document.getElementById(name);
        // ! -> This means I know it exists and will not be null
        this.secondHand = this.element.querySelector('[name="second-hand"]');
        this.secondCenter = this.element.querySelector('[id="second-center"]');
        this.minuteHand = this.element.querySelector('[name="minute-hand"]');
        this.minuteCenter = this.element.querySelector('[id="minute-center"]');
        this.hourHand = this.element.querySelector('[name="hour-hand"]');
        this.hourCenter = this.element.querySelector('[id="hour-center"]');
        this.debugString = this.element.querySelector('[name="debug-str"]');
        this.debugString.innerText = this.place.timeZone + "\n" + this.place.timeZoneName;
        console.log(this.debugString);
        this.enable();
    }
    currentTime() {
        const currentTimeString = new Date().toLocaleString('en-US', { timeZone: this.place.timeZone });
        return new Date(currentTimeString);
    }
    toString() {
        return new Date().toLocaleTimeString('en-US', { timeZone: this.place.timeZone });
    }
    isEnabled() { return this.enabled; }
}
