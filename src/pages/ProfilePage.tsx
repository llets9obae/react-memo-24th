import backIcon from "../assets/icons/back.svg";
import editIcon from "../assets/icons/edit.svg";
import trashIcon from "../assets/icons/trash.svg";
import profileIcon from "../assets/icons/profile.svg";
import { useAuthStore } from "../store/useAuthStore";

interface ProfilePageProps {
  onBack: () => void;
}

const menuBtnClass =
  "flex h-11 w-full cursor-pointer items-center gap-3 rounded-lg border-none " +
  "bg-[#FAFAFA] px-4 text-left text-xs font-bold text-blue-07 " +
  "shadow-[0_2px_4px_rgba(0,27,81,0.15)]";

export const ProfilePage = ({ onBack }: ProfilePageProps) => {
  const email = useAuthStore((state) => state.email);
  const logout = useAuthStore((state) => state.logout);
  const nickname = email?.split("@")[0] || "닉네임";

  return (
    <div className="relative flex min-h-screen w-full justify-center bg-blue-01 px-5">
      <button
        type="button"
        onClick={onBack}
        aria-label="뒤로가기"
        className="absolute top-[72px] left-[max(24px,calc(50%-450px))] flex h-8 w-8
          cursor-pointer items-center justify-center border-none bg-transparent p-0"
      >
        <img src={backIcon} alt="뒤로가기" className="h-[23px] w-[13px]" />
      </button>

      <main className="flex w-full max-w-[376px] flex-col items-center pt-[200px] max-[640px]:pt-[140px]">
        <div className="mb-8 flex items-center gap-6 self-center">
          <div className="flex h-[126px] w-[126px] shrink-0 items-center justify-center rounded-full bg-[#FAFAFA]">
            <img src={profileIcon} alt="프로필" className="h-[52px] w-[52px]" />
          </div>
          <div className="flex min-w-0 flex-col gap-1">
            <div className="flex items-center gap-2">
              <h1 className="m-0 truncate text-[32px] leading-[1.2] font-extrabold text-blue-07">
                {nickname}
              </h1>
              <button
                type="button"
                aria-label="닉네임 수정"
                className="flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center border-none bg-transparent p-0"
              >
                <img
                  src={editIcon}
                  alt=""
                  className="h-5 w-5 [filter:brightness(0)_saturate(100%)_invert(8%)_sepia(60%)_saturate(3000%)_hue-rotate(215deg)]"
                />
              </button>
            </div>
            <p className="m-0 truncate text-xl text-gray-04">{email}</p>
          </div>
        </div>

        <div className="flex w-full flex-col gap-3">
          <button type="button" className={menuBtnClass}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path
                d="M2 5h1.5M7 5h11M2 10h1.5M7 10h11M2 15h1.5M7 15h11"
                stroke="#001B51"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            태그 관리
          </button>
          <button type="button" className={menuBtnClass}>
            <img
              src={trashIcon}
              alt=""
              className="h-5 w-5 [filter:brightness(0)_saturate(100%)_invert(8%)_sepia(60%)_saturate(3000%)_hue-rotate(215deg)]"
            />
            휴지통
          </button>
        </div>

        <button
          type="button"
          onClick={() => {
            logout();
            onBack();
          }}
          className="mt-10 cursor-pointer border-none bg-transparent text-sm
            text-gray-03 underline underline-offset-4"
        >
          로그아웃
        </button>
      </main>
    </div>
  );
};
