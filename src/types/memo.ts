export type MemoApiCategory = "DAILY" | "WORK" | "OTHER";

export interface MemoDto {
  id: number;
  title: string;
  content: string | null;
  date: string;
  category: MemoApiCategory;
  isPinned: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MemoListData {
  content: MemoDto[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

export interface MemoRequestBody {
  title: string;
  content: string;
  date: string;
  category: MemoApiCategory;
  isPinned: boolean;
}
