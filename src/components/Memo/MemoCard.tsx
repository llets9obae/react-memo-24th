import starIcon from "../../assets/icons/star.svg";
import "./MemoCard.css";

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

export const MemoCard = ({ memo, onTogglePin, onClick }: MemoCardProps) => {
  return (
    <div
      className={`memo-card ${memo.category.toLowerCase()}`}
      onClick={onClick}
    >
      <div className="card-header">
        <h3 className="card-title">{memo.title}</h3>
        <button
          type="button"
          className="star-btn"
          onClick={(e) => {
            e.stopPropagation();
            onTogglePin(memo.id);
          }}
        >
          <img
            src={starIcon}
            alt="고정 상태"
            style={{
              filter: memo.isPinned
                ? "invert(69%) sepia(87%) saturate(1450%) hue-rotate(360deg)"
                : "brightness(0) invert(1) opacity(0.4)",
            }}
          />
        </button>
      </div>

      <p className="card-content">{memo.content}</p>

      <div className="card-footer">
        <span>{memo.category}</span>
        <span>{memo.date}</span>
      </div>
    </div>
  );
};
