import { getErrorStatus } from "@utils/errorHandleing";
import { useNavigate } from "react-router-dom";

import { useState } from "react";

import { errorStatusState } from "@list/atom";
import { useRecoilState } from "recoil";
import { searchItemType } from "types/searchItemType";

//NOTE - 쿼리없이 조회 customhooks
//params getImages : 호출할 API 종류
//return searchItem : 이미지 리스트
//return searchItemYn : 검색 결과가 존재하는지 확인하는 상태
//return noMoreItem : 더 이상 로딩할 데이터가 존재하는지 확인하는 상태

interface useGetImagesInterface {
  getImages: (page: number) => Promise<searchItemType[]>;
}

interface useGetImagesReturn {
  searchItem: searchItemType[];
  searchItemYn: boolean;
  noMoreItem: boolean;
  getImagesFunction: (page: number) => Promise<void>;
}
export const useGetImages = ({
  getImages,
}: useGetImagesInterface): useGetImagesReturn => {
  const navigate = useNavigate();
  const [searchItem, setSearchItem] = useState<searchItemType[]>([]);
  const [searchItemYn, setSearchItemYn] = useState<boolean>(false);
  const [noMoreItem, setNoMoreItem] = useState<boolean>(false);
  const [errorStatus, setErrorStatus] = useRecoilState(errorStatusState);

  //이미지를 조회
  const getImagesFunction = async (page: number) => {
    try {
      const searchResult = await getImages(page);
      console.log(page);
      if (page === 1) {
        setSearchItem(searchResult);
        if (searchResult.length < 1) {
          //검색 결과가 없으면 사용자에게 검색 결과가 없음을 안내
          setSearchItemYn(false);
        }
      } else {
        if (searchResult.length < 24) {
          //마지막 컨텐츠면 Infinite scroll 해제
          setNoMoreItem(true);
        }
        //컨텐츠가 계속 있다면 기존 리스트에 가산
        setSearchItem((prevList) => [...prevList!, ...searchResult]);
      }
    } catch (error: unknown) {
      const axiosError: number = getErrorStatus(error)!;
      setErrorStatus(axiosError);
      navigate("/errorPage");
    }
  };

  return {
    searchItem,
    searchItemYn,
    noMoreItem,
    getImagesFunction,
  };
};
