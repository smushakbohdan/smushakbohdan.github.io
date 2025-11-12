document.addEventListener("DOMContentLoaded", function() {
    const clockElement = document.getElementById('clock');
    function addLeadingZero(num) {
        return (num < 10) ? "0" + num : num;
    }
    function updateClock() {
        const now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        let seconds = now.getSeconds();
        hours = addLeadingZero(hours);
        minutes = addLeadingZero(minutes);
        seconds = addLeadingZero(seconds);
        const timeString = `${hours}:${minutes}:${seconds}`;
        clockElement.textContent = timeString;
    }
    setInterval(updateClock, 1000);
    updateClock();
});