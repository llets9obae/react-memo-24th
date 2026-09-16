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
      className="search-container"
      style={{
        display: "flex",
        alignItems: "center",
        width: "540px",
        maxWidth: "100%",
        height: "56px",
        backgroundColor: "var(--color-white-00)",
        borderRadius: "40px",
        padding: "6px 10px 6px 16px",
        boxSizing: "border-box",
        boxShadow: "0px 4px 16px rgba(0, 27, 81, 0.06)",
      }}
    >
      {/* 태그 선택 드롭다운 */}
      <TagDropdown selectedTag={selectedTag} onSelectTag={onSelectTag} />

      {/* 검색 입력 인풋창 */}
      <input
        type="text"
        className="search-input"
        placeholder="원하는 메모를 검색하세요"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        style={{
          flex: 1,
          border: "none",
          outline: "none",
          background: "transparent",
          color: "var(--color-blue-06)",
          fontSize: "14px",
          marginLeft: "12px",
        }}
      />

      {/* 우측 돋보기 버튼 */}
      <button
        type="button"
        className="search-submit-btn"
        aria-label="검색"
        style={{
          width: "40px",
          height: "40px",
          flexShrink: 0,
          border: "none",
          background: "transparent",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 0,
        }}
      >
        <img
          src={searchIcon}
          alt="검색"
          style={{ width: "22px", height: "22px" }}
        />
      </button>
    </div>
  );
};
