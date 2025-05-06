import { CombinedWeatherInfo } from './weatherInfo';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: number;
  tags?: string[];
  location?: CombinedWeatherInfo;
}

export enum TimeOfDay {
  AM = 'AM',
  PM = 'PM',
}
