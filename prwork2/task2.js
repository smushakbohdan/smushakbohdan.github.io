document.addEventListener("DOMContentLoaded", function() {
    const clockElement = document.getElementById('clock');
    function addLeadingZero(num) {
        return (num < 10) ? "0" + num : num;
    }
    function updateClock() {
        const now = new Date();
        const timeString = `${addLeadingZero(now.getHours())}:${addLeadingZero(now.getMinutes())}:${addLeadingZero(now.getSeconds())}`;
        clockElement.textContent = timeString;
    }
    setInterval(updateClock, 1000);
    updateClock();
    setInterval(function() {
        alert("пройшла ще одна хвилина!");
    }, 60000); 
});