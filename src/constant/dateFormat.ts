import dayjs from 'dayjs';

export const dateFormat = 'YYYY-MM-DD';
export const timeFormat = 'h:00 A';
export const today = dayjs().format(dateFormat);
export const timeNow = dayjs().format(timeFormat);

export const weatherInfoDateFormat = 'YYYY-MM-DDTHH:mm:ss';
