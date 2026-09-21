import axios, { AxiosError } from "axios";
import type { ApiErrorResponse } from "../types/api";

export const apiClient = axios.create({
  baseURL: "https://3-37-186-61.nip.io",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const data = (error as AxiosError<ApiErrorResponse>).response?.data;
    if (data?.message) return data.message;
  }
  return "알 수 없는 오류가 발생했습니다.";
};
