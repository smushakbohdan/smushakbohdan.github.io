document.addEventListener("DOMContentLoaded", function() {
    const playButton = document.getElementById('playButton');
    const resultElement = document.getElementById('gameResult');
    playButton.addEventListener('click', function() {
        const betString = prompt("Введіть суму вашої ставки (грн):");
        const betAmount = parseFloat(betString);
        if (isNaN(betAmount) || betAmount <= 0) {
            resultElement.textContent = "Будь ласка, введіть коректну суму ставки.";
            return; 
        }
        resultElement.textContent = "Обробляємо вашу ставку...";
        const randomNumber = Math.floor(Math.random() * 11) - 5;
        setTimeout(function() {
            if (randomNumber <= 0) {
                resultElement.textContent = `Випало число: ${randomNumber}. Ви "не вгадали" зі своєю ставкою.`;
            } else {
                const winnings = betAmount * randomNumber;
                resultElement.textContent = `Випало число: ${randomNumber}. Ви виграли ${winnings} гривень!`;
            }
        }, 1000); 
    });
});