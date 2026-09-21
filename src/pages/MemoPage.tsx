import { useState, useEffect } from "react";

import { MemoToolbar } from "../components/Memo/MemoToolbar";
import type { TagType } from "../components/Memo/TagDropdown";

import { EmptyState } from "../components/Memo/EmptyState";
import { MemoCard } from "../components/Memo/MemoCard";
import type { MemoItem } from "../components/Memo/MemoCard";
import { SearchResultEmpty } from "../components/Memo/SearchResultEmpty";
import { MemoDetailModal } from "../components/Memo/MemoDetailModal"; // 👈 모달 추가
import { ConfirmModal } from "../components/Memo/ConfirmModal"; // 👈 삭제 확인 모달 추가
import { useAuthStore } from "../store/useAuthStore";

import { INITIAL_MEMOS } from "../constants/mockData";

const STORAGE_KEY = "my_react_memos";

export const MemoPage = () => {
  const [memos, setMemos] = useState<MemoItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      } catch (error) {
        console.error("스토리지 파싱 실패:", error);
      }
    }
    return Array.isArray(INITIAL_MEMOS) ? INITIAL_MEMOS : [];
  });

  const [selectedTag, setSelectedTag] = useState<TagType>("ALL" as TagType);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMemo, setSelectedMemo] = useState<MemoItem | null>(null);
  const [memoToDelete, setMemoToDelete] = useState<MemoItem | null>(null);
  const logout = useAuthStore((state) => state.logout);

  // 👈 현재 열람 중인 메모 상태 (null이면 모달 닫힘)
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(memos));
  }, [memos]);

  const handleTogglePin = (id: string) => {
    setMemos((prev) =>
      prev.map((memo) =>
        memo.id === id ? { ...memo, isPinned: !memo.isPinned } : memo,
      ),
    );
  };

  // 메모 삭제 요청 핸들러 (모달 내 휴지통 클릭 시 삭제 확인 모달을 띄움)
  const handleRequestDeleteMemo = (id: string) => {
    const memo = memos.find((m) => m.id === id);
    if (memo) setMemoToDelete(memo);
  };

  // 삭제 확인 모달에서 삭제를 최종 확정했을 때 실행
  const handleConfirmDeleteMemo = () => {
    if (!memoToDelete) return;
    setMemos((prev) => prev.filter((memo) => memo.id !== memoToDelete.id));
    setMemoToDelete(null);
    setSelectedMemo(null);
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
          onLogoutClick={logout}
        />

        {filteredMemos.length === 0 ? (
          isFiltering ? (
            <SearchResultEmpty />
          ) : (
            <EmptyState />
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
            onEdit={(memo) => alert(`수정: ${memo.title}`)}
          />
        )}

        {/* 👈 삭제 전 한 번 더 확인하는 모달 */}
        {memoToDelete && (
          <ConfirmModal
            title="메모를 삭제할까요?"
            description={`"${memoToDelete.title}" 메모는 삭제 후 복구할 수 없어요.`}
            confirmText="삭제"
            cancelText="취소"
            onConfirm={handleConfirmDeleteMemo}
            onCancel={() => setMemoToDelete(null)}
          />
        )}
      </div>
    </div>
  );
};
