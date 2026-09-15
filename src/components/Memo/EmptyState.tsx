import plusIcon from '../../assets/icons/plus.svg';

interface EmptyStateProps {
  onAddClick?: () => void;
}

export const EmptyState = ({ onAddClick }: EmptyStateProps) => {
  return (
    <main className="empty-area">
      <button
        type="button"
        className="center-add-btn"
        aria-label="새로운 메모 작성"
        onClick={onAddClick}
      >
        <img
          src={plusIcon}
          alt="추가"
          style={{ 
            width: '36px', 
            height: '36px', 
            filter: 'brightness(0) invert(1)' 
          }}
        />
      </button>
      <p className="empty-memo-text">새로운 메모를 작성해보세요!</p>
    </main>
  );
};