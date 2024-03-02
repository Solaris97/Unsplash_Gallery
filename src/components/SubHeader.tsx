import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useIsOverflow } from "@hooks/useScroll";
import arrow from "@icon/arrow.svg";
import { subHeadCategoryObject } from "types/searchItemType";

//NOTE - 서브헤더
//props subHeadCategory
//categoryList : 수평스크롤에서 보여 줄 아이템 리스트
interface Props {
  subHeadCategory: subHeadCategoryObject[];
}

const SubHeader = ({ subHeadCategory }: Props) => {
  const horizontalScrollRef = useRef<HTMLUListElement>(null);
  const navigate = useNavigate();

  //수평스크롤 영역에 스크롤바가 생겼는지 확인하는 customhooks
  const isOverflow: boolean = useIsOverflow({ ref: horizontalScrollRef });
  //이전,다음 버튼 화면 표시 여부 customhooks

  let [query, setQuery] = useSearchParams();

  //focusing이 없다면 초기 값을 메인페이지로 설정정
  const [focusing, setFocusing] = useState<string>(
    query.get("query") || "main"
  );

  const staticList: subHeadCategoryObject[] = [
    { query: "main", title: "보도/편집 전용" },
    { query: "following", title: "팔로잉" },
    { query: "will photo", title: "WILL Photo+" },
  ];

  //nextType이 next이면 수평 스크롤 오른쪽으로 이동, prev면 수평 스크롤 왼쪽으로 이동
  const handleNextButtonClick = (nextType: string): void => {
    if (!horizontalScrollRef.current) return;
    if (nextType === "prev") {
      horizontalScrollRef.current.scrollTo({
        left:
          horizontalScrollRef.current.scrollLeft -
          horizontalScrollRef.current.offsetWidth,
        behavior: "smooth",
      });
    } else {
      horizontalScrollRef.current.scrollTo({
        left:
          horizontalScrollRef.current.scrollLeft +
          horizontalScrollRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  //서브헤더의 아이템 클릭시 해당 아이템의 쿼리로 검색
  const handleSubHeaderClick = (e: React.MouseEvent<HTMLLIElement>): void => {
    navigate(`/mainpage?page=1&query=${e.currentTarget.id}`);
    window.location.reload();
  };

  return (
    <div className="absolute flex flex-row justify-start items-center w-full h-8 px-8">
      {isOverflow === true && (
        <button
          className="absolute flex flex-row justify-center items-center w-6 h-6 bottom-2 left-2"
          onClick={() => {
            handleNextButtonClick("prev");
          }}
        >
          <img className="rotate-180" src={arrow} alt="prev" />
        </button>
      )}

      {isOverflow && (
        <button
          className="absolute w-6 h-6 flex flex-row justify-center items-center bottom-2 right-2"
          onClick={() => {
            handleNextButtonClick("next");
          }}
        >
          <img src={arrow} alt="next" />
        </button>
      )}

      <ul
        className="flex flex-row items-center whitespace-nowrap overflow-x-auto gap-2 h-full sm:gap-4 scrollbar-hide"
        ref={horizontalScrollRef}
      >
        {staticList.map((subHeadCategory: subHeadCategoryObject) =>
          subHeadCategory.query === focusing ? (
            <li
              key={subHeadCategory.query}
              id={subHeadCategory.query}
              className="inline-block h-full border-b-2 border-black z-50 cursor-default"
            >
              <strong>{subHeadCategory.title}</strong>
            </li>
          ) : (
            <li
              key={subHeadCategory.query}
              id={subHeadCategory.query}
              className="inline-block h-full w-auto cursor-pointer"
              onClick={handleSubHeaderClick}
            >
              {subHeadCategory.title}
            </li>
          )
        )}
        <div className="w-1 h-6 border-r-2 mb-2 invisible sm:visible" />
        {subHeadCategory.map((subHeadCategory: subHeadCategoryObject) =>
          subHeadCategory.query === focusing ? (
            <li
              key={subHeadCategory.query}
              id={subHeadCategory.query}
              className="inline-block h-full border-b-2 border-black z-50 cursor-default"
              onClick={handleSubHeaderClick}
            >
              <strong>{subHeadCategory.title}</strong>
            </li>
          ) : (
            <li
              key={subHeadCategory.query}
              id={subHeadCategory.query}
              className="inline-block h-full w-auto cursor-pointer"
              onClick={handleSubHeaderClick}
            >
              {subHeadCategory.title}
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default SubHeader;
