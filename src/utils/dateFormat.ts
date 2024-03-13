import { format } from 'date-fns';

export function getHours(hours: string): string {
  const date = new Date(hours);

  const hour = date.getUTCHours() > 9 ? date.getUTCHours() : `0${date.getUTCHours()}`;
  const minute = date.getUTCMinutes() > 9 ? date.getUTCMinutes() : `0${date.getUTCMinutes()}`;
  const second = date.getUTCSeconds() > 9 ? date.getUTCSeconds() : `0${date.getUTCSeconds()}`;

  return `${hour}:${minute}:${second}`;
}

export function daysInMonth(): number {
  const dateNow = new Date();

  const monthNum = new Date(Date.parse(`${dateNow.getUTCMonth()} 1,${dateNow.getUTCFullYear()}`)).getMonth() + 1;

  return new Date(dateNow.getUTCFullYear(), monthNum, 0).getDate();
}

export function dateFormatAPI(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}

export function getDateFormat(value: string, showTime?: boolean): string {
  if (!value) return '';

  const fixedDate = value.replace('0000', '00:00');
  const newDate = new Date(fixedDate);

  newDate.setMinutes(newDate.getMinutes() + 180);

  return new Intl.DateTimeFormat('default', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: showTime ? 'numeric' : undefined,
    minute: showTime ? 'numeric' : undefined,
    second: showTime ? 'numeric' : undefined,
    hour12: false,
    timeZone: 'America/Sao_Paulo',
  }).format(newDate);
}

export function dateToString(value: Date): string {
  if (!value) return '';

  const day = value.getUTCDate() > 9 ? value.getUTCDate() : `0${value.getUTCDate()}`;

  const month = value.getUTCMonth() + 1 > 9 ? value.getUTCMonth() + 1 : `0${value.getUTCMonth() + 1}`;

  const year = value.getUTCFullYear() > 9 ? value.getUTCFullYear() : `0${value.getUTCFullYear()}`;

  return `${day}/${month}/${year}`;
}

export function dateWithSplit(date: string): string {
  const [year, month, day] = date.split('-');

  return `${day}/${month}/${year}`;
}

export function dateToStringApi(value: Date): string {
  if (!value) return '';

  const day = value.getUTCDate() > 9 ? value.getUTCDate() : `0${value.getUTCDate()}`;

  const month = value.getUTCMonth() + 1 > 9 ? value.getUTCMonth() + 1 : `0${value.getUTCMonth() + 1}`;

  const year = value.getUTCFullYear() > 9 ? value.getUTCFullYear() : `0${value.getUTCFullYear()}`;

  return `${year}-${month}-${day}`;
}

export const convertDateToUTC = (date: Date): Date => {
  return new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds(),
  );
};

export const convertStringToDateUTC = (dateString: string): Date => {
  const date = new Date(dateString);

  return new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds(),
  );
};

export const stringToDate = (value: string): Date => {
  const date = new Date(value);

  return date;
};

export function getDate(date: string): Date {
  if (date) {
    const [day, month, year] = date.replace('00:00:00', '').trim().split('/');

    return new Date(`${year}-${month}-${day}`);
  }

  return new Date();
}

export function dataMask(value: string): string {
  return value
    .replace(/\D+/g, '')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{2})(\d{4})$/, '$1/$2');
}
