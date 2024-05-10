const secondHand = document.getElementById('second-hand');
const minuteHand = document.getElementById('minute-hand');
const hourHand = document.getElementById('hour-hand');

const secondInterval = 360 / 60;
const minuteInterval = 360 / 60;
const hourInterval = 360 / 12;

let simulatedSeconds = 0; // Initialize simulated time

function applyRotations(second, minute, hour) {
    secondHand.style.transform = `rotate(${second}deg)`;
    minuteHand.style.transform = `rotate(${minute}deg)`;
    hourHand.style.transform = `rotate(${hour}deg)`;   
}

const animateClock = () => {
    const time = new Date();
    
    const seconds = time.getSeconds();
    const minutes = time.getMinutes();
    const hours = time.getHours();
    
    const secondRotation = secondInterval * seconds;
    const minuteRotation = minuteInterval * minutes + (seconds / 10);
    const hourRotation = hourInterval * hours + (minuteInterval / 12) * minutes;

    applyRotations(secondRotation, minuteRotation, hourRotation);

    // Request next animation frame
    requestAnimationFrame(animateClock);
};

const animateFastClock = () => {
    // Increment simulated time
    simulatedSeconds += 1;

    // Calculate simulated time
    const simulatedMinutes = Math.floor(simulatedSeconds / 60);
    const simulatedHours = Math.floor(simulatedMinutes / 60);

    // Calculate rotation angles based on simulated time
    const secondRotation = secondInterval * simulatedSeconds;
    const minuteRotation = minuteInterval * simulatedMinutes + (simulatedSeconds / 10);
    const hourRotation = hourInterval * simulatedHours + (minuteInterval / 12) * simulatedMinutes;

    applyRotations(secondRotation, minuteRotation, hourRotation);
};

animateClock();

// setInterval(animateFastClock, 10);