import searchIcon from "../../assets/icons/search.svg";
import { TagDropdown, type TagType } from "./TagDropdown";

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
    <div
      className="box-border flex h-14 w-[540px] max-w-full items-center rounded-[40px]
        bg-white-00 py-1.5 pr-2.5 pl-4 shadow-[0px_4px_16px_rgba(0,27,81,0.06)]"
    >
      {/* 태그 선택 드롭다운 */}
      <TagDropdown selectedTag={selectedTag} onSelectTag={onSelectTag} />

      {/* 검색 입력 인풋창 */}
      <input
        type="text"
        className="ml-3 flex-1 border-none bg-transparent text-sm text-blue-06
          outline-none placeholder:text-gray-03"
        placeholder="원하는 메모를 검색하세요"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      {/* 우측 돋보기 버튼 */}
      <button
        type="button"
        aria-label="검색"
        className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center
          border-none bg-transparent p-0"
      >
        <img src={searchIcon} alt="검색" className="h-[22px] w-[22px]" />
      </button>
    </div>
  );
};
