import { useState } from "react";
import { useNavigate } from "react-router-dom";

//NOTE - 검색 CustomHooks
//return changeSearchQuery : input내 텍스트가 변경된다면 상태값도 같이 변경
//return submitSearchQuery : 쿼리 상태로 검색
//return searchQuery,setSearchQuery : 쿼리 상태
//return searchItemYn: 검색 결과가 존재하는지 확인하는 상태

interface useSearchInterface {
  changeSearchQuery: (e: React.ChangeEvent<HTMLInputElement>) => void;
  submitSearchQuery: () => void;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

export const useSearch = (): useSearchInterface => {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState<string>("");
  //inputbox내 데이터가 변경된다면 상태도 같이 변경
  const changeSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const submitSearchQuery = () => {
    event?.preventDefault();

    //데이터 미입력시 에러처리
    if (searchQuery === undefined || null || "") {
      alert("검색어를 제대로 입력해주세요.");
      return;
    }

    //query string으로 조회
    navigate(`/mainpage?page=1&query=${searchQuery}`);
    window.location.reload();
  };

  return {
    changeSearchQuery,
    submitSearchQuery,
    searchQuery,
    setSearchQuery
  };
};
