const SECONDS_INTERVAL = 360 / 60;
const MINUTES_INTERVAL = 360 / 60;
const HOURS_INTERVAL = 360 / 12;

export class Clock {
    name: string;
    timeZone: string;
    enabled: boolean = true;

    element: HTMLDivElement;

    secondHand: HTMLDivElement;
    secondCenter: HTMLDivElement;

    minuteHand: HTMLDivElement;
    minuteCenter: HTMLDivElement;

    hourHand: HTMLDivElement;
    hourCenter: HTMLDivElement;

    constructor(name: string, timeZone: string = 'UTC') {
        this.name = name;
        this.timeZone = timeZone;

        this.element = document.getElementById(name) as HTMLDivElement;

        // ! -> This means I know it exists and will not be null
        this.secondHand = this.element.querySelector('[name="second-hand"]')!; 
        this.secondCenter = this.element.querySelector('[id="second-center"]')!; 

        this.minuteHand = this.element.querySelector('[name="minute-hand"]')!;
        this.minuteCenter = this.element.querySelector('[id="minute-center"]')!;

        this.hourHand = this.element.querySelector('[name="hour-hand"]')!;
        this.hourCenter = this.element.querySelector('[id="hour-center"]')!;

        this.enable();
    }

    currentTime(): Date {
        const currentTimeString = new Date().toLocaleString('en-US', { timeZone: this.timeZone });
        return new Date(currentTimeString);
    }

    toString(): string {
        return new Date().toLocaleTimeString('en-US', { timeZone: this.timeZone });
    }

    isEnabled(): boolean { return this.enabled; }
 
    animate = (): void => {
        if(this.enabled)
        {
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
}