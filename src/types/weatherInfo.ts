export interface WeatherInfoLocation {
  latitude: number;
  longitude: number;
}

export interface WeatherInfoStation {
  id: string;
  deviceId: string;
  name: string;
  location: WeatherInfoLocation;
}

export interface WeatherInfoReading {
  timestamp: string;
  data: {
    stationId: string;
    value: number;
  }[];
}

export interface WeatherInfo {
  stations: WeatherInfoStation[];
  readings: WeatherInfoReading[];
  readingType: string;
  readingUnit: string;
}

export interface CombinedWeatherInfo extends WeatherInfoStation {
  temperature: number;
  humidity: number;
}
