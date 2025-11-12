document.addEventListener("DOMContentLoaded", function() {
    const textToType = "Це ефект через setInterval.";
    const speed = 100; 
    const elInterval = document.getElementById('typewriterInterval');
    let i = 0; 
    const intervalId = setInterval(function() {
        if (i < textToType.length) {
            elInterval.textContent += textToType.charAt(i);
            i++;
        } else {
            clearInterval(intervalId);
            elInterval.style.borderRight = 'none';
        }
    }, speed);
});