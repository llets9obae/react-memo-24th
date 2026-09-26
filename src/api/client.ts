import axios, { AxiosError } from "axios";
import type { ApiErrorResponse } from "../types/api";

export const apiClient = axios.create({
  baseURL: "https://3-37-186-61.nip.io",
  headers: {
    "Content-Type": "application/json",
  },
});

// 서버 응답 자체가 없는 경우(오프라인, 서버 연결 실패 등). 요청 취소는 제외한다
export const isNetworkError = (error: unknown): boolean =>
  axios.isAxiosError(error) && !error.response && !axios.isCancel(error);

export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const data = (error as AxiosError<ApiErrorResponse>).response?.data;
    if (data?.message) return data.message;
  }
  if (isNetworkError(error)) return "네트워크 연결이 불안정합니다.";
  return "알 수 없는 오류가 발생했습니다.";
};
