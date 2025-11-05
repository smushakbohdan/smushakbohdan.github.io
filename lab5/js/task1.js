const f = document.getElementById('fahrenheit');
const c = document.getElementById('celsius');
let updating = false;
f.addEventListener('input', () => {
  if (updating) return;
  updating = true;
  const val = parseFloat(f.value);
  if (!isNaN(val)) c.value = ((5 / 9) * (val - 32)).toFixed(2);
  else c.value = '';
  updating = false;
});
c.addEventListener('input', () => {
  if (updating) return;
  updating = true;
  const val = parseFloat(c.value);
  if (!isNaN(val)) f.value = ((val * 9 / 5) + 32).toFixed(2);
  else f.value = '';
  updating = false;
});
