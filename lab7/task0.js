function showLoader() {
    document.getElementById('loader').style.display = 'block';
    document.getElementById('result').innerHTML = '';
    document.getElementById('result').className = '';
}
function hideLoader() {
    document.getElementById('loader').style.display = 'none';
}
function showResult(message, isSuccess) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = message;
    resultDiv.className = isSuccess ? 'success' : 'error';
}
function testPromise(shouldSucceed) {
    showLoader();
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldSucceed) {
                resolve('Promise успішно виконано! ✓');
            } else {
                reject('Виникла помилка при виконанні Promise ✗');
            }
        }, 2000);
    });
    promise
        .then(result => {
            hideLoader();
            showResult(result, true);
        })
        .catch(error => {
            hideLoader();
            showResult(error, false);
        });
}