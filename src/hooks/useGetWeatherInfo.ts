import { useEffect, useState } from 'react';
import useGetTemperatureInfo from './useGetTemperatureInfo';
import useGetHumidityInfo from './useGetHumidityInfo';
import { CombinedWeatherInfo } from 'types/weatherInfo';

interface UseGetWeatherInfo {
  timestamp: string;
  enabled?: boolean;
}

const useGetWeatherInfo = ({ timestamp, enabled = true }: UseGetWeatherInfo) => {
  const { data: temperatureInfo, loading: loadingTemperatureInfo } = useGetTemperatureInfo({ timestamp, enabled });
  const { data: humidityInfo, loading: loadingHumidityInfo } = useGetHumidityInfo({ timestamp, enabled });

  const [data, setData] = useState<CombinedWeatherInfo[]>([]);
  const loading = loadingTemperatureInfo || loadingHumidityInfo;

  useEffect(() => {
    if (temperatureInfo && humidityInfo && enabled) {
      const temperatureReading = temperatureInfo.readings[0];
      const humidityReading = humidityInfo.readings[0];

      const transformedPayload: CombinedWeatherInfo[] = temperatureInfo.stations.map((station) => ({
        ...station,
        temperature: temperatureReading.data.find((reading) => reading.stationId === station.id)?.value || 0,
        humidity: humidityReading.data.find((reading) => reading.stationId === station.id)?.value || 0,
      }));

      setData(transformedPayload);
    }
  }, [temperatureInfo, humidityInfo, enabled]);

  return {
    data,
    loading,
  };
};

export default useGetWeatherInfo;
