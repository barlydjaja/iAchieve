import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { TimeOfDay } from 'types/achievement';
import { TryCatch } from 'types/tryCatch';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const parseTime = (fullTime: string): { hour: number; timeOfDay: TimeOfDay } => {
  const [time, timeOfDay] = fullTime.split(' ');
  const [hour] = time.split(':');
  return {
    hour: +hour,
    timeOfDay: timeOfDay as TimeOfDay,
  };
};

export const tryCatch = async <T, E = Error>(promise: Promise<T>): Promise<TryCatch<T, E>> => {
  try {
    const data = await promise;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error as E };
  }
};
