import { Card, CardContent, CardFooter, CardHeader, CardTitle } from 'components/ui/card';
import { Badge } from 'components/ui/badge';
import AddAchievement from 'components/AddAchievement';
import DeleteAchievement from 'components/DeleteAchievement';
import dayjs from 'dayjs';
import { Achievement } from 'types/achievement';

interface AchievementCardProps {
  achievement: Achievement;
}

const AchievementCard = ({ achievement }: AchievementCardProps) => {
  const { title, description, tags, date } = achievement;

  return (
    <Card className="gap-0">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{title}</CardTitle>
          <div className="flex space-x-1">
            <AddAchievement achievement={achievement} />
            <DeleteAchievement id={achievement.id} />
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4 flex-wrap">
          <span>{dayjs(date).format('h:mm A')}</span>
          {achievement.location && (
            <>
              <span>•</span>
              <span>{achievement.location.name}</span>
              <span>•</span>
              <span className="text-blue-600">{achievement.location.temperature}°C</span>
              <span>•</span>
              <span className="text-green-600">{achievement.location.humidity}%</span>
            </>
          )}
        </div>
        <p className="text-sm mb-2">{description}</p>

        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-0 text-xs text-muted-foreground">
        Achieved {dayjs(date).fromNow()}
      </CardFooter>
    </Card>
  );
};

export default AchievementCard;
