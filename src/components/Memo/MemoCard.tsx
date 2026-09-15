// src/components/Memo/MemoCard.tsx
import React from 'react';
import type { Memo } from '../../types/memo';

interface MemoCardProps {
  memo: Memo;
}

export const MemoCard: React.FC<MemoCardProps> = ({ memo }) => {
  const categoryClass = `card-${memo.category.toLowerCase()}`;

  return (
    <article className={`memo-card ${categoryClass}`}>
      <div className="card-header">
        <h2 className="card-title">{memo.title}</h2>
      </div>
      <p className="card-content">{memo.content}</p>
      <div className="card-footer">
        <span className="category-name">{memo.category}</span>
        <time className="card-date">{memo.date}</time>
      </div>
    </article>
  );
};