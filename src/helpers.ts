import { MINUTES_COUNT_IN_HOUR } from './validationSchemas';

export const getFormattedDate = (date: Date, type: string): string => {
  const currentMonth: number = date.getMonth() + 1;
  const currentDay: number = date.getDate();
  if (type === 'calendar') {
    return `${date.getFullYear()}-${
      String(currentMonth).length == 2 ? currentMonth : '0' + currentMonth
    }-${String(currentDay).length == 2 ? currentDay : '0' + currentDay}`;
  }
  return `${String(currentDay).length == 2 ? currentDay : '0' + currentDay}.${
    String(currentMonth).length == 2 ? currentMonth : '0' + currentMonth
  }.${date.getFullYear()}`;
};

export const getFormattedTimeOffset = (): string => {
  // Смещение UTC относительно нашего часового пояса. Например, в Иркутске -8
  let formattedTimeOffset = String(new Date().getTimezoneOffset() / MINUTES_COUNT_IN_HOUR);

  if (formattedTimeOffset.includes('-')) {
    // Присваеваем formattedTimeOffset смещение относительно UTC, а не нашего часового пояса, меняя знак
    formattedTimeOffset.length == 2
      ? (formattedTimeOffset = formattedTimeOffset.replace('-', '+0'))
      : (formattedTimeOffset = formattedTimeOffset.replace('-', '+'));
  } else {
    formattedTimeOffset.length == 1
      ? (formattedTimeOffset = `-0${formattedTimeOffset}`)
      : (formattedTimeOffset = `-${formattedTimeOffset}`);
  }
  return formattedTimeOffset;
};
