// min 0:00:00
// max 9:59:59
export class Timer {
    constructor(runningStart = false) {
        this.seconds = 0;
        this.minutes = 0;
        this.hours = 0;
        this.isRunning = false;
        this.isRunning = runningStart;
    }
    update() {
        if (this.isRunning) {
            this.seconds++;
            if (this.seconds / 60 === 1) {
                this.seconds = 0;
                this.minutes++;
                if (this.minutes / 60 === 1) {
                    this.minutes = 0;
                    this.hours++;
                }
            }
        }
    }
    pause() {
        this.isRunning = !this.isRunning;
    }
    reset() {
        this.isRunning = false;
        this.seconds = 0;
        this.minutes = 0;
        this.hours = 0;
    }
    toString() {
        let secondStr = (this.seconds < 10) ? "0" + this.seconds.toString() : this.seconds.toString();
        let minuteStr = (this.minutes < 10) ? "0" + this.minutes.toString() : this.minutes.toString();
        let hourStr = (this.hours < 10) ? "0" + this.hours.toString() : this.hours.toString();
        return `${hourStr}:${minuteStr}:${secondStr}`;
    }
}
// let timerInterval = null;
// let timerStatus = "stopped"
// reset
//     window.clearInterval(timerInterval);
// startButton.addEventListener('click', function() {
//     if(timerStatus === 'stopped') {
//         timerInterval = window.setInterval(stopwatch, 1000);
//         startButton.innerHTML = '<i class="fa-solid fa-pause" id="pause"></i>';
//         timerStatus = 'running';
//     }
//     else {
//         pauseTimer();
//     }
// });
// resetButton.addEventListener('click', function() {
//     resetTimer();
// // });
