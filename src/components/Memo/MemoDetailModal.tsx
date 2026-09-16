import type { MemoItem } from "./MemoCard";
import editIcon from "../../assets/icons/edit.svg";
import trashIcon from "../../assets/icons/trash.svg";

interface MemoDetailModalProps {
  memo: MemoItem;
  onClose: () => void;
  onDelete?: (id: string) => void;
  onEdit?: (memo: MemoItem) => void;
}

// 1. 카테고리별 모달 배경색 (MemoCard와 동일한 CSS 변수 매핑)
const CATEGORY_BACKGROUNDS: Record<string, string> = {
  Work: "var(--color-blue-06)",
  Daily: "var(--color-blue-03)",
  Others: "var(--color-gray-03)",
};

// 2. 카테고리 뱃지 내부 점(Dot) 컬러
const CATEGORY_DOT_COLORS: Record<string, string> = {
  Work: "var(--color-blue-06)",
  Daily: "var(--color-blue-03)",
  Others: "var(--color-gray-03)",
};

export const MemoDetailModal = ({
  memo,
  onClose,
  onDelete,
  onEdit,
}: MemoDetailModalProps) => {
  const modalBgColor =
    CATEGORY_BACKGROUNDS[memo.category] || "var(--color-blue-03)";
  const dotColor = CATEGORY_DOT_COLORS[memo.category] || "#FFA800";

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        backdropFilter: "blur(3px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          display: "flex",
          width: "556px",
          maxWidth: "calc(100vw -32px)",
          height: "556px",
          maxHeight: "calc(100vh -40px)",
          padding: "40px 44px",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "flex-end",
          borderRadius: "24px",
          backgroundColor: modalBgColor,
          color: "var(--color-white-00, #ffffff)",
          boxSizing: "border-box",
          boxShadow: "0 12px 32px rgba(0, 0, 0, 0.25)",
        }}
      >
        {/* 상단 및 본문 텍스트 영역 (너비 100% 채움) */}
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {/* 타이틀 & 닫기 버튼 */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: "24px",
                fontWeight: 700,
                wordBreak: "break-word",
                lineHeight: 1.3,
                flex: 1,
              }}
            >
              {memo.title}
            </h2>
            <button
              type="button"
              onClick={onClose}
              aria-label="닫기"
              style={{
                background: "none",
                border: "none",
                color: "#ffffff",
                fontSize: "28px",
                fontWeight: 600,
                cursor: "pointer",
                lineHeight: 1,
                padding: "0 0 0 16px",
              }}
            >
              ×
            </button>
          </div>

          {/* 카테고리 칩 | 날짜 메타 영역 */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                backgroundColor: "#ffffff",
                padding: "4px 12px",
                borderRadius: "20px",
                color: "var(--color-blue-05, #142B6F)",
                fontSize: "13px",
                fontWeight: 600,
              }}
            >
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: dotColor,
                }}
              />
              {memo.category}
            </div>

            <span
              style={{
                width: "1px",
                height: "16px",
                backgroundColor: "rgba(255, 255, 255, 0.4)",
              }}
            />

            <span style={{ fontSize: "13px", opacity: 0.85 }}>{memo.date}</span>
          </div>

          {/* 본문 내용 */}
          <p
            style={{
              margin: 0,
              fontSize: "15px",
              lineHeight: 1.6,
              opacity: 0.95,
              whiteSpace: "pre-wrap",
              maxHeight: "280px",
              overflowY: "auto",
              wordBreak: "break-word",
            }}
          >
            {memo.content}
          </p>
        </div>

        {/* 하단 우측 액션 버튼 (수정, 삭제) */}
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <button
            type="button"
            onClick={() => onEdit && onEdit(memo)}
            aria-label="수정"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
          >
            <img
              src={editIcon}
              alt="수정"
              style={{
                width: "20px",
                height: "20px",
                filter: "brightness(0) invert(1)",
              }}
            />
          </button>
          <button
            type="button"
            onClick={() => onDelete && onDelete(memo.id)}
            aria-label="삭제"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
          >
            <img
              src={trashIcon}
              alt="삭제"
              style={{
                width: "20px",
                height: "20px",
                filter: "brightness(0) invert(1)",
              }}
            />
          </button>
        </div>
      </div>
    </div>
  );
};
