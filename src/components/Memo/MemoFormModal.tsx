import { useState } from "react";
import { TagDropdown } from "./TagDropdown";
import type { TagType } from "./TagDropdown";
import type { MemoItem } from "./MemoCard";
import fieldIcon from "../../assets/icons/field.svg";
import backIcon from "../../assets/icons/back.svg";

interface MemoFormModalProps {
  onClose: () => void;
  onSubmit: (memo: {
    title: string;
    content: string;
    category: MemoItem["category"];
    date: string;
  }) => void;
}

const CATEGORY_BG_CLASS: Record<MemoItem["category"], string> = {
  Work: "bg-blue-06",
  Daily: "bg-blue-03",
  Others: "bg-gray-02",
};

// 태그 미선택 상태의 카드 배경색
const UNSELECTED_BG_CLASS = "bg-[#DDE9FF]";

const todayISO = () => {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
};

export const MemoFormModal = ({ onClose, onSubmit }: MemoFormModalProps) => {
  const [selectedTag, setSelectedTag] = useState<TagType>("ALL");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState(todayISO);

  const isUnselected = selectedTag === "ALL";
  // 태그를 선택하지 않았을 때 저장 카테고리는 Others로 기본 처리
  const category: MemoItem["category"] = isUnselected ? "Others" : selectedTag;
  const cardBgClass = isUnselected
    ? UNSELECTED_BG_CLASS
    : CATEGORY_BG_CLASS[category];
  // 태그 미선택 상태의 글자색(placeholder·입력 텍스트 모두)
  const textColorClass = isUnselected ? "text-blue-03" : "text-white-00";
  const placeholderClass = isUnselected
    ? "placeholder:text-blue-03"
    : "placeholder:text-white/60";
  // 태그 선택 + 제목/본문 모두 채워야 작성 완료 가능
  const canSubmit =
    !isUnselected && title.trim() !== "" && content.trim() !== "";

  const handleSubmit = () => {
    if (!canSubmit) return;
    onSubmit({
      title: title.trim(),
      content: content.trim(),
      category,
      date: date.replaceAll("-", "."),
    });
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[1000] flex items-center justify-center
        bg-white-00 backdrop-blur-[3px]"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col items-start gap-3"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="뒤로가기"
          className="flex h-8 w-8 cursor-pointer items-center justify-center
            border-none bg-transparent p-0"
        >
          <img src={backIcon} alt="뒤로가기" className="h-[23px] w-[13px]" />
        </button>

        <div
          className={`box-border flex h-[480px] w-[480px] max-h-[calc(100vh-40px)]
            max-w-[calc(100vw-32px)] flex-col gap-2 overflow-hidden rounded-3xl
            pt-9 pr-8 pb-8 pl-8 shadow-[0_12px_32px_rgba(0,0,0,0.25)] ${cardBgClass}`}
        >
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요..."
            className={`w-full border-none bg-transparent text-2xl leading-[1.3]
              font-bold outline-none ${textColorClass} ${placeholderClass}`}
          />

          <div className="flex items-center gap-3">
            <TagDropdown
              selectedTag={selectedTag}
              onSelectTag={setSelectedTag}
              buttonBgClass="bg-blue-02"
            />
            <img src={fieldIcon} alt="구분선" className="h-[52px] w-[3px]" />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="cursor-pointer border-none bg-transparent text-xl
                font-bold text-[#FAFAFA] outline-none [color-scheme:light]"
            />
          </div>

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="본문을 입력하세요..."
            className={`w-full flex-1 resize-none border-none bg-transparent text-[15px]
              leading-[1.6] opacity-95 outline-none ${textColorClass} ${placeholderClass}`}
          />
        </div>

        {/* 메모 카드와 분리된 하단 액션 바 (카드와 같은 비율로 축소) */}
        <div className="mt-2 flex h-11 w-[480px] max-w-[calc(100vw-32px)] gap-3">
          <button
            type="button"
            onClick={onClose}
            className="h-full flex-1 cursor-pointer rounded-xl border-none
              bg-gray-01 text-sm font-semibold text-gray-03"
          >
            작성 취소
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!canSubmit}
            className={`h-full flex-1 cursor-pointer rounded-xl border-none text-sm
              font-semibold text-white-00 disabled:cursor-not-allowed disabled:opacity-60
              ${canSubmit ? "bg-[#1B4EF5]" : "bg-blue-03"}`}
          >
            작성 완료
          </button>
        </div>
      </div>
    </div>
  );
};
