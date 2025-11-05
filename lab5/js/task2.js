(function () {
  const nextBtn = document.getElementById('nextBtn');
  const checkBtn = document.getElementById('checkBtn');
  const taskText = document.getElementById('taskText');
  const answerInput = document.getElementById('answerInput');
  const resultText = document.getElementById('resultText');
  const scoreText = document.getElementById('scoreText');
  let current = null;
  let total = 0, correct = 0;
  function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  function newTask() {
    const a = randInt(2, 9);
    const b = randInt(2, 9);
    current = { a, b, answer: a * b };
    taskText.textContent = `${a} × ${b} =`;
    resultText.textContent = '';
    answerInput.value = '';
    answerInput.focus();
  }
  function updateScore() {
    const percent = total === 0 ? 0 : Math.round((correct / total) * 100);
    scoreText.textContent = `Загальний рахунок ${percent}% (${correct} правильних відповідей з ${total})`;
  }
  checkBtn.addEventListener('click', () => {
    if (!current) {
      resultText.textContent = 'Спочатку натисніть «наступне завдання».';
      return;
    }
    const val = answerInput.value.trim();
    const num = parseInt(val, 10);
    total++;
    if (Number.isFinite(num) && num === current.answer) {
      correct++;
      resultText.textContent = 'Правильно';
    } else {
      resultText.textContent = `Помилка, правильна відповідь «${current.answer}»`;
    }
    updateScore();
    current = null;
  });
  nextBtn.addEventListener('click', () => {
    newTask();
  });
  updateScore();
})();
