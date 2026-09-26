import { create } from "zustand";
import { apiClient, isNetworkError } from "../api/client";

interface NetworkState {
  hasNetworkError: boolean;
  showNetworkError: () => void;
  dismissNetworkError: () => void;
}

// 어느 화면의 API 요청이든 네트워크 오류가 나면 App이 공통 안내 모달을 띄운다.
export const useNetworkStore = create<NetworkState>()((set) => ({
  hasNetworkError: false,
  showNetworkError: () => set({ hasNetworkError: true }),
  dismissNetworkError: () => set({ hasNetworkError: false }),
}));

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (isNetworkError(error)) {
      useNetworkStore.getState().showNetworkError();
    }
    return Promise.reject(error);
  },
);
