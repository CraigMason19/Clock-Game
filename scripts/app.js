var secondHand = document.getElementById('second-hand');
var minuteHand = document.getElementById('minute-hand');
var hourHand = document.getElementById('hour-hand');
var secondInterval = 360 / 60;
var minuteInterval = 360 / 60;
var hourInterval = 360 / 12;
var simulatedSeconds = 0;
function applyRotations(second, minute, hour) {
    secondHand.style.transform = "rotate(".concat(second, "deg)");
    minuteHand.style.transform = "rotate(".concat(minute, "deg)");
    hourHand.style.transform = "rotate(".concat(hour, "deg)");
}
var animateClock = function () {
    var time = new Date();
    var seconds = time.getSeconds();
    var minutes = time.getMinutes();
    var hours = time.getHours();
    var secondRotation = secondInterval * seconds;
    var minuteRotation = minuteInterval * minutes + (seconds / 10);
    var hourRotation = hourInterval * hours + (minuteInterval / 12) * minutes;
    applyRotations(secondRotation, minuteRotation, hourRotation);
    // Request next animation frame
    requestAnimationFrame(animateClock);
};
var animateFastClock = function () {
    // Increment simulated time
    simulatedSeconds += 1;
    // Calculate simulated time
    var simulatedMinutes = Math.floor(simulatedSeconds / 60);
    var simulatedHours = Math.floor(simulatedMinutes / 60);
    // Calculate rotation angles based on simulated time
    var secondRotation = secondInterval * simulatedSeconds;
    var minuteRotation = minuteInterval * simulatedMinutes + (simulatedSeconds / 10);
    var hourRotation = hourInterval * simulatedHours + (minuteInterval / 12) * simulatedMinutes;
    applyRotations(secondRotation, minuteRotation, hourRotation);
};
animateClock();
// setInterval(animateFastClock, 10);
