interface ConfirmModalProps {
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

// 삭제 등 되돌리기 어려운 액션을 실행하기 전에 한 번 더 확인받는 공용 모달
export const ConfirmModal = ({
  title,
  description,
  confirmText = "확인",
  cancelText = "취소",
  onConfirm,
  onCancel,
}: ConfirmModalProps) => {
  return (
    <div
      onClick={onCancel}
      className="fixed inset-0 z-[1100] flex items-center justify-center
        bg-black/40 backdrop-blur-[3px]"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex w-80 max-w-[calc(100vw-32px)] flex-col gap-2 rounded-[20px]
          bg-white-00 p-7 shadow-[0_12px_32px_rgba(0,0,0,0.25)]"
      >
        <h3 className="m-0 text-lg font-bold text-gray-07">{title}</h3>

        {description && (
          <p className="m-0 text-sm leading-[1.5] text-gray-04">{description}</p>
        )}

        <div className="mt-4 flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="cursor-pointer rounded-[10px] border border-gray-01
              bg-white-00 px-4 py-2 text-sm font-semibold text-gray-06"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="cursor-pointer rounded-[10px] border-none bg-red-01
              px-4 py-2 text-sm font-semibold text-white-00"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};
