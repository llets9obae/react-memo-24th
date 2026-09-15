// src/components/Memo/MemoCard.tsx
import "./MemoCard.css";
import starIcon from "../../assets/icons/star.svg";

export interface MemoItem {
  id: string;
  title: string;
  content: string;
  category: "Work" | "Daily" | "Others";
  date: string;
  isPinned: boolean;
}

interface MemoCardProps {
  memo: MemoItem;
}

export const MemoCard = ({ memo }: MemoCardProps) => {
  const categoryClass = memo.category.toLowerCase();

  return (
    <article className={`memo-card ${categoryClass}`}>
      <div>
        <div className="card-header">
          <h3 className="card-title">{memo.title}</h3>
          <button type="button" className="star-btn" aria-label="고정">
            <img
              src={starIcon}
              alt="별"
              style={{
                width: "18px",
                height: "18px",
                filter: memo.isPinned
                  ? "brightness(0) invert(1)"
                  : "opacity(0.4)",
              }}
            />
          </button>
        </div>
        <p className="card-content">{memo.content}</p>
      </div>

      <div className="card-footer">
        <span>{memo.category}</span>
        <span>{memo.date}</span>
      </div>
    </article>
  );
};
