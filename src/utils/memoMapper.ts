import type { MemoItem } from "../components/Memo/MemoCard";
import type { MemoApiCategory, MemoDto } from "../types/memo";

const API_TO_LOCAL_CATEGORY: Record<MemoApiCategory, MemoItem["category"]> = {
  DAILY: "Daily",
  WORK: "Work",
  OTHER: "Others",
};

const LOCAL_TO_API_CATEGORY: Record<MemoItem["category"], MemoApiCategory> = {
  Daily: "DAILY",
  Work: "WORK",
  Others: "OTHER",
};

export const toApiCategory = (category: MemoItem["category"]): MemoApiCategory =>
  LOCAL_TO_API_CATEGORY[category];

export const toApiDate = (date: string): string => date.replaceAll(".", "-");

export const toMemoItem = (dto: MemoDto): MemoItem => ({
  id: String(dto.id),
  title: dto.title,
  content: dto.content ?? "",
  category: API_TO_LOCAL_CATEGORY[dto.category] ?? "Others",
  date: dto.date.replaceAll("-", "."),
  isPinned: dto.isPinned,
});
