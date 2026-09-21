import type { MemoItem } from "./MemoCard";
import editIcon from "../../assets/icons/edit.svg";
import trashIcon from "../../assets/icons/trash.svg";
import fieldIcon from "../../assets/icons/field.svg";

interface MemoDetailModalProps {
  memo: MemoItem;
  onClose: () => void;
  onDelete?: (id: string) => void;
  onEdit?: (memo: MemoItem) => void;
}

// 1. 카테고리별 모달 배경색 (MemoCard와 동일한 매핑)
const CATEGORY_BG_CLASS: Record<string, string> = {
  Work: "bg-blue-06",
  Daily: "bg-blue-03",
  Others: "bg-gray-02",
};

// 2. 카테고리 뱃지 내부 점(Dot) 컬러
const CATEGORY_DOT_CLASS: Record<string, string> = {
  Work: "bg-blue-06",
  Daily: "bg-blue-03",
  Others: "bg-gray-02",
};

export const MemoDetailModal = ({
  memo,
  onClose,
  onDelete,
  onEdit,
}: MemoDetailModalProps) => {
  const modalBgClass = CATEGORY_BG_CLASS[memo.category] || "bg-blue-03";
  const dotClass = CATEGORY_DOT_CLASS[memo.category] || "bg-[#FFA800]";

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[1000] flex items-center justify-center
        bg-black/40 backdrop-blur-[3px]"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`box-border flex h-[556px] w-[556px] max-h-[calc(100vh-40px)]
          max-w-[calc(100vw-32px)] flex-col items-end justify-between rounded-3xl
          px-11 py-10 text-white-00 shadow-[0_12px_32px_rgba(0,0,0,0.25)] ${modalBgClass}`}
      >
        {/* 상단 및 본문 텍스트 영역 (너비 100% 채움) */}
        <div className="flex w-full flex-col gap-5">
          {/* 타이틀 & 닫기 버튼 */}
          <div className="flex items-start justify-between">
            <h2 className="m-0 flex-1 text-2xl leading-[1.3] font-bold break-words">
              {memo.title}
            </h2>
            <button
              type="button"
              onClick={onClose}
              aria-label="닫기"
              className="cursor-pointer border-none bg-transparent pl-4 text-[28px]
                leading-none font-semibold text-white-00"
            >
              ×
            </button>
          </div>

          {/* 카테고리 칩 | 날짜 메타 영역 */}
          <div className="flex items-center gap-3">
            <div
              className="inline-flex items-center gap-2 rounded-[24px] bg-white-00
                px-4 py-1.5 text-base font-semibold text-blue-05"
            >
              <span className={`h-2.5 w-2.5 rounded-full ${dotClass}`} />
              {memo.category}
            </div>

            <img src={fieldIcon} alt="구분선" className="h-[52px] w-[3px]" />

            <span className="text-xl font-bold text-[#FAFAFA]">{memo.date}</span>
          </div>

          {/* 본문 내용 */}
          <p className="m-0 max-h-[280px] overflow-y-auto text-[15px] leading-[1.6] break-words whitespace-pre-wrap opacity-95">
            {memo.content}
          </p>
        </div>

        {/* 하단 우측 액션 버튼 (수정, 삭제) */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onEdit && onEdit(memo)}
            aria-label="수정"
            className="cursor-pointer border-none bg-transparent p-0"
          >
            <img src={editIcon} alt="수정" className="h-7 w-7 brightness-0 invert" />
          </button>
          <button
            type="button"
            onClick={() => onDelete && onDelete(memo.id)}
            aria-label="삭제"
            className="cursor-pointer border-none bg-transparent p-0"
          >
            <img src={trashIcon} alt="삭제" className="h-7 w-7 brightness-0 invert" />
          </button>
        </div>
      </div>
    </div>
  );
};
