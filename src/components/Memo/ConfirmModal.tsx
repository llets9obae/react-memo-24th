interface ConfirmModalProps {
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
}

// 삭제 등 사용자 액션을 한 번 더 확인받거나 결과를 안내하는 공용 모달.
// onCancel이 없으면 확인 버튼 하나만 있는 안내 모달로 렌더링된다.
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
      onClick={onCancel ?? onConfirm}
      className="fixed inset-0 z-[1100] flex items-center justify-center
        bg-black/40 backdrop-blur-[3px]"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex w-[360px] max-w-[calc(100vw-32px)] flex-col items-center gap-2
          rounded-3xl bg-white-00 px-7 py-8 text-center shadow-[0_12px_32px_rgba(0,0,0,0.25)]"
      >
        <h3 className="m-0 text-lg font-bold text-gray-07">{title}</h3>

        {description && (
          <p className="m-0 text-sm leading-[1.5] text-gray-04">{description}</p>
        )}

        <div className="mt-5 flex w-full gap-2">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="h-12 flex-1 cursor-pointer rounded-xl border-none
                bg-gray-01 text-sm font-semibold text-gray-06"
            >
              {cancelText}
            </button>
          )}
          <button
            type="button"
            onClick={onConfirm}
            className="h-12 flex-1 cursor-pointer rounded-xl border-none
              bg-blue-05 text-sm font-semibold text-white-00"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};
