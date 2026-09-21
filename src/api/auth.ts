import { apiClient } from "./client";
import type { ApiResponse } from "../types/api";
import type {
  LoginRequest,
  LoginResponseData,
  SignupRequest,
  SignupResponseData,
} from "../types/auth";

export const signup = async (
  payload: SignupRequest,
): Promise<SignupResponseData> => {
  const res = await apiClient.post<ApiResponse<SignupResponseData>>(
    "/api/auth/signup",
    payload,
  );
  return res.data.data as SignupResponseData;
};

export const login = async (
  payload: LoginRequest,
): Promise<LoginResponseData> => {
  const res = await apiClient.post<ApiResponse<LoginResponseData>>(
    "/api/auth/login",
    payload,
  );
  return res.data.data as LoginResponseData;
};
