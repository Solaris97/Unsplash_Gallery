import { useEffect, useLayoutEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import Loading from "@components/Loading";
import NotFound from "@components/NotFound";
import ImgBoxList from "@components/ImgBoxList";
import Pagination from "@components/Pagination";
import { useDidMountEffect } from "@hooks/useDidMountEffect";
import { useSearchImages } from "@hooks/useSearchImages";
import { searchItemState } from "@list/selector";

//NOTE - 검색페이지 갤러리

const SearchImgComponent: React.FC = () => {
  //검색 데이터 아이템
  const [searchItem, setSearchItem] = useRecoilState(searchItemState);
  let [query, setQuery] = useSearchParams();
  //query string에서 page를 불러오는데 만약 number형 변환이 불가능하거나 데이터에 문제가 없으면 초기 값 1로 설정
  const [page, setPage] = useState<number>(Number(query.get("page")) || 1);
  //query string에서 query 불러옴
  const [searchQuery, setSearchQuery] = useState<string | null>(
    query.get("query")
  );
  const navigate = useNavigate();
  const location = useLocation();
  const { searchImagesFunction, searchTotalItem, searchItemYn, loadingState } =
    useSearchImages();
  //페이지가 변동되면 변동되는 페이지에 맞춰 Query string 변경
  useDidMountEffect({
    func: () => {
      navigate(`/mainpage?page=${page}&query=${searchQuery}`);
    },
    deps: [page],
  });

  useEffect(() => {
    // URL이 변경된다면 page의 값 재설정
    setPage(Number(query.get("page")));
    searchImagesFunction(page, searchQuery!);
  }, [location]);

  useLayoutEffect(() => {
    searchImagesFunction(page, searchQuery!);
  }, []);

  return (
    <>
      {searchItemYn === true ? (
        <NotFound />
      ) : (
        <>
          {loadingState === true ? (
            <Loading />
          ) : (
            <>
              <ImgBoxList searchItem={searchItem} />
              <div className="flex flex-row justify-center items-center mt-10">
                <Pagination
                  totalItems={searchTotalItem.total}
                  currentPage={page}
                  setPage={setPage}
                  itemCountPerPage={24}
                ></Pagination>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default SearchImgComponent;
