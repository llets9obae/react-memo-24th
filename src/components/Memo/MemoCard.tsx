import starIcon from "../../assets/icons/star.svg";

export interface MemoItem {
  id: string;
  title: string;
  content: string;
  category: "Daily" | "Work" | "Others";
  date: string;
  isPinned: boolean;
}

interface MemoCardProps {
  memo: MemoItem;
  onTogglePin: (id: string) => void;
  onClick?: () => void; // 👈 카드 클릭 핸들러 추가
}

const CATEGORY_BG_CLASS: Record<MemoItem["category"], string> = {
  Work: "bg-blue-06",
  Daily: "bg-blue-03",
  Others: "bg-gray-03",
};

export const MemoCard = ({ memo, onTogglePin, onClick }: MemoCardProps) => {
  return (
    <div
      className={`flex h-[285px] w-[285px] max-w-full cursor-pointer flex-col justify-between rounded-[20px]
        px-6 pt-[25px] pb-7 text-white-00 shadow-[0px_4px_12px_rgba(0,0,0,0.05)]
        transition duration-150 ease-in-out
        hover:-translate-y-1 hover:shadow-[0px_8px_20px_rgba(0,0,0,0.12)]
        ${CATEGORY_BG_CLASS[memo.category]}`}
      onClick={onClick}
    >
      <div className="flex w-full items-center justify-between">
        <h3 className="m-0 flex-1 truncate text-lg font-bold text-white-00">
          {memo.title}
        </h3>
        <button
          type="button"
          className="flex shrink-0 items-center justify-center border-none bg-transparent p-0 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            onTogglePin(memo.id);
          }}
        >
          <img
            src={starIcon}
            alt="고정 상태"
            className={
              memo.isPinned
                ? "[filter:invert(69%)_sepia(87%)_saturate(1450%)_hue-rotate(360deg)]"
                : "brightness-0 invert opacity-40"
            }
          />
        </button>
      </div>

      <p className="my-3.5 line-clamp-6 flex-1 text-sm leading-[1.55] break-words text-white/90">
        {memo.content}
      </p>

      <div className="flex w-full items-center justify-between text-[13px] text-white-00 opacity-[0.85]">
        <span>{memo.category}</span>
        <span>{memo.date}</span>
      </div>
    </div>
  );
};
