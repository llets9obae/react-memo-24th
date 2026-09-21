import { create } from "zustand";
import { persist } from "zustand/middleware";
import { apiClient } from "../api/client";

interface AuthState {
  accessToken: string | null;
  setAccessToken: (token: string) => void;
  logout: () => void;
}

// 여러 컴포넌트(App, axios 인터셉터, 메모 페이지 등)가 함께 읽어야 하는
// accessToken만 전역 상태로 둔다. 로그인/회원가입 폼의 로딩·에러 상태는
// 해당 폼 컴포넌트만 쓰므로 각 페이지의 지역 상태(useState)로 관리한다.
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      setAccessToken: (token) => set({ accessToken: token }),
      logout: () => set({ accessToken: null }),
    }),
    { name: "auth-storage" },
  ),
);

apiClient.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  },
);
