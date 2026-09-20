import plusIcon from "../../assets/icons/plus.svg";
import profileIcon from "../../assets/icons/profile.svg";
import { MemoSearchBar } from "./MemoSearchBar";
import type { TagType } from "./TagDropdown";

interface MemoToolbarProps {
  selectedTag: TagType;
  onSelectTag: (tag: TagType) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onAddClick?: () => void;
}

export const MemoToolbar = ({
  selectedTag,
  onSelectTag,
  searchQuery,
  onSearchChange,
  onAddClick,
}: MemoToolbarProps) => {
  const iconBtnClass =
    "flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-none " +
    "bg-white-00 shadow-[0_2px_6px_rgba(0,0,0,0.04)] cursor-pointer";

  return (
    <header className="flex w-full items-center gap-4 mb-6">
      <MemoSearchBar
        selectedTag={selectedTag}
        onSelectTag={onSelectTag}
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
      />

      <button
        type="button"
        className={iconBtnClass}
        aria-label="메모 추가"
        onClick={onAddClick}
      >
        <img src={plusIcon} alt="추가" className="h-6 w-6" />
      </button>

      <button type="button" className={iconBtnClass} aria-label="내 계정">
        <img src={profileIcon} alt="계정" className="h-6 w-6" />
      </button>
    </header>
  );
};
