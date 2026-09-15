import { useState, useEffect } from 'react';
import './MemoPage.css';
import { Header } from '../components/Memo/Header';
import { EmptyState } from '../components/Memo/EmptyState';
import { MemoCard } from '../components/Memo/MemoCard';
import type { MemoItem } from '../components/Memo/MemoCard';

const STORAGE_KEY = 'my_react_memos';

const INITIAL_MEMOS: MemoItem[] = [
  { id: '1', title: '이것은 제목입니다', content: '이것은 본문입니다...', category: 'Daily', date: '20##.##.##', isPinned: true },
  { id: '2', title: '이것은 제목입니다', content: '이것은 본문입니다...', category: 'Work', date: '20##.##.##', isPinned: true },
  { id: '3', title: '이것은 제목입니다', content: '이것은 본문입니다...', category: 'Others', date: '20##.##.##', isPinned: false },
  { id: '4', title: '이것은 제목입니다', content: '이것은 본문입니다...', category: 'Daily', date: '20##.##.##', isPinned: false },
  { id: '5', title: '이것은 제목입니다', content: '이것은 본문입니다...', category: 'Work', date: '20##.##.##', isPinned: false },
  { id: '6', title: '이것은 제목입니다', content: '이것은 본문입니다...', category: 'Others', date: '20##.##.##', isPinned: false },
];

export const MemoPage = () => {
  const [memos, setMemos] = useState<MemoItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (error) {
        console.error('로컬스토리지 파싱 에러:', error);
      }
    }
    return INITIAL_MEMOS;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(memos));
  }, [memos]);

  const handleTogglePin = (targetId: string) => {
    setMemos((prevMemos) =>
      prevMemos.map((memo) =>
        memo.id === targetId ? { ...memo, isPinned: !memo.isPinned } : memo
      )
    );
  };

  // 1. 고정된 메모리와 고정되지 않은 메모리를 각각 분리
  const pinnedMemos = memos.filter((m) => m.isPinned);
  const unpinnedMemos = memos.filter((m) => !m.isPinned);

  return (
    <div className="memo-app-container">
      <Header onAddClick={() => alert('새 메모 작성')} />

      {memos.length === 0 ? (
        <EmptyState onAddClick={() => alert('새 메모 작성')} />
      ) : (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* 고정 메모리 구역 (고정 메모리가 1개 이상일 때만 노출) */}
          {pinnedMemos.length > 0 && (
            <div className="memo-grid">
              {pinnedMemos.map((memo) => (
                <MemoCard key={memo.id} memo={memo} onTogglePin={handleTogglePin} />
              ))}
            </div>
          )}

          {/* 일반 메모 구역 (고정 메모리와 같은 줄에 섞이지 않고 새 줄에서 시작) */}
          {unpinnedMemos.length > 0 && (
            <div className="memo-grid">
              {unpinnedMemos.map((memo) => (
                <MemoCard key={memo.id} memo={memo} onTogglePin={handleTogglePin} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};