import { dateFormat, today } from 'constant/dateFormat';
import { Button } from 'components/ui/button';
import { Calendar } from 'components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from 'components/ui/popover';
import dayjs from 'dayjs';
import { cn } from 'lib/utils';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';

interface AchievementCalendarProps {
  date?: string;
  onChange?: (date: string) => void;
}

const AchievementCalendarPicker = ({ date = today, onChange }: AchievementCalendarProps) => {
  const [open, setOpen] = useState(false);
  const [formatDate, setFormatDate] = useState(() => dayjs(date));

  const handleSelect = (day?: Date) => {
    if (day) {
      setFormatDate(dayjs(day));
      setOpen(false);
      onChange?.(dayjs(day).format(dateFormat));
    }
  };

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
          {formatDate.format('MMM D, YYYY') || 'Pick a date'}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={formatDate.toDate()}
          onSelect={handleSelect}
          disabled={(date) => date > dayjs(today).toDate()}
        />
      </PopoverContent>
    </Popover>);
};

export default AchievementCalendarPicker;
