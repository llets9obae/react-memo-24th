import { apiClient } from "./client";
import type { ApiResponse } from "../types/api";
import type { MemoDto, MemoListData, MemoRequestBody } from "../types/memo";

// 목록 UI에 페이지네이션이 없어서 한 번에 최대치(100)까지 가져온다
export const fetchMemos = async (): Promise<MemoDto[]> => {
  const res = await apiClient.get<ApiResponse<MemoListData>>("/api/memos", {
    params: { page: 0, size: 100 },
  });
  return (res.data.data as MemoListData).content;
};

export const createMemo = async (
  payload: MemoRequestBody,
): Promise<MemoDto> => {
  const res = await apiClient.post<ApiResponse<MemoDto>>(
    "/api/memos",
    payload,
  );
  return res.data.data as MemoDto;
};

// PUT은 전체 교체 방식이라 payload에 모든 필드를 항상 채워서 보내야 한다
export const updateMemo = async (
  id: number,
  payload: MemoRequestBody,
): Promise<MemoDto> => {
  const res = await apiClient.put<ApiResponse<MemoDto>>(
    `/api/memos/${id}`,
    payload,
  );
  return res.data.data as MemoDto;
};

export const deleteMemo = async (id: number): Promise<void> => {
  await apiClient.delete(`/api/memos/${id}`);
};
