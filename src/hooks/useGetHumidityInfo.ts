import { useEffect, useState } from 'react';
import { WeatherInfo } from 'types/weatherInfo';
import axios from 'axios';
import { tryCatch } from 'lib/utils';

interface UseGetHumidityInfo {
  timestamp: string;
  enabled?: boolean;
}

const useGetHumidityInfo = ({ timestamp, enabled = true }: UseGetHumidityInfo) => {
  const [data, setData] = useState<WeatherInfo | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchHumidityInfo = async (timestamp : UseGetHumidityInfo['timestamp']) => {
      setLoading(true);

      // TODO: use proper axios instance
      const { data, error } = await tryCatch(
        axios.get<{ data: WeatherInfo }>(
          `https://api-open.data.gov.sg/v2/real-time/api/relative-humidity?date=${timestamp}`
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
      fetchHumidityInfo(timestamp);
    }
  }, [enabled, timestamp]);

  return { data, loading };
};

export default useGetHumidityInfo;
