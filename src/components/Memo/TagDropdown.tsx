import { useState } from "react";
import vectorIcon from "../../assets/icons/vector.svg";

export type TagType = "ALL" | "Daily" | "Work" | "Others";

interface TagDropdownProps {
  selectedTag: TagType;
  onSelectTag: (tag: TagType) => void;
}

// 카테고리별 색상 매핑
const TAG_COLORS: Record<Exclude<TagType, "ALL">, string> = {
  Daily: "var(--color-blue-04)",
  Work: "var(--color-blue-06)",
  Others: "var(--color-gray-03)",
};

export const TagDropdown = ({ selectedTag, onSelectTag }: TagDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (tag: TagType) => {
    onSelectTag(tag);
    setIsOpen(false);
  };

  return (
    <div style={{ position: "relative" }}>
      {/* 1. 상단 태그 선택 버튼 */}
      <button
        type="button"
        className="tag-badge"
        onClick={() => setIsOpen((prev) => !prev)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          backgroundColor: "var(--color-blue-01)",
          padding: "6px 14px",
          borderRadius: "20px",
          border: "none",
          cursor: "pointer",
        }}
      >
        {selectedTag === "ALL" ? (
          <>
            <span
              style={{
                fontSize: "15px",
                fontWeight: 600,
                color: "var(--color-blue-07)",
              }}
            >
              태그 선택
            </span>
            <img
              src={vectorIcon}
              alt="화살표"
              style={{
                width: "16px",
                height: "13px",
                /* 닫혔을 때 0deg(오른쪽), 열렸을 때 90deg(아래) */
                transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                transition: "transform 0.2s ease",
                flexShrink: 0,
              }}
            />
          </>
        ) : (
          <>
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: TAG_COLORS[selectedTag],
                display: "inline-block",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: "15px",
                fontWeight: 600,
                color: "var(--color-blue-07)",
              }}
            >
              {selectedTag}
            </span>
            <img
              src={vectorIcon}
              alt="화살표"
              style={{
                width: "16px",
                height: "13px",
                transform: isOpen ? "rotate(0deg)" : "rotate(0deg)",
                transition: "transform 0.2s ease",
                flexShrink: 0,
              }}
            />
          </>
        )}
      </button>

      {/* 2. 드롭다운 메뉴 (색상 동그라미 포함) */}
      {isOpen && (
        <ul
          style={{
            position: "absolute",
            top: "48px",
            left: 0,
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            boxShadow: "0 8px 24px rgba(0, 27, 81, 0.12)",
            listStyle: "none",
            padding: "8px 0",
            zIndex: 100,
            minWidth: "130px",
          }}
        >
          {/* 전체 해제 */}
          <li>
            <button
              type="button"
              onClick={() => handleSelect("ALL")}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 16px",
                border: "none",
                background:
                  selectedTag === "ALL"
                    ? "var(--color-blue-01)"
                    : "transparent",
                color:
                  selectedTag === "ALL"
                    ? "var(--color-blue-05)"
                    : "var(--color-blue-07)",
                fontWeight: selectedTag === "ALL" ? 600 : 400,
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              전체 해제
            </button>
          </li>

          {/* Daily, Work, Others 목록 */}
          {(["Daily", "Work", "Others"] as const).map((tag) => (
            <li key={tag}>
              <button
                type="button"
                onClick={() => handleSelect(tag)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "10px 16px",
                  border: "none",
                  background:
                    selectedTag === tag
                      ? "var(--color-blue-01)"
                      : "transparent",
                  color:
                    selectedTag === tag
                      ? "var(--color-blue-05)"
                      : "var(--color-blue-07)",
                  fontWeight: selectedTag === tag ? 600 : 400,
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                {/* 카테고리 색상 동그라미 인디케이터 */}
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: TAG_COLORS[tag],
                    display: "inline-block",
                    flexShrink: 0,
                  }}
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
