const searchIcon = new URL("../../assets/icons/search.svg", import.meta.url)
  .href;
import plusIcon from "../../assets/icons/plus.svg";
import profileIcon from "../../assets/icons/profile.svg";
import vectorIcon from "../../assets/icons/vector.svg";

interface HeaderProps {
  onAddClick?: () => void;
}

export const Header = ({ onAddClick }: HeaderProps) => {
  return (
    <header className="top-bar">
      {/* 둥근 검색창 */}
      <div className="search-container">
        <button type="button" className="tag-badge">
          <span>태그 선택</span>
          <img
            src={vectorIcon}
            alt="화살표"
            style={{
              width: "16px",
              height: "13px",
              transform: "rotate(-0deg)",
              flexShrink: 0,
            }}
          />
        </button>

        <input
          type="text"
          className="search-input"
          placeholder="원하는 메모를 검색하세요"
        />

        <button
          type="button"
          className="search-submit-btn"
          aria-label="검색"
          style={{
            width: "38.911px",
            height: "38.911px",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "none",
            background: "transparent",
            cursor: "pointer",
            padding: 0,
          }}
        >
          <img
            src={searchIcon}
            alt="검색"
            style={{
              width: "100%",
              height: "100%",
              display: "block",
              objectFit: "contain",
            }}
          />
        </button>
      </div>

      {/* 우측 상단 원형 버튼 2개 */}
      <button
        type="button"
        className="icon-btn"
        aria-label="메모 추가"
        onClick={onAddClick}
      >
        <img
          src={plusIcon}
          alt="추가"
          style={{ width: "24px", height: "24px" }}
        />
      </button>

      <button type="button" className="icon-btn" aria-label="내 계정">
        <img
          src={profileIcon}
          alt="계정"
          style={{ width: "24px", height: "24px" }}
        />
      </button>
    </header>
  );
};
