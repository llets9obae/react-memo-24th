import plusIcon from '../../assets/icons/plus.svg';
import profileIcon from '../../assets/icons/profile.svg';
import { MemoSearchBar } from './MemoSearchBar';
import type { TagType } from './TagDropdown';

interface MemoToolbarProps {
  selectedTag: TagType;
  onSelectTag: (tag: TagType) => void;
  onAddClick?: () => void;
}

export const MemoToolbar = ({ selectedTag, onSelectTag, onAddClick }: MemoToolbarProps) => {
  return (
    <header className="top-bar">
      <MemoSearchBar selectedTag={selectedTag} onSelectTag={onSelectTag} />

      <button
        type="button"
        className="icon-btn"
        aria-label="메모 추가"
        onClick={onAddClick}
      >
        <img src={plusIcon} alt="추가" style={{ width: '24px', height: '24px' }} />
      </button>

      <button type="button" className="icon-btn" aria-label="내 계정">
        <img src={profileIcon} alt="계정" style={{ width: '24px', height: '24px' }} />
      </button>
    </header>
  );
};