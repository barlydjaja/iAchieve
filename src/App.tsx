import AchievementCard from 'components/AchievementCard';
import AchievementFilter from 'components/AchievementFilter';
import TagFilter from 'components/TagFilter';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAchievements, selectSearchQuery, selectSelectedTag, selectSortOrder, setAllTags } from 'redux/reducers/achievements';

function App() {
  const dispatch = useDispatch();
  const achievements = useSelector(selectAchievements);
  const searchQuery = useSelector(selectSearchQuery);
  const selectedTag = useSelector(selectSelectedTag);
  const sortOrder = useSelector(selectSortOrder);

  const filteredAchievements = useMemo(() => achievements
    .filter((achievement) => {
      // Search filter
      const matchesSearch =
        achievement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        achievement.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Tag filter
      const matchesTag = !selectedTag || (achievement.tags && achievement.tags.includes(selectedTag));

      return matchesSearch && matchesTag;
    })
    .sort((a, b) => {
      return sortOrder === 'newest' ? (b.date - a.date) : (a.date - b.date);
    })
  , [achievements, searchQuery, selectedTag, sortOrder]);

  useEffect(() => {
    dispatch(setAllTags(Array.from(new Set(achievements.flatMap((achievement) => achievement.tags || [])))));
  }, [achievements, dispatch]);

  const renderAchievements = useMemo(() => {
    if (achievements.length === 0) {
      return (
        <div className="text-center py-12 text-muted-foreground">
          No achievements yet. Add your first achievement!
        </div>
      );
    }

    if (filteredAchievements.length === 0) {
      return (
        <div className="text-center py-12 text-muted-foreground">
          No achievements found.
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredAchievements.map((achievement) => (
          <AchievementCard
            key={achievement.id}
            achievement={achievement}
          />
        ))}
      </div>
    );
  }, [achievements.length, filteredAchievements]);

  return (
    <main className="container mx-auto py-6 px-4 max-w-5xl min-h-dvh">
      <h1 className="text-3xl font-bold mb-6">Achievement Tracker</h1>

      <AchievementFilter/>
      <TagFilter/>
      {renderAchievements}
    </main>
  );
}

export default App;
