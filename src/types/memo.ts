export type Category = 'Daily' | 'Work' | 'Others';

export interface Memo {
  id: number;
  title: string;
  content: string;
  category: Category;
  date: string;
  isPinned?: boolean;
}