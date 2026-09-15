import { useState } from "react";
import "./MemoPage.css";
import { Header } from "../components/Memo/Header";
import { EmptyState } from "../components/Memo/EmptyState";
import { MemoCard, type MemoItem } from "../components/Memo/MemoCard";

const INITIAL_MEMOS: MemoItem[] = [
  {
    id: "1",
    title: "이것은 제목입니다",
    content: "이것은 본문입니다...",
    category: "Daily",
    date: "20##.##.##",
    isPinned: true,
  },
  {
    id: "2",
    title: "이것은 제목입니다",
    content: "이것은 본문입니다...",
    category: "Work",
    date: "20##.##.##",
    isPinned: true,
  },
  {
    id: "3",
    title: "이것은 제목입니다",
    content: "이것은 본문입니다...",
    category: "Others",
    date: "20##.##.##",
    isPinned: false,
  },
  {
    id: "4",
    title: "이것은 제목입니다",
    content: "이것은 본문입니다...",
    category: "Daily",
    date: "20##.##.##",
    isPinned: false,
  },
];

export const MemoPage = () => {
  const [memos] = useState<MemoItem[]>(INITIAL_MEMOS);

  return (
    <div className="memo-app-container">
      <Header onAddClick={() => alert("새 메모 작성")} />

      {memos.length === 0 ? (
        <EmptyState onAddClick={() => alert("새 메모 작성")} />
      ) : (
        <div className="memo-grid">
          {memos.map((memo) => (
            <MemoCard key={memo.id} memo={memo} />
          ))}
        </div>
      )}
    </div>
  );
};
