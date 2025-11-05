(function () {
      // Карта пікселів для цифр 0-9 
      const DIGIT_MAP = [
        ["111", "101", "101", "101", "111"], // 0
        ["010", "110", "010", "010", "111"], // 1
        ["111", "001", "111", "100", "111"], // 2
        ["111", "001", "111", "001", "111"], // 3
        ["101", "101", "111", "001", "001"], // 4
        ["111", "100", "111", "001", "111"], // 5
        ["111", "100", "111", "101", "111"], // 6
        ["111", "001", "001", "001", "001"], // 7
        ["111", "101", "111", "101", "111"], // 8
        ["111", "101", "111", "001", "111"]  // 9
      ];
      const digitsInput = document.getElementById('digits');
      const captchaDiv = document.getElementById('captcha');
      const input = document.getElementById('input');
      const checkBtn = document.getElementById('check');
      const refreshBtn = document.getElementById('refresh');
      const result = document.getElementById('result');
      let current = '';
      function genCaptcha(n) {
        let s = '';
        for (let i = 0; i < n; i++) s += Math.floor(Math.random() * 10);
        current = s;
        captchaDiv.innerHTML = '';
        for (const char of s) {
          const digit = parseInt(char);
          const map = DIGIT_MAP[digit];
          const digitElement = document.createElement('div');
          digitElement.className = 'captcha-digit';
          for (const row of map) {
            for (const pixel of row) {
              const pixelElement = document.createElement('span');
              pixelElement.className = 'pixel';
              if (pixel === '1') {
                pixelElement.classList.add('on'); 
              }
              digitElement.appendChild(pixelElement);
            }
          }
          captchaDiv.appendChild(digitElement);
        }
      }
      function refresh() {
        const n = parseInt(digitsInput.value) || 4;
        genCaptcha(Math.min(8, Math.max(1, n)));
        result.textContent = ''; 
        result.className = '';   
        input.value = '';
      }
      checkBtn.onclick = () => {
        if (input.value === current) {
          result.textContent = 'Правильно!';
          result.className = 'success';
        } else {
          result.textContent = 'Помилка'; 
          result.className = 'error';
        }
      };
      refreshBtn.onclick = refresh;
      document.addEventListener('DOMContentLoaded', refresh);
    })(); 