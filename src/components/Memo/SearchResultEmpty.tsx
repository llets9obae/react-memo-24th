import searchIcon from "../../assets/icons/search.svg";

export const SearchResultEmpty = () => {
  return (
    <div
      className="box-border flex min-h-[480px] w-full flex-col items-center
        justify-center gap-4 rounded-3xl border-2 border-dashed border-blue-07
        bg-transparent px-5 py-10"
    >
      {/* 1. 남색 원형 돋보기 아이콘 */}
      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-blue-07">
        <img
          src={searchIcon}
          alt="검색 결과 없음"
          className="h-7 w-7 brightness-0 invert"
        />
      </div>

      {/* 2. 안내 텍스트 영역 */}
      <div className="flex flex-col gap-1.5 text-center">
        <p className="m-0 text-base font-bold text-blue-07">
          검색 결과가 없습니다
        </p>
        <p className="m-0 text-[13px] font-normal text-gray-03">
          다른 검색어로 다시 시도해보세요
        </p>
      </div>
    </div>
  );
};
