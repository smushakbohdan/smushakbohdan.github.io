function showLoader() {
    document.getElementById('loader').style.display = 'block';
    document.getElementById('result').innerHTML = '';
    document.getElementById('result').className = '';
    document.getElementById('compareBtn').disabled = true;
}
function hideLoader() {
    document.getElementById('loader').style.display = 'none';
    document.getElementById('compareBtn').disabled = false;
}
function showResult(message, isSuccess) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = message;
    resultDiv.className = isSuccess ? 'success' : 'error';
}
function compareNumbers(num1, num2) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (num1 > num2) {
                resolve('Перше число більше');
            } else if (num1 < num2) {
                resolve('Друге число більше');
            } else {
                reject('Числа рівні');
            }
        }, 1000);
    });
}
function handleCompare() {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    if (isNaN(num1) || isNaN(num2)) {
        showResult('Будь ласка, введіть обидва числа!', false);
        return;
    }
    showLoader();
    compareNumbers(num1, num2)
        .then(result => {
            hideLoader();
            showResult(`${result}<br>Порівняння: ${num1} vs ${num2}`, true);
        })
        .catch(error => {
            hideLoader();
            showResult(`${error}<br>Обидва числа рівні: ${num1} = ${num2}`, false);
        });
}
document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        handleCompare();
    }
});