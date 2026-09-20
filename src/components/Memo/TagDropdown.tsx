import { useState } from "react";
import vectorIcon from "../../assets/icons/vector.svg";

export type TagType = "ALL" | "Daily" | "Work" | "Others";

interface TagDropdownProps {
  selectedTag: TagType;
  onSelectTag: (tag: TagType) => void;
}

// 카테고리별 색상 매핑
const TAG_DOT_CLASS: Record<Exclude<TagType, "ALL">, string> = {
  Daily: "bg-blue-04",
  Work: "bg-blue-06",
  Others: "bg-gray-03",
};

const menuItemClass = (active: boolean) =>
  `flex w-full items-center gap-2 border-none px-4 py-2.5 text-sm cursor-pointer
  ${active ? "bg-blue-01 font-semibold text-blue-05" : "bg-transparent font-normal text-blue-07"}`;

export const TagDropdown = ({ selectedTag, onSelectTag }: TagDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (tag: TagType) => {
    onSelectTag(tag);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* 1. 상단 태그 선택 버튼 */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="inline-flex cursor-pointer items-center gap-2 rounded-[20px] border-none
          bg-blue-01 px-3.5 py-1.5"
      >
        {selectedTag === "ALL" ? (
          <>
            <span className="text-[15px] font-semibold text-blue-07">
              태그 선택
            </span>
            <img
              src={vectorIcon}
              alt="화살표"
              className={`h-[13px] w-4 shrink-0 transition-transform duration-200 ease-in-out
                ${isOpen ? "rotate-90" : "rotate-0"}`}
            />
          </>
        ) : (
          <>
            <span
              className={`inline-block h-2 w-2 shrink-0 rounded-full ${TAG_DOT_CLASS[selectedTag]}`}
            />
            <span className="text-[15px] font-semibold text-blue-07">
              {selectedTag}
            </span>
            <img
              src={vectorIcon}
              alt="화살표"
              className="h-[13px] w-4 shrink-0 transition-transform duration-200 ease-in-out"
            />
          </>
        )}
      </button>

      {/* 2. 드롭다운 메뉴 (색상 동그라미 포함) */}
      {isOpen && (
        <ul
          className="absolute top-12 left-0 z-[100] min-w-[130px] list-none rounded-2xl
            bg-white-00 py-2 shadow-[0_8px_24px_rgba(0,27,81,0.12)]"
        >
          {/* 전체 */}
          <li>
            <button
              type="button"
              onClick={() => handleSelect("ALL")}
              className={menuItemClass(selectedTag === "ALL")}
            >
              전체
            </button>
          </li>

          {/* Daily, Work, Others 목록 */}
          {(["Daily", "Work", "Others"] as const).map((tag) => (
            <li key={tag}>
              <button
                type="button"
                onClick={() => handleSelect(tag)}
                className={menuItemClass(selectedTag === tag)}
              >
                {/* 카테고리 색상 동그라미 인디케이터 */}
                <span
                  className={`inline-block h-2 w-2 shrink-0 rounded-full ${TAG_DOT_CLASS[tag]}`}
                />
                <span>{tag}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
