import { Input } from 'components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'components/ui/select';
import { Search } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllTags, selectSearchQuery, selectSelectedTag, selectSortOrder, setSearchQuery, setSelectedTag, setSortOrder } from 'redux/reducers/achievements';
import AddAchievement from 'components/AddAchievement';

const AchievementFilter = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector(selectSearchQuery);
  const sortOrder = useSelector(selectSortOrder);
  const selectedTag = useSelector(selectSelectedTag);
  const allTags = useSelector(selectAllTags);

  const handleTagChange = (value: string) => {
    const isNullValue = value === 'all';
    dispatch(setSelectedTag(isNullValue ? null : value));
  };

  const handleSortOrderChange = (value: string) => {
    dispatch(setSortOrder(value));
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search achievements..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        />
      </div>

      <Select value={sortOrder} onValueChange={handleSortOrderChange}>
        <SelectTrigger className="md:w-[180px] w-full">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="newest">Newest first</SelectItem>
          <SelectItem value="oldest">Oldest first</SelectItem>
        </SelectContent>
      </Select>

      <Select value={selectedTag || ''} onValueChange={handleTagChange}>
        <SelectTrigger className="md:w-[180px] w-full">
          <SelectValue placeholder="Filter by tag" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All tags</SelectItem>
          {allTags.map((tag) => (
            <SelectItem key={tag} value={tag}>
              {tag}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <AddAchievement />
    </div>
  );
};

export default AchievementFilter;
