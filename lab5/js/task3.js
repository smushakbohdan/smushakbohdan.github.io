(function () {
  const nextBtn = document.getElementById('nextBtn');
  const taskText = document.getElementById('taskText');
  const optionsForm = document.getElementById('optionsForm');
  const resultText = document.getElementById('resultText');
  const scoreText = document.getElementById('scoreText');
  let current = null;
  let total = 0, correct = 0;
  function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
  function newTask() {
    const a = randInt(2, 9);
    const b = randInt(2, 9);
    const answer = a * b;
    current = { a, b, answer };
    taskText.textContent = `${a} × ${b} =`;
    resultText.textContent = '';
    const options = new Set([answer]);
    while (options.size < 4) {
      const random = randInt(2, 81);
      if (!options.has(random)) options.add(random);
    }
    const variants = shuffleArray([...options]);
    optionsForm.innerHTML = '';
    variants.forEach((val, idx) => {
      const id = 'opt' + idx;
      const label = document.createElement('label');
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'answer';
      radio.value = val;
      radio.id = id;
      radio.addEventListener('change', checkAnswer);
      label.appendChild(radio);
      label.appendChild(document.createTextNode(' ' + val));
      optionsForm.appendChild(label);
    });
  }
  function checkAnswer(e) {
    if (!current) return;
    const chosen = parseInt(e.target.value, 10);
    total++;
    if (chosen === current.answer) {
      correct++;
      resultText.textContent = 'Правильно';
    } else {
      resultText.textContent = `Помилка, правильна відповідь «${current.answer}»`;
    }
    updateScore();
    const radios = optionsForm.querySelectorAll('input');
    radios.forEach(r => (r.disabled = true));
    current = null;
  }
  function updateScore() {
    const percent = total === 0 ? 0 : Math.round((correct / total) * 100);
    scoreText.textContent = `Загальний рахунок ${percent}% (${correct} правильних відповідей з ${total})`;
  }
  nextBtn.addEventListener('click', newTask);
  updateScore();
})();
