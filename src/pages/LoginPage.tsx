import { useState } from "react";

interface LoginPageProps {
  onLogin?: (userId: string) => void;
}

const inputClass =
  "h-14 w-full rounded-xl border-none bg-[#FAFAFA] px-5 py-4 text-sm text-gray-07 " +
  "outline-none placeholder:text-gray-03";

const linkButtonClass =
  "cursor-pointer border-none bg-transparent p-0 text-[13px] text-gray-04";

export const LoginPage = ({ onLogin }: LoginPageProps) => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin?.(userId);
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-blue-01 px-5">
      <form onSubmit={handleSubmit} className="flex w-full max-w-[560px] flex-col gap-3">
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
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
        <button
          type="submit"
          className="h-14 w-full cursor-pointer rounded-xl border-none bg-blue-04
            text-base font-semibold text-white-00"
        >
          로그인
        </button>

        <div className="mt-8 flex items-center justify-center gap-2">
          <button type="button" className={linkButtonClass}>
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
