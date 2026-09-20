import plusIcon from "../../assets/icons/plus.svg";

interface EmptyStateProps {
  onAddClick?: () => void;
}

export const EmptyState = ({ onAddClick }: EmptyStateProps) => {
  return (
    <main
      className="flex h-[710px] w-full flex-col items-center justify-center gap-3
        rounded-3xl border-2 border-dashed border-blue-02 bg-transparent"
    >
      <button
        type="button"
        aria-label="새로운 메모 작성"
        onClick={onAddClick}
        className="flex h-20 w-20 cursor-pointer items-center justify-center
          rounded-full border-none bg-blue-02 transition-transform duration-150
          ease-in-out hover:scale-105"
      >
        <img src={plusIcon} alt="추가" className="h-9 w-9 brightness-0 invert" />
      </button>
      <p className="text-base leading-6 font-medium text-blue-04">
        새로운 메모를 작성해보세요!
      </p>
    </main>
  );
};
