const namesOfWeekDays = [
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Cуббота',
  'Воскресенье',
];

export const formatDate = (date) => {
  const dayOfWeek = namesOfWeekDays[date.getDay()];
  const dateOfMonth = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${dayOfWeek}, ${dateOfMonth.toString().padStart(2, '0')}.${month
    .toString()
    .padStart(2, '0')}.${year}`;
};

export const formatTime = (time) => {
  const hours = time.getHours();
  const minutes = time.getMinutes();

  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}`;
};
