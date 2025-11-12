function getLastDayOfMonth(year, month) {
  const date = new Date(year, month + 1, 0);
  return date.getDate();
}
document.write(
  '<p>Останній день лютого 2020: <b>' + getLastDayOfMonth(2020, 1) + '</b> (очікується 29)</p>'
);
document.write(
  '<p>Останній день лютого 2021: <b>' + getLastDayOfMonth(2021, 1) + '</b> (очікується 28)</p>'
);
function getSecondsToTomorrow() {
  const now = new Date();
  const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  const diffMs = tomorrow - now;
  return Math.round(diffMs / 1000);
}
document.write(
  '<p>До кінця доби (до завтра) залишилося: <b>' + getSecondsToTomorrow() + '</b> секунд.</p>'
);