import { useState, useEffect } from "react";
import arrow from "@icon/arrow.svg";
import dobuleArrow from "@icon/doubleArrow.svg";
//NOTE - 페이지네이션
//props totalItems : 전체 아이템 갯수
//props itemCountPerPage : 한 페이지에 아이템이 몇개 보여지는지 갯수
//props currentPage : 현재 페이지
//props setPage : 페이지 이동 이벤트
interface Props {
  totalItems: number;
  itemCountPerPage: number;
  currentPage: number;
  setPage: (page: number) => void;
}

const Pagination: React.FC<Props> = ({
  totalItems,
  itemCountPerPage,
  currentPage,
  setPage,
}: Props) => {
  //전체 페이지 계산
  const totalPages = Math.ceil(totalItems / itemCountPerPage);

  //페이지네이션의 시작 지점 상태(ex: 현재 페이지가 9라면 start는 7 8 9 10 11의 시작 지점인 7)
  const [start, setStart] = useState(1);

  //현재 페이지가 변동되면 페이지네이션의 스타트 지점 변경
  useEffect(() => {
    setStart(Math.max(currentPage - 2, 1)); // 시작 페이지를 현재 페이지에서 왼쪽으로 두번 쉬프트
  }, [currentPage]);

  //다음 페이지 이동
  const handleToNextPage = () => {
    setPage(Math.min(currentPage + 1, totalPages));
  };

  //마지막 페이지로 이동
  const handleToLastPage = () => {
    setPage(totalPages);
  };

  //전 페이지로 이동
  const handleToPrevPage = () => {
    setPage(Math.max(currentPage - 1, 1));
  };
  //첫번째 페이지로 이동
  const handleToFirstPage = () => {
    setPage(1);
  };

  return (
    <div className="flex flex-row justify-center items-center">
      {/* 현재 페이지가 1페이지라면 비활성 */}
      <button
        className="w-8 h-8 mx-1 p-1 rounded-md disabled:opacity-50 disabled:pointer-events-none hover:bg-blue-100"
        onClick={handleToFirstPage}
        disabled={currentPage === 1}
      >
        <img className="rotate-90" src={dobuleArrow} alt="first" />
      </button>

      {/* 현재 페이지가 1페이지라면 비활성 */}
      <button
        className="w-8 h-8 mx-1 p-1 rounded-md disabled:opacity-50 disabled:pointer-events-none hover:bg-blue-100"
        onClick={handleToPrevPage}
        disabled={currentPage === 1}
      >
        <img className="rotate-180" src={arrow} alt="prev" />
      </button>

      {/* start 기준으로 5개씩 데이터를 뿌려줌 */}
      {Array.from({ length: 5 }, (_, index) => start + index).map((page) => (
        <button
          key={page}
          onClick={() => setPage(page)}
          className="flex flex-col justify-center items-center text-lg rounded-md w-8 h-8 p-2 mx-1  disabled:opacity-50 disabled:pointer-events-none hover:bg-blue-100"
          disabled={page >= totalPages || page === currentPage}
        >
          {page}
        </button>
      ))}

      {/* 현재 페이지가 마지막페이지라면 비활성 */}
      <button
        className="w-8 h-8 mx-1 p-1 rounded-md disabled:opacity-50 disabled:pointer-events-none hover:bg-blue-100"
        onClick={handleToNextPage}
        disabled={currentPage === totalPages}
      >
        <img src={arrow} alt="next" />
      </button>

      {/* 현재 페이지가 마지막페이지라면 비활성 */}
      <button
        className="w-8 h-8 mx-1 p-1 rounded-md disabled:opacity-50 disabled:pointer-events-none hover:bg-blue-100"
        onClick={handleToLastPage}
        disabled={currentPage === totalPages}
      >
        <img className="-rotate-90" src={dobuleArrow} alt="last" />
      </button>
    </div>
  );
};

export default Pagination;
