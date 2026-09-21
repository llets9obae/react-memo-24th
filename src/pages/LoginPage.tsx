import { useState } from "react";
import { login } from "../api/auth";
import { getErrorMessage } from "../api/client";
import { useAuthStore } from "../store/useAuthStore";

interface LoginPageProps {
  onLogin?: () => void;
  onGoToSignup?: () => void;
}

const inputClass =
  "h-14 w-full rounded-xl border-none bg-[#FAFAFA] px-5 py-4 text-sm text-gray-07 " +
  "outline-none placeholder:text-gray-03";

const linkButtonClass =
  "cursor-pointer border-none bg-transparent p-0 text-[13px] text-gray-04";

export const LoginPage = ({ onLogin, onGoToSignup }: LoginPageProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const isFilled = email.trim() !== "" && password.trim() !== "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoggingIn(true);
    try {
      const { accessToken } = await login({ email, password });
      setAccessToken(accessToken);
      onLogin?.();
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-blue-01 px-5">
      <form onSubmit={handleSubmit} className="flex w-full max-w-[560px] flex-col gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="아이디를 입력하세요"
          className={inputClass}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호를 입력하세요"
          className={inputClass}
        />

        {error && <p className="m-0 text-[13px] text-red-01">{error}</p>}

        <button
          type="submit"
          disabled={isLoggingIn}
          className={`h-14 w-full cursor-pointer rounded-xl border-none text-base
            font-semibold text-white-00 transition-colors disabled:cursor-not-allowed
            disabled:opacity-60 ${isFilled ? "bg-blue-05" : "bg-blue-04"}`}
        >
          로그인
        </button>

        <div className="mt-8 flex items-center justify-center gap-2">
          <button type="button" onClick={onGoToSignup} className={linkButtonClass}>
            회원가입
          </button>
          <span className="text-[13px] text-gray-03">|</span>
          <button type="button" className={linkButtonClass}>
            아이디 찾기
          </button>
          <span className="text-[13px] text-gray-03">|</span>
          <button type="button" className={linkButtonClass}>
            비밀번호 찾기
          </button>
        </div>
      </form>
    </div>
  );
};
