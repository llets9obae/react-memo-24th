// src/constants/mockData.ts (또는 mockData.ts 위치 확인)
import type { MemoItem } from "../components/Memo/MemoCard";

export const INITIAL_MEMOS: MemoItem[] = [
  {
    id: "1",
    title: "React 스터디 계획",
    content: "Vite와 TypeScript를 사용해서 메모 앱을 리팩토링합니다.",
    category: "Daily",
    date: "20##.##.##",
    isPinned: true,
  },
  {
    id: "2",
    title: "Figma 디자인 시스템",
    content: "Color token과 Typography 규격을 확인하고 반영합니다.",
    category: "Work",
    date: "20##.##.##",
    isPinned: true,
  },
  {
    id: "3",
    title: "운동 루틴 정리",
    content: "운동 40분 및 유산소 런닝머신 20분 완료하기",
    category: "Daily",
    date: "20##.##.##",
    isPinned: false,
  },
  {
    id: "4",
    title: "코드 리뷰 피드백",
    content: "컴포넌트 분리 및 가독성 개선 방향에 대한 메모입니다.",
    category: "Work",
    date: "20##.##.##",
    isPinned: false,
  },
  {
    id: "5",
    title: "주말 장보기 목록",
    content: "우유, 계란, 사과, 닭가슴살 구매하기",
    category: "Others",
    date: "20##.##.##",
    isPinned: false,
  },
];
