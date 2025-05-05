import { Badge } from 'components/ui/badge';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllTags, selectSelectedTag, setSelectedTag } from 'redux/reducers/achievements';

const TagFilter = () => {
  const dispatch = useDispatch();
  const selectedTag = useSelector(selectSelectedTag);
  const allTags = useSelector(selectAllTags);

  return (
    allTags.length > 0 && (
      <div className="flex flex-wrap gap-2 mb-6">
        <Badge
          variant={!selectedTag ? 'default' : 'outline'}
          className="cursor-pointer"
          onClick={() => dispatch(setSelectedTag(null))}
        >
            All
        </Badge>
        {allTags.map((tag) => (
          <Badge
            key={tag}
            variant={selectedTag === tag ? 'default' : 'outline'}
            className="cursor-pointer"
            onClick={() => dispatch(setSelectedTag(tag))}
          >
            {tag}
          </Badge>
        ))}
      </div>
    )
  );
};

export default TagFilter;
