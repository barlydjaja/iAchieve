import { Button } from 'components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from 'components/ui/dialog';
import { Input } from 'components/ui/input';
import { Label } from 'components/ui/label';
import { Textarea } from 'components/ui/textarea';
import { Edit, PlusCircle } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addAchievement, updateAchievement } from 'redux/reducers/achievements';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import AchievementCalendarPicker from 'components/AchievementCalendarPicker';
import { dateFormat, timeFormat, weatherInfoDateFormat } from 'constant/dateFormat';
import { Achievement, TimeOfDay } from 'types/achievement';
import AchievementTimePicker from 'components/AchievementTimePicker';
import { parseTime } from 'lib/utils';
import LocationSelector from 'components/LocationSelector';
import { CombinedWeatherInfo } from 'types/weatherInfo';

interface AddAchievementProps {
  achievement?: Achievement;
}

const AddAchievement = ({ achievement }: AddAchievementProps) => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const [achievementForm, setAchievementForm] = useState({
    title: achievement?.title || '',
    description: achievement?.description || '',
    date: dayjs(achievement?.date).format(dateFormat),
    time: dayjs(achievement?.date).format(timeFormat),
    tags: achievement?.tags || [],
    location: achievement?.location,
  });

  const { hour, timeOfDay } = useMemo(() => parseTime(achievementForm.time), [achievementForm.time]);

  const weatherTimestamp = useMemo(() => dayjs(`${achievementForm.date} ${achievementForm.time}`).format(weatherInfoDateFormat), [achievementForm.date, achievementForm.time]);

  const resetForm = useCallback(() => {
    setAchievementForm({
      title: achievement?.title || '',
      description: achievement?.description || '',
      date: dayjs(achievement?.date).format(dateFormat),
      time: dayjs(achievement?.date).format(timeFormat),
      tags: achievement?.tags || [],
      location: achievement?.location,
    });
  }, [achievement]);

  const handleUpdate = () => {
    const payload: Achievement = {
      id: achievement?.id || uuidv4(),
      title: achievementForm.title,
      description: achievementForm.description,
      date: +dayjs(`${achievementForm.date} ${achievementForm.time}`),
      tags: achievementForm.tags,
      location: achievementForm.location,
    };
    dispatch(updateAchievement(payload));
  };

  const handleAdd = () => {
    const payload: Achievement = {
      id: achievement?.id || uuidv4(),
      title: achievementForm.title,
      description: achievementForm.description,
      date: +dayjs(`${achievementForm.date} ${achievementForm.time}`),
      tags: achievementForm.tags,
      location: achievementForm.location,
    };
    dispatch(addAchievement(payload));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!achievement) {
      handleAdd();
    } else {
      handleUpdate();
    }
    setOpen(false);
  };

  const handleDateChange = (date: string) => {
    setAchievementForm({ ...achievementForm, date });
  };

  const handleTimeChange = (hour: number, timeOfDay: TimeOfDay) => {
    setAchievementForm({ ...achievementForm, time: `${hour}:00 ${timeOfDay}` });
  };

  const handleLocationSelect = (station: CombinedWeatherInfo) => {
    setAchievementForm({ ...achievementForm, location: station });
  };

  useEffect(() => {
    if (!open) {
      resetForm();
    }
  }, [open, resetForm]);

  const renderDialogTrigger = useMemo(() => {
    if (achievement) {
      return (
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Edit className="h-4 w-4" />
          <span className="sr-only">Edit</span>
        </Button>
      );
    }

    return (
      <Button className="cursor-pointer">
        <PlusCircle className="mr-2 h-4 w-4" />
        Add Achievement
      </Button>
    );
  }, [achievement]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {renderDialogTrigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{achievement ? 'Edit Achievement' : 'Add New Achievement'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={achievementForm.title}
              onChange={(e) => setAchievementForm({ ...achievementForm, title: e.target.value })}
              placeholder="Achievement title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={achievementForm.description}
              onChange={(e) => setAchievementForm({ ...achievementForm, description: e.target.value })}
              placeholder="Describe your achievement"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <AchievementCalendarPicker date={achievementForm.date} onChange={handleDateChange}/>
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <AchievementTimePicker selectedHour={hour} selectedTimeOfDay={timeOfDay} onChange={handleTimeChange} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Location</Label>
            <LocationSelector weatherTimestamp={weatherTimestamp} dialogOpened={open} onSelect={handleLocationSelect} selectedLabel={achievementForm.location?.name} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">
              Tags <span className="text-muted-foreground text-sm">(comma separated)</span>
            </Label>
            <Input
              id="tags"
              value={achievementForm.tags.join(', ')}
              onChange={(e) => setAchievementForm({ ...achievementForm, tags: e.target.value.split(',').map((tag) => tag.trim()) })}
              placeholder="work, personal, milestone"
            />
          </div>

          <DialogFooter>
            <Button type="submit">{achievement ? 'Update' : 'Save'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddAchievement;
