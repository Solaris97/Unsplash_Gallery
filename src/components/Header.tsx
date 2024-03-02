import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SubHeader from "@components/SubHeader";
import { subHeadCategoryObject } from "types/searchItemType";
import likedBlackWebp from "@icon/likedBlack.webp";
import likedBlackPng from "@icon/likedBlack.png";
import unlikedWebp from "@icon/unliked.webp";
import unlikedPng from "@icon/unliked.png";
import hamburgerIcon from "@icon/hamburgerIcon.svg";
import pictureIcon from "@icon/pictureIcon.svg";
//NOTE - 최상단 헤더
//props subUse : subHeader 컴포넌트 사용 여부
//페이지 이동을 제공 헤더
//반응형 웹 디자인을 적용하여 화면이 작은 디바이스에서는 햄버거바 호출
interface HeaderProps {
  subUse: boolean;
}
const Header: React.FC<HeaderProps> = ({ subUse }: HeaderProps) => {
  const [userName, setUserName] = useState<string>("solaris121997");
  const [userEmail, setUserEmail] = useState<string>("leejh121995@gmail.com");
  const navigate = useNavigate();

  //반응형 햄버거바 모달 상태
  const [modalState, setModalState] = useState<boolean>(false);

  //햄버거바 버튼 클릭시 모달 호출
  const handleClickHamburger = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalState === false) {
      setModalState(true);
    } else {
      setModalState(false);
    }
  };

  //메인 페이지로 이동
  const handleGoHome = () => {
    navigate("/");
  };

  //북마크 페이지로 이동
  const handleGoBookmark = () => {
    navigate("/bookmarkpage");
  };

  const handleNotImplemented = () => {
    alert("구현되지 않은 기능입니다.");
  };

  //subHeader에서 사용할 카테고리들 query를 사용해 이미지 검색
  const subHeadCategory: subHeadCategoryObject[] = [
    { query: "color", title: "단색" },
    { query: "wallpapers", title: "배경화면" },
    { query: "3d-renders", title: "3D 렌더링" },
    { query: "nature", title: "자연" },
    { query: "textures-patterns", title: "텍스처 및 패턴" },
    { query: "architecture-interior", title: "건축 및 인테리어" },
    { query: "film", title: "필름" },
    { query: "street-photography", title: "거리 사진" },
    { query: "experimental", title: "실험적인" },
  ];

  return (
    // subUse 값에 따라서 height 변경
    <div
      className={`${
        subUse
          ? "fixed flex flex-col justify-center items-center bg-white border-b  w-full h-28 z-30"
          : "fixed flex flex-col justify-center items-center bg-white border-b  w-full h-20 z-30"
      }`}
    >
      <div className="flex flex-row justify-center items-center w-full h-20 px-4 sm:px-8 py-4">
        <div className="flex flex-row justify-start md:justify-between w-full">
          {/* 로고 클릭시 메인페이지로 이동 */}
          <div className="w-30 h-10 cursor-pointer" onClick={handleGoHome}>
            <span className="font-bold text-lg w-26 h-10">GALLERY</span>
          </div>
          {/* width가 768이상일시에만 보여지고 그 아래에서는 숨김 */}
          <div className="absolute flex flex-row justify-center items-center md:static gap-6 invisible md:visible">
            {/* 미구현 기능 */}
            <div
              className="flex flex-row justify-center items-center text-gray-500 w-20 h-10 rounded-lg shadow-md bg-gray-100 cursor-pointer"
              onClick={handleNotImplemented}
            >
              <span className="w-16 h-5">사진 제출</span>
            </div>
            <div
              className="flex flex-row justify-center items-center text-white w-24 h-10 gap-2 rounded-lg shadow-md bg-gray-400 cursor-pointer"
              onClick={handleGoBookmark}
            >
              <span className="h-5">북마크</span>
              <picture>
                <source srcSet={unlikedWebp} type="image/webp" />
                <img className="w-5 h-5" src={unlikedPng} />
              </picture>
            </div>
            <div className="flex flex-row justify-center items-center text-gray-500 w-auto h-10">
              <span className="h-5">
                {userName} | {userEmail}
              </span>
            </div>
          </div>
          {/* width가 768이하일시에만 보여지고 그 이상에서는 숨김 */}
          <div className="absolute flex flex-row justify-center items-center right-6 visible md:invisible">
            <div className="w-10 h-4" onClick={handleClickHamburger}>
              <img src={hamburgerIcon} />
            </div>
          </div>

          {/* 햄버거 버튼 클릭시 활성화 */}
          {modalState && (
            <>
              <div className="fixed text-right items-end bg-white text-black w-60 h-48 right-4 shadow-md rounded-sm mt-20 z-40 visible md:invisible">
                <div className="flex justify-start items-center text-sm w-full h-12 mt-2 px-4 gap-4 rounded-md cursor-pointer hover:bg-gray-100">
                  <img className="w-8 h-8" src={pictureIcon} />
                  <span>사진 제출</span>
                </div>
                <div
                  className="flex justify-start items-center text-sm w-full h-12 px-4 gap-4 rounded-md cursor-pointer hover:bg-gray-100"
                  onClick={handleGoBookmark}
                >
                  {" "}
                  <picture>
                    <source srcSet={likedBlackWebp} type="image/webp" />
                    <img className="w-8 h-8" src={likedBlackPng} />
                  </picture>
                  <span>북마크</span>
                </div>
                <div className="flex justify-center items-center text-sm w-full h-6 mt-6 border-t">
                  <span className="h-2">{userName}</span>
                </div>
                <div className="flex justify-center items-center text-sm w-full h-4 mt-2">
                  <span className="h-2">{userEmail}</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      {subUse && (
        <div className="w-full h-8">
          {/* 서브헤더 사용시 활성화 없으면 빈공간 */}
          <SubHeader subHeadCategory={subHeadCategory} />
        </div>
      )}
    </div>
  );
};

export default Header;
