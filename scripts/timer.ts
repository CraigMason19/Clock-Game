// min 0:00:00
// max 9:59:59

export class Timer {
    seconds: number = 0;
    minutes: number = 0;
    hours: number = 0;

    isRunning: boolean = false;

    constructor(runningStart: boolean = false) {
        this.isRunning = runningStart;
    }

    update(): void {
        if(this.isRunning) {
            this.seconds++;

            if(this.seconds / 60 === 1) {
                this.seconds = 0;
                this.minutes++;

                if(this.minutes / 60 ===1) {
                    this.minutes = 0;
                    this.hours++;
                }
            }
        }
    }

    pause(): void {
        this.isRunning = !this.isRunning;
    }

    reset(): void {
        this.isRunning = false;
        this.seconds = 0;
        this.minutes = 0;
        this.hours = 0;
    }

    toString(): string {
        let secondStr = (this.seconds < 10) ? "0" + this.seconds.toString() : this.seconds.toString();
        let minuteStr = (this.minutes < 10) ? "0" + this.minutes.toString() : this.minutes.toString();
        let hourStr = (this.hours < 10) ? "0" + this.hours.toString() : this.hours.toString();

        return `${hourStr}:${minuteStr}:${secondStr}`;
    }
}