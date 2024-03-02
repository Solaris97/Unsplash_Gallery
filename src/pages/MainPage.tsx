import React, { useEffect, useLayoutEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SearchBox from "@components/SearchBox";
import SearchImgComponent from "@components/SearchImgComponent";
import MainImgComponent from "@components/MainImgComponent";
import DetailModal from "@components/DetailModal";
import Header from "@components/Header";
import { useModal } from "@hooks/useModal";
import bgNight from "@img/bgNight.jpg";

//NOTE - 메인페이지
const MainPage: React.FC = () => {
  //쿼리가 필요 없는 조회, 쿼리가 필요 있는 조회를 나누기 위한 상태
  const [mainYnState, setMainYnState] = useState<boolean | null>(true);

  let [query, setQuery] = useSearchParams();
  const { isModalOpen, closeModal } = useModal();

  //화면 페인트전에 먼저 실행
  useLayoutEffect(() => {
    //스트링 쿼리 확인
    if (query.get("query") !== null) {
      setMainYnState(false);
    } else {
      setMainYnState(true);
    }
  }, []);

  return (
    <div className="w-full z-10">
      {/* 서브 헤더 사용 */}
      <Header subUse={true} />
      {isModalOpen && <DetailModal closeModal={closeModal} />}
      <div className="h-full">
        <div className="w-full h-28"></div>
        <div
          className="flex flex-col justify-center items-center bg-night w-full h-80 p-4 md:p-20"
          // 리액트에서 tailwindCss의 backgroundImage 지정이 불가능하여 CssInJs로 직접 설정
          style={{
            backgroundImage: `url(${bgNight})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundAttachment: "fixed",
          }}
        >
          <div className="w-full md:w-[600px] lg:w-[800px] leading-12 cursor-default">
            <p className="text-5xl font-bold text-white mb-6 ">Will Photo</p>
            <p className="mb-2 text-white">인터넷의 시각 자료 출처입니다.</p>
            <p className="text-white">
              모든 지역에 있는 크리에이터들의 지원을 받습니다.
            </p>
          </div>
          <div className="w-full md:w-[600px] lg:w-[800px] h-12 mt-6">
            <SearchBox />
          </div>
        </div>
        <div className="flex flex-col justify-center items-center w-full p-20">
          {mainYnState === true ? (
            <MainImgComponent type="main" />
          ) : (
            <SearchImgComponent />
          )}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
