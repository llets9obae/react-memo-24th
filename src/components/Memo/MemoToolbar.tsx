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
  onProfileClick?: () => void;
}

export const MemoToolbar = ({
  selectedTag,
  onSelectTag,
  searchQuery,
  onSearchChange,
  onAddClick,
  onProfileClick,
}: MemoToolbarProps) => {
  const iconBtnClass =
    "flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-none " +
    "bg-white-00 shadow-[0_2px_6px_rgba(0,0,0,0.04)] cursor-pointer " +
    "max-[640px]:h-11 max-[640px]:w-11";
  const iconImgClass = "h-6 w-6 max-[640px]:h-5 max-[640px]:w-5";

  return (
    <header className="mb-6 flex w-full items-center gap-4 max-[640px]:gap-2">
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
        <img src={plusIcon} alt="추가" className={iconImgClass} />
      </button>

      <button
        type="button"
        className={iconBtnClass}
        aria-label="프로필"
        onClick={onProfileClick}
      >
        <img src={profileIcon} alt="계정" className={iconImgClass} />
      </button>
    </header>
  );
};
