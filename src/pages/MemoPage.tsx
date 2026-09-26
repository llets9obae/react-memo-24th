import { useState, useEffect, useCallback } from "react";

import { MemoToolbar } from "../components/Memo/MemoToolbar";
import type { TagType } from "../components/Memo/TagDropdown";

import { EmptyState } from "../components/Memo/EmptyState";
import { MemoCard } from "../components/Memo/MemoCard";
import type { MemoItem } from "../components/Memo/MemoCard";
import { SearchResultEmpty } from "../components/Memo/SearchResultEmpty";
import { MemoDetailModal } from "../components/Memo/MemoDetailModal"; // 👈 모달 추가
import { ConfirmModal } from "../components/Memo/ConfirmModal"; // 👈 삭제 확인 모달 추가
import { MemoFormModal } from "../components/Memo/MemoFormModal"; // 👈 메모 작성 모달 추가
import { fetchMemos, createMemo, updateMemo, deleteMemo } from "../api/memos";
import { getErrorMessage } from "../api/client";
import { toApiCategory, toMemoItem } from "../utils/memoMapper";

interface MemoPageProps {
  onProfileClick: () => void;
}

export const MemoPage = ({ onProfileClick }: MemoPageProps) => {
  const [memos, setMemos] = useState<MemoItem[]>([]);
  const [isLoadingMemos, setIsLoadingMemos] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [selectedTag, setSelectedTag] = useState<TagType>("ALL" as TagType);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMemo, setSelectedMemo] = useState<MemoItem | null>(null);
  const [memoToDelete, setMemoToDelete] = useState<MemoItem | null>(null);
  const [showDeleteComplete, setShowDeleteComplete] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [isCreatingMemo, setIsCreatingMemo] = useState(false);
  const [editingMemo, setEditingMemo] = useState<MemoItem | null>(null);

  // 로그인 직후 메모 목록을 서버에서 불러온다
  // (setState 호출은 전부 await 이후에만 일어나도록 해서, 마운트 이펙트에서
  // 동기적으로 setState하는 것으로 오인되지 않게 한다)
  const loadMemos = useCallback(async () => {
    try {
      const dtos = await fetchMemos();
      setMemos(dtos.map(toMemoItem));
      setLoadError(null);
    } catch (err) {
      setLoadError(getErrorMessage(err));
    } finally {
      setIsLoadingMemos(false);
    }
  }, []);

  useEffect(() => {
    // 마운트 시 서버에서 메모 목록을 가져오는 표준적인 데이터 패칭 패턴.
    // setState는 fetch 완료 후(await 이후)에만 일어나지만, 컴파일러 린트 규칙이
    // 이런 패턴 자체를 과잉 탐지하므로 이 한 줄만 예외 처리한다.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadMemos();
  }, [loadMemos]);

  // "다시 시도" 버튼 클릭 시에는 로딩 상태를 다시 켜고 재요청한다
  const handleRetryLoad = () => {
    setIsLoadingMemos(true);
    loadMemos();
  };

  // 별표(고정) 클릭 시 즉시 반영하고, 서버 반영이 실패하면 되돌린다
  const handleTogglePin = async (id: string) => {
    const target = memos.find((m) => m.id === id);
    if (!target) return;
    const nextPinned = !target.isPinned;

    setMemos((prev) =>
      prev.map((memo) =>
        memo.id === id ? { ...memo, isPinned: nextPinned } : memo,
      ),
    );

    try {
      await updateMemo(Number(id), {
        title: target.title,
        content: target.content,
        category: toApiCategory(target.category),
        isPinned: nextPinned,
      });
    } catch {
      // 실패 시 낙관적 업데이트 되돌리기
      setMemos((prev) =>
        prev.map((memo) =>
          memo.id === id ? { ...memo, isPinned: target.isPinned } : memo,
        ),
      );
    }
  };

  // 메모 삭제 요청 핸들러 (모달 내 휴지통 클릭 시 삭제 확인 모달을 띄움)
  const handleRequestDeleteMemo = (id: string) => {
    const memo = memos.find((m) => m.id === id);
    if (memo) setMemoToDelete(memo);
  };

  // 삭제 확인 모달에서 삭제를 최종 확정했을 때 실행
  const handleConfirmDeleteMemo = async () => {
    if (!memoToDelete) return;
    try {
      await deleteMemo(Number(memoToDelete.id));
      setMemos((prev) => prev.filter((memo) => memo.id !== memoToDelete.id));
      setMemoToDelete(null);
      setSelectedMemo(null);
      setShowDeleteComplete(true);
    } catch (err) {
      setMemoToDelete(null);
      setDeleteError(getErrorMessage(err));
    }
  };

  // 새 메모 작성 완료 시 서버에 저장하고 목록 맨 앞에 추가
  const handleAddMemo = async (memo: {
    title: string;
    content: string;
    category: MemoItem["category"];
    date: string;
  }) => {
    const dto = await createMemo({
      title: memo.title,
      content: memo.content,
      category: toApiCategory(memo.category),
      isPinned: false,
    });
    setMemos((prev) => [toMemoItem(dto), ...prev]);
  };

  // 메모 수정 완료 시 서버에 저장하고 기존 메모를 새 값으로 교체
  // PUT은 전체 교체 방식이라 고정 여부는 기존 값을 그대로 유지해서 보낸다
  const handleEditMemo = async (memo: {
    title: string;
    content: string;
    category: MemoItem["category"];
    date: string;
  }) => {
    if (!editingMemo) return;
    const dto = await updateMemo(Number(editingMemo.id), {
      title: memo.title,
      content: memo.content,
      category: toApiCategory(memo.category),
      isPinned: editingMemo.isPinned,
    });
    setMemos((prev) =>
      prev.map((m) => (m.id === editingMemo.id ? toMemoItem(dto) : m)),
    );
  };

  const isFiltering = searchQuery.trim() !== "" || selectedTag !== "ALL";

  const filteredMemos = memos.filter((memo) => {
    const matchesTag =
      selectedTag === "ALL" ||
      memo.category.toLowerCase() === (selectedTag as string).toLowerCase();

    const query = searchQuery.trim().toLowerCase();
    const matchesQuery =
      query === "" ||
      memo.title.toLowerCase().includes(query) ||
      memo.content.toLowerCase().includes(query);

    return matchesTag && matchesQuery;
  });

  const pinnedMemos = filteredMemos.filter((m) => m.isPinned);
  const unpinnedMemos = filteredMemos.filter((m) => !m.isPinned);

  return (
    <div className="flex min-h-screen w-full flex-col items-center px-5 py-[100px]">
      <div
        className="box-border flex w-full max-w-[1280px] flex-col items-center gap-10 px-10 pt-[60px] pb-20
          max-[1240px]:gap-8 max-[1240px]:px-6 max-[1240px]:py-10
          max-[640px]:gap-6 max-[640px]:px-4 max-[640px]:py-6"
      >
        <MemoToolbar
          selectedTag={selectedTag}
          onSelectTag={setSelectedTag}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onAddClick={() => setIsCreatingMemo(true)}
          onProfileClick={onProfileClick}
        />

        {isLoadingMemos ? (
          <p className="py-20 text-center text-base text-blue-06">
            메모를 불러오는 중...
          </p>
        ) : loadError ? (
          <div className="flex flex-col items-center gap-4 py-20">
            <p className="m-0 text-base text-red-01">{loadError}</p>
            <button
              type="button"
              onClick={handleRetryLoad}
              className="cursor-pointer rounded-xl border-none bg-blue-05
                px-5 py-2.5 text-sm font-semibold text-white-00"
            >
              다시 시도
            </button>
          </div>
        ) : memos.length === 0 ? (
          <EmptyState onAddClick={() => setIsCreatingMemo(true)} />
        ) : filteredMemos.length === 0 ? (
          isFiltering ? (
            <SearchResultEmpty />
          ) : (
            <EmptyState onAddClick={() => setIsCreatingMemo(true)} />
          )
        ) : (
          <div className="flex w-full flex-col gap-6">
            {pinnedMemos.length > 0 && (
              <div
                className="grid w-full grid-cols-[repeat(4,285px)] justify-center gap-5
                  max-[1240px]:grid-cols-[repeat(2,285px)]
                  max-[640px]:max-w-[340px] max-[640px]:grid-cols-[minmax(0,1fr)]"
              >
                {pinnedMemos.map((memo) => (
                  <MemoCard
                    key={memo.id}
                    memo={memo}
                    onTogglePin={handleTogglePin}
                    onClick={() => setSelectedMemo(memo)} // 👈 카드 클릭 시 모달 열기
                  />
                ))}
              </div>
            )}

            {unpinnedMemos.length > 0 && (
              <div
                className="grid w-full grid-cols-[repeat(4,285px)] justify-center gap-5
                  max-[1240px]:grid-cols-[repeat(2,285px)]
                  max-[640px]:max-w-[340px] max-[640px]:grid-cols-[minmax(0,1fr)]"
              >
                {unpinnedMemos.map((memo) => (
                  <MemoCard
                    key={memo.id}
                    memo={memo}
                    onTogglePin={handleTogglePin}
                    onClick={() => setSelectedMemo(memo)} // 👈 카드 클릭 시 모달 열기
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* 👈 상세 뷰 모달 렌더링 */}
        {selectedMemo && (
          <MemoDetailModal
            memo={selectedMemo}
            onClose={() => setSelectedMemo(null)}
            onDelete={handleRequestDeleteMemo}
            onEdit={(memo) => {
              setSelectedMemo(null);
              setEditingMemo(memo);
            }}
          />
        )}

        {/* 👈 삭제 전 한 번 더 확인하는 모달 */}
        {memoToDelete && (
          <ConfirmModal
            title="메모를 삭제 하시겠습니까?"
            description="삭제된 메모는 휴지통에서 확인 가능합니다."
            confirmText="삭제"
            cancelText="취소"
            onConfirm={handleConfirmDeleteMemo}
            onCancel={() => setMemoToDelete(null)}
          />
        )}

        {/* 👈 삭제 완료 안내 모달 */}
        {showDeleteComplete && (
          <ConfirmModal
            title="해당 메모가 삭제되었습니다"
            description="삭제된 메모는 휴지통에서 확인 가능합니다."
            confirmText="확인"
            onConfirm={() => setShowDeleteComplete(false)}
          />
        )}

        {/* 👈 삭제 실패 안내 모달 */}
        {deleteError && (
          <ConfirmModal
            title="삭제에 실패했습니다"
            description={deleteError}
            confirmText="확인"
            onConfirm={() => setDeleteError(null)}
          />
        )}

        {/* 👈 메모 작성 모달 */}
        {isCreatingMemo && (
          <MemoFormModal
            onClose={() => setIsCreatingMemo(false)}
            onSubmit={handleAddMemo}
          />
        )}

        {/* 👈 메모 수정 모달 (작성 모달 재사용) */}
        {editingMemo && (
          <MemoFormModal
            initialMemo={editingMemo}
            submitLabel="수정 완료"
            onClose={() => setEditingMemo(null)}
            onSubmit={handleEditMemo}
          />
        )}
      </div>
    </div>
  );
};
