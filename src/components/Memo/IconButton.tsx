import starIcon from "../../assets/icons/star.svg";
type Memo = {
  id: number;
  title: string;
  category: string;
  isPinned: boolean;
};

export const MemoCard = ({
  memo,
  onTogglePin,
}: {
  memo: Memo;
  onTogglePin: (id: number) => void;
}) => {
  return (
    <article className={`memo-card card-${memo.category.toLowerCase()}`}>
      <div className="card-header">
        <h2 className="card-title">{memo.title}</h2>
        <button
          type="button"
          className={`star-btn ${memo.isPinned ? "pinned" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            onTogglePin(memo.id);
          }}
        >
          <img src={starIcon} alt="고정" width={20} height={20} />
        </button>
      </div>
      {/* ... 나머지 본문 및 푸터 */}
    </article>
  );
};
