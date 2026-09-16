import searchIcon from "../../assets/icons/search.svg";

export const SearchResultEmpty = () => {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "480px",
        border: "2px dashed var(--color-blue-07)",
        borderRadius: "24px",
        backgroundColor: "transparent",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px",
        boxSizing: "border-box",
        padding: "40px 20px",
      }}
    >
      {/* 1. 남색 원형 돋보기 아이콘 */}
      <div
        style={{
          width: "64px",
          height: "64px",
          borderRadius: "50%",
          backgroundColor: "var(--color-blue-07)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <img
          src={searchIcon}
          alt="검색 결과 없음"
          style={{
            width: "28px",
            height: "28px",
            filter: "brightness(0) invert(1)", // SVG 아이콘을 흰색으로 반전
          }}
        />
      </div>

      {/* 2. 안내 텍스트 영역 */}
      <div
        style={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          gap: "6px",
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: "16px",
            fontWeight: 700,
            color: "var(--color-blue-07)",
          }}
        >
          검색 결과가 없습니다
        </p>
        <p
          style={{
            margin: 0,
            fontSize: "13px",
            fontWeight: 400,
            color: "var(--color-gray-03)",
          }}
        >
          다른 검색어로 다시 시도해보세요
        </p>
      </div>
    </div>
  );
};
