function getWeekDay(date) {
  const days = ['НД', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
  return days[date.getDay()];
}
const date2 = new Date(2012, 0, 3);
document.write(
  '<p>Перевірка для ' + date2.toLocaleDateString('uk-UA') + ': <b>' + getWeekDay(date2) + '</b></p>'
);