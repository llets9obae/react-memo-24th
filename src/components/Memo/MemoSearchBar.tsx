import searchIcon from '../../assets/icons/search.svg';
import { TagDropdown, type TagType } from './TagDropdown';

interface MemoSearchBarProps {
  selectedTag: TagType;
  onSelectTag: (tag: TagType) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const MemoSearchBar = ({
  selectedTag,
  onSelectTag,
  searchQuery,
  onSearchChange,
}: MemoSearchBarProps) => {
  return (
    <div className="search-container">
      <TagDropdown selectedTag={selectedTag} onSelectTag={onSelectTag} />

      <input
        type="text"
        className="search-input"
        placeholder="원하는 메모를 검색하세요"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <button
        type="button"
        className="search-submit-btn"
        aria-label="검색"
        style={{ width: '38.911px', height: '38.911px', flexShrink: 0 }}
      >
        <img
          src={searchIcon}
          alt="검색"
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </button>
    </div>
  );
};