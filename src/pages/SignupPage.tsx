import { useState } from "react";
import { signup } from "../api/auth";
import { getErrorMessage } from "../api/client";

interface SignupPageProps {
  onSignup?: () => void;
  onGoToLogin?: () => void;
}

const inputClass =
  "h-14 w-full rounded-xl border-none bg-[#FAFAFA] px-5 py-4 text-sm text-gray-07 " +
  "outline-none placeholder:text-gray-03";

const linkButtonClass =
  "cursor-pointer border-none bg-transparent p-0 text-[13px] text-gray-04";

export const SignupPage = ({ onSignup, onGoToLogin }: SignupPageProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isFilled =
    email.trim() !== "" && password.trim() !== "" && passwordConfirm.trim() !== "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    setError(null);
    setIsSigningUp(true);
    try {
      await signup({ email, password });
      onSignup?.();
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsSigningUp(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-blue-01 px-5">
      <form onSubmit={handleSubmit} className="flex w-full max-w-[560px] flex-col gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일을 입력하세요"
          className={inputClass}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호를 입력하세요 (8자 이상)"
          className={inputClass}
        />
        <input
          type="password"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          placeholder="비밀번호를 다시 입력하세요"
          className={inputClass}
        />

        {error && <p className="m-0 text-[13px] text-red-01">{error}</p>}

        <button
          type="submit"
          disabled={isSigningUp}
          className={`h-14 w-full cursor-pointer rounded-xl border-none text-base
            font-semibold text-white-00 transition-colors disabled:cursor-not-allowed
            disabled:opacity-60 ${isFilled ? "bg-blue-05" : "bg-blue-04"}`}
        >
          {isSigningUp ? "회원가입 중..." : "회원가입"}
        </button>

        <div className="mt-8 flex items-center justify-center gap-2">
          <span className="text-[13px] text-gray-04">이미 계정이 있으신가요?</span>
          <button type="button" onClick={onGoToLogin} className={linkButtonClass}>
            로그인
          </button>

        </div>
      </form>
    </div>
  );
};
