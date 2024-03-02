import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { searchTotalItemState, errorStatusState } from "@list/atom";
import { getErrorStatus } from "@utils/errorHandleing";
import { searchImages } from "@services/imagesApi";
import { useLoading } from "@hooks/useLoading";
import { searchTotalItemType } from "types/searchItemType";

//NOTE - 검색어로 조회 customhooks
//return searchImagesFunction : 이미지 검색 API 호출, page와 searchQuery를 parameter로 받음
//return searchTotalItem : return 받은 이미지들의 정보가 저장되어있는 상태
//return searchItemYn : 검색 결과가 존재하는지 확인하는 상태
//return loadingState : 로딩 상태

interface UseSearchImagesReturn {
  searchImagesFunction: (page: number, searchQuery: string) => Promise<void>;
  searchTotalItem: searchTotalItemType;
  searchItemYn: boolean;
  loadingState: boolean;
}

export const useSearchImages = (): UseSearchImagesReturn => {
  const [searchTotalItem, setSearchTotalItem] =
    useRecoilState(searchTotalItemState);
  const [errorStatus, setErrorStatus] = useRecoilState(errorStatusState);
  const [searchItemYn, setSearchItemYn] = useState<boolean>(false);
  const { loadingState, setLoadingState } = useLoading();
  const navigate = useNavigate();
  const searchImagesFunction = async (page: number, searchQuery: string) => {
    setLoadingState(true);

    try {
      const searchResult = await searchImages(page, searchQuery);
      if (searchResult !== undefined) {
        setSearchTotalItem(searchResult);

        if (searchResult.total === 0) {
          setSearchItemYn(false);
        }
      }
    } catch (error: unknown) {
      const axiosError: number = getErrorStatus(error)!;
      setErrorStatus(axiosError);
      navigate("/errorPage");
    }
    setLoadingState(false);
  };

  return { searchImagesFunction, searchTotalItem, searchItemYn, loadingState };
};
