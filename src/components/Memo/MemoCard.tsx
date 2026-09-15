// src/components/Memo/MemoCard.tsx
import './MemoCard.css';
import starIcon from '../../assets/icons/star.svg';

export interface MemoItem {
  id: string;
  title: string;
  content: string;
  category: 'Work' | 'Daily' | 'Others';
  date: string;
  isPinned: boolean;
}

interface MemoCardProps {
  memo: MemoItem;
  onTogglePin: (id: string) => void;
}

export const MemoCard = ({ memo, onTogglePin }: MemoCardProps) => {
  const categoryClass = memo.category.toLowerCase();

  return (
    <article className={`memo-card ${categoryClass}`}>
      <div>
        <div className="card-header">
          <h3 className="card-title">{memo.title}</h3>
          <button
            type="button"
            className="star-btn"
            aria-label="고정 토글"
            onClick={(e) => {
              e.stopPropagation(); // 카드 클릭 이벤트와 겹치지 않게 방지
              onTogglePin(memo.id);
            }}
          >
            <img
              src={starIcon}
              alt="고정 여부"
              style={{
                width: '18px',
                height: '18px',
                /* 고정되었을 때 피그마처럼 주황/빨강으로 반전, 아닐 땐 반투명 흰색 */
                filter: memo.isPinned
                  ? 'invert(36%) sepia(85%) saturate(2200%) hue-rotate(345deg) brightness(100%) contrast(105%)'
                  : 'brightness(0) invert(1) opacity(0.5)',
                transition: 'filter 0.2s ease, transform 0.15s ease',
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