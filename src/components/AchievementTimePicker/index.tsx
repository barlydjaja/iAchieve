import { ScrollArea, ScrollBar } from 'components/ui/scroll-area';
import { Button } from 'components/ui/button';
import { PopoverContent, PopoverTrigger } from 'components/ui/popover';
import { Popover } from '@radix-ui/react-popover';
import { cn } from 'lib/utils';
import { formatDate } from 'date-fns';
import { TimerIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { TimeOfDay } from 'types/achievement';

const hours = Array.from({ length: 12 }, (_, i) => i + 1);

interface AchievementTimePickerProps {
  selectedHour: number;
  selectedTimeOfDay: TimeOfDay;
  onChange: (hour: number, timeOfDay: TimeOfDay) => void;
}

const AchievementTimePicker = ({ selectedHour, selectedTimeOfDay, onChange }: AchievementTimePickerProps) => {
  const [open, setOpen] = useState(false);

  const hourRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleSelectHour = (evt: React.MouseEvent<HTMLButtonElement>, hour: number) => {
    evt.stopPropagation();
    onChange(hour, selectedTimeOfDay);
  };

  const handleSelectTimeOfDay = (evt: React.MouseEvent<HTMLButtonElement>, timeOfDay: TimeOfDay) => {
    evt.stopPropagation();
    onChange(selectedHour, timeOfDay);
  };

  useEffect(() => {
    if (open) {
      // wait for the next render to ensure refs are set
      const timer = setTimeout(() => {
        if (hourRefs.current[selectedHour - 1]) {
          hourRefs.current[selectedHour - 1]?.scrollIntoView({ block: 'center', behavior: 'smooth' });
        }
      });
      return () => clearTimeout(timer);
    }
  }, [open, selectedHour]);

  const time = `${selectedHour} ${selectedTimeOfDay}`;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-full pl-3 text-left font-normal',
            !formatDate && 'text-muted-foreground'
          )}
        >
          {/* {formatDate.format('MMM D, YYYY') || 'Pick a date'} */}
          {time || 'Pick a time'}
          <TimerIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[120px] sm:w-auto p-0" align="start">
        <div className="flex flex-col sm:flex-row sm:h-[150px] divide-y sm:divide-y-0 sm:divide-x">
          <ScrollArea className="w-auto">
            <div className="flex sm:flex-col p-2">
              {hours.map((hour, idx) => (
                <Button
                  type='button'
                  key={hour}
                  size="icon"
                  variant={selectedHour === hour ? 'default' : 'ghost'}
                  className="sm:w-full shrink-0 aspect-square"
                  onClick={(evt) => handleSelectHour(evt, hour)}
                  ref={el => {hourRefs.current[idx] = el;}}
                >
                  {hour}
                </Button>
              ))}
            </div>
            <ScrollBar orientation="horizontal" className="sm:hidden" />
          </ScrollArea>
          <ScrollArea className="w-64 sm:w-auto">
            <div className="flex sm:flex-col p-2">
              <Button
                type='button'
                size="icon"
                variant={selectedTimeOfDay === TimeOfDay.AM ? 'default' : 'ghost'}
                className="sm:w-full shrink-0 aspect-square"
                onClick={(evt) => handleSelectTimeOfDay(evt, TimeOfDay.AM)}
              >
                AM
              </Button>
              <Button
                type='button'
                size="icon"
                variant={selectedTimeOfDay === TimeOfDay.PM ? 'default' : 'ghost'}
                className="sm:w-full shrink-0 aspect-square"
                onClick={(evt) => handleSelectTimeOfDay(evt, TimeOfDay.PM)}
              >
                PM
              </Button>
            </div>
            <ScrollBar orientation="horizontal" className="sm:hidden" />
          </ScrollArea>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default AchievementTimePicker;
