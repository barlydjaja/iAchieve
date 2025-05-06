import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from 'lib/utils';
import { Button } from 'components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from 'components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from 'components/ui/popover';
import { useEffect, useMemo, useRef, useState } from 'react';
import useGetWeatherInfo from 'hooks/useGetWeatherInfo';
import { Skeleton } from 'components/ui/skeleton';
import { CombinedWeatherInfo } from 'types/weatherInfo';

interface Option {
  value: string;
  label: string;
}

interface LocationSelectorProps {
  selectedLabel?: string;
  weatherTimestamp: string;
  dialogOpened: boolean;
  onSelect: (station: CombinedWeatherInfo) => void;
}

const LocationSelector = ({ weatherTimestamp, dialogOpened, onSelect, selectedLabel }: LocationSelectorProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [open, setOpen] = useState(false);
  const [label, setLabel] = useState(selectedLabel || '');
  const [popoverWidth, setPopoverWidth] = useState<number | undefined>(undefined);

  const { data: weatherInfo, loading: loadingWeatherInfo } = useGetWeatherInfo({ timestamp: weatherTimestamp, enabled: dialogOpened });

  const [options, setOptions] = useState<Option[]>([]);

  const handleSelectStation = (currentLabel: string) => {
    const isSameLabelSelected = currentLabel === label;

    if (isSameLabelSelected) {
      setLabel('');
      setOpen(false);
      return;
    }

    setLabel(currentLabel);
    const selectedStation = weatherInfo.find((station) => station.name === currentLabel);
    if (selectedStation) {
      onSelect(selectedStation);
    }
    setOpen(false);
  };

  useEffect(() => {
    if (weatherInfo && !loadingWeatherInfo) {
      const options: Option[] = weatherInfo.map((station) => ({
        value: station.id,
        label: station.name,
      }));
      setOptions(options);
    }
  }, [weatherInfo, loadingWeatherInfo]);

  useEffect(() => {
    if (open && buttonRef.current) {
      setPopoverWidth(buttonRef.current.offsetWidth);
    }
  }, [open]);

  const renderLabel = useMemo(() => {
    if (label) {
      const stationInfo = weatherInfo.find((station) => station.name === label);
      if (stationInfo) {
        return (
          <span className="text-sm font-normal">
            {stationInfo?.name} • <span className="text-blue-600">{stationInfo?.temperature}°C</span> • <span className="text-green-600">{stationInfo?.humidity}%</span>
          </span>
        );
      }

      return 'Location not found';
    }
    return 'Select location...';
  }, [label, weatherInfo]);

  if (loadingWeatherInfo) {
    return <Skeleton className="w-full rounded-md h-9 bg-gray-200" />;
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
          ref={buttonRef}
        >
          {renderLabel}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-full p-0"
        style={{ width: popoverWidth || 'auto' }}
      >
        <Command>
          <CommandInput placeholder="Search Location..." className="h-9" />
          <CommandList>
            <CommandEmpty>No Location found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.label}
                  onSelect={handleSelectStation}
                >
                  {option.label}
                  <Check
                    className={cn(
                      'ml-auto',
                      label === option.label ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default LocationSelector;
