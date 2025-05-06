import { useEffect, useState } from 'react';
import { WeatherInfo } from 'types/weatherInfo';
import axios from 'axios';
import { tryCatch } from 'lib/utils';

interface UseGetTemperatureInfo {
  timestamp: string;
  enabled?: boolean;
}

const useGetTemperatureInfo = ({ timestamp, enabled = true }: UseGetTemperatureInfo) => {
  const [data, setData] = useState<WeatherInfo | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTemperatureInfo = async (timestamp : UseGetTemperatureInfo['timestamp']) => {
      setLoading(true);

      // TODO: use proper axios instance
      const { data, error } = await tryCatch(
        axios.get<{ data: WeatherInfo }>(
          `https://api-open.data.gov.sg/v2/real-time/api/air-temperature?date=${timestamp}`
        )
      );
      setLoading(false);

      if (error) {
        console.error(error);
        return;
      }

      setData(data.data.data);
    };

    if (enabled && timestamp) {
      fetchTemperatureInfo(timestamp);
    }
  }, [enabled, timestamp]);

  return { data, loading };
};

export default useGetTemperatureInfo;
