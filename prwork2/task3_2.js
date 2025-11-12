document.addEventListener("DOMContentLoaded", function() {
    const textToType = "Це ефект через setTimeout.";
    const speed = 100;
    const elTimeout = document.getElementById('typewriterTimeout');
    let j = 0;
    function typeWriter() {
        if (j < textToType.length) {
            elTimeout.textContent += textToType.charAt(j);
            j++;
            setTimeout(typeWriter, speed);
        } else {
            elTimeout.style.borderRight = 'none';
        }
    }
    typeWriter();
});