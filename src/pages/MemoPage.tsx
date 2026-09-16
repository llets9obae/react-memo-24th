import { useState, useEffect } from "react";
import "./MemoPage.css";

import { MemoToolbar } from "../components/Memo/MemoToolbar";
import type { ComponentProps } from "react";

type TagType = ComponentProps<typeof MemoToolbar>["selectedTag"];

import { EmptyState } from "../components/Memo/EmptyState";
import { MemoCard } from "../components/Memo/MemoCard";
import type { MemoItem } from "../components/Memo/MemoCard";
import { SearchResultEmpty } from "../components/Memo/SearchResultEmpty";
import { MemoDetailModal } from "../components/Memo/MemoDetailModal"; // 👈 모달 추가

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

  // 👈 현재 열람 중인 메모 상태 (null이면 모달 닫힘)
  const [selectedMemo, setSelectedMemo] = useState<MemoItem | null>(null);

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

  // 메모 삭제 핸들러 (모달 내 휴지통 클릭 시)
  const handleDeleteMemo = (id: string) => {
    setMemos((prev) => prev.filter((memo) => memo.id !== id));
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
    <div className="memo-app-container">
      <MemoToolbar
        selectedTag={selectedTag}
        onSelectTag={setSelectedTag}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {filteredMemos.length === 0 ? (
        isFiltering ? (
          <SearchResultEmpty />
        ) : (
          <EmptyState />
        )
      ) : (
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          {pinnedMemos.length > 0 && (
            <div className="memo-grid">
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
            <div className="memo-grid">
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
          onDelete={handleDeleteMemo}
          onEdit={(memo) => alert(`수정: ${memo.title}`)}
        />
      )}
    </div>
  );
};
