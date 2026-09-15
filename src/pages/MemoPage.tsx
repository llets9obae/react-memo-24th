import { useState, useEffect } from 'react';
import './MemoPage.css';
import { MemoToolbar } from '../components/Memo/MemoToolbar';
import type { TagType } from '../components/Memo/TagDropdown';
import { EmptyState } from '../components/Memo/EmptyState';
import { MemoCard, type MemoItem } from '../components/Memo/MemoCard';

const STORAGE_KEY = 'my_react_memos';

const INITIAL_MEMOS: MemoItem[] = [
  { id: '1', title: '이것은 제목입니다', content: '이것은 본문입니다...', category: 'Daily', date: '20##.##.##', isPinned: true },
  { id: '2', title: '이것은 제목입니다', content: '이것은 본문입니다...', category: 'Work', date: '20##.##.##', isPinned: true },
  { id: '3', title: '이것은 제목입니다', content: '이것은 본문입니다...', category: 'Others', date: '20##.##.##', isPinned: false },
  { id: '4', title: '이것은 제목입니다', content: '이것은 본문입니다...', category: 'Daily', date: '20##.##.##', isPinned: false },
];

export const MemoPage = () => {
  const [memos, setMemos] = useState<MemoItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (error) {
        console.error('스토리지 파싱 실패:', error);
      }
    }
    return INITIAL_MEMOS;
  });

  const [selectedTag, setSelectedTag] = useState<TagType>('ALL');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(memos));
  }, [memos]);

  const handleTogglePin = (targetId: string) => {
    setMemos((prev) =>
      prev.map((memo) => (memo.id === targetId ? { ...memo, isPinned: !memo.isPinned } : memo))
    );
  };

  const filteredMemos = memos.filter((memo) =>
    selectedTag === 'ALL' ? true : memo.category === selectedTag
  );

  const pinnedMemos = filteredMemos.filter((m) => m.isPinned);
  const unpinnedMemos = filteredMemos.filter((m) => !m.isPinned);

  return (
    <div className="memo-app-container">
      <MemoToolbar
        selectedTag={selectedTag}
        onSelectTag={setSelectedTag}
        onAddClick={() => alert('새 메모 작성')}
      />

      {filteredMemos.length === 0 ? (
        <EmptyState onAddClick={() => alert('새 메모 작성')} />
      ) : (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {pinnedMemos.length > 0 && (
            <div className="memo-grid">
              {pinnedMemos.map((memo) => (
                <MemoCard key={memo.id} memo={memo} onTogglePin={handleTogglePin} />
              ))}
            </div>
          )}

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