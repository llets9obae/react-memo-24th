import { useState, useEffect } from "react";
import "./MemoPage.css";

import { MemoToolbar } from "../components/Memo/MemoToolbar";
import type { ComponentProps } from "react";

type TagType = ComponentProps<typeof MemoToolbar>["selectedTag"];

import { EmptyState } from "../components/Memo/EmptyState";
import { MemoCard } from "../components/Memo/MemoCard";
import type { MemoItem } from "../components/Memo/MemoCard";

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

  // localStorage 자동 저장
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(memos));
  }, [memos]);

  // 고정 토글 함수
  const handleTogglePin = (id: string) => {
    setMemos((prev) =>
      prev.map((memo) =>
        memo.id === id ? { ...memo, isPinned: !memo.isPinned } : memo,
      ),
    );
  };

  // 1. 태그 필터 + 대소문자 무시 검색 적용
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

  // 2. 고정 메모리와 일반 메모리 분리 (행 분리용)
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
        <EmptyState />
      ) : (
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          {/* 고정 메모리 구역 (4열 그리드) */}
          {pinnedMemos.length > 0 && (
            <div className="memo-grid">
              {pinnedMemos.map((memo) => (
                <MemoCard
                  key={memo.id}
                  memo={memo}
                  onTogglePin={handleTogglePin}
                />
              ))}
            </div>
          )}

          {/* 일반 메모리 구역 (4열 그리드) */}
          {unpinnedMemos.length > 0 && (
            <div className="memo-grid">
              {unpinnedMemos.map((memo) => (
                <MemoCard
                  key={memo.id}
                  memo={memo}
                  onTogglePin={handleTogglePin}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
