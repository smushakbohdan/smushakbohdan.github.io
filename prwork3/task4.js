function formatFullDate(date) {
  const addZero = (num) => (num < 10 ? '0' + num : num);
  const d = date.getDate();
  const m = date.getMonth() + 1;
  const y = date.getFullYear().toString().slice(-2);
  const h = date.getHours();
  const min = date.getMinutes();
  return `${addZero(d)}.${addZero(m)}.${addZero(y)} ${addZero(h)}:${addZero(min)}`;
}
function formatDate(date) {
  const now = new Date();
  const diffMs = now - date;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  if (diffSec < 1) return 'прямо зараз';
  if (diffSec < 60) return `${diffSec} сек. назад`;
  if (diffMin < 60) return `${diffMin} хв. назад`;
  return formatFullDate(date);
}
document.write('<p><b>Тестування formatDate:</b></p>');
document.write(`<p>${formatDate(new Date(Date.now() - 500))} (менше 1 сек)</p>`);
document.write(`<p>${formatDate(new Date(Date.now() - 30 * 1000))} (менше 1 хв)</p>`);
document.write(`<p>${formatDate(new Date(Date.now() - 10 * 60 * 1000))} (менше 1 год)</p>`);
document.write(`<p>${formatDate(new Date(Date.now() - 24 * 60 * 60 * 1000))} (більше 1 год)</p>`);
