import firebase from 'firebase/app';
import { TooltipTypes } from './types';

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

export const signOut = (showTooltip: (type: TooltipTypes, message: string) => void): void => {
  firebase
    .auth()
    .signOut()
    .catch((error) => {
      showTooltip(TooltipTypes.Error, error.message);
    });
};
