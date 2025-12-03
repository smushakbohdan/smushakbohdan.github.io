function showLoader() {
    document.getElementById('loader').style.display = 'block';
    document.getElementById('result').innerHTML = '';
    document.getElementById('result').className = '';
    document.getElementById('runBtn').disabled = true;
}
function hideLoader() {
    document.getElementById('loader').style.display = 'none';
    document.getElementById('runBtn').disabled = false;
}
function showResult(message, isSuccess) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = message;
    resultDiv.className = isSuccess ? 'success' : 'error';
}
function createRandomPromise(delay) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const randomNum = Math.floor(Math.random() * 10) + 1;
            resolve(randomNum);
        }, delay * 1000);
    });
}
function runPromiseAll() {
    showLoader();
    const promise1 = createRandomPromise(1);
    const promise2 = createRandomPromise(2);
    const promise3 = createRandomPromise(3);
    const promises = [promise1, promise2, promise3];
    Promise.all(promises)
        .then(results => {
            hideLoader();
            const [num1, num2, num3] = results;
            const sum = num1 + num2 + num3;
            let resultHTML = '<div class="promise-details">';
            resultHTML += '<h3 style="margin-top: 0;">Результати Promise:</h3>';
            resultHTML += `<div class="promise-item">Promise 1 (1 сек): <strong>${num1}</strong></div>`;
            resultHTML += `<div class="promise-item">Promise 2 (2 сек): <strong>${num2}</strong></div>`;
            resultHTML += `<div class="promise-item">Promise 3 (3 сек): <strong>${num3}</strong></div>`;
            resultHTML += '</div>';
            resultHTML += `<div class="sum-result">Сума всіх значень: ${num1} + ${num2} + ${num3} = ${sum}</div>`;
            showResult(resultHTML, true);
        })
        .catch(error => {
            hideLoader();
            showResult(`Помилка: ${error}`, false);
        });
}