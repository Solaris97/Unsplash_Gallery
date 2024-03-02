import { useLayoutEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "@components/Loading";
import NotFound from "@components//NotFound";
import ImgBoxList from "@components//ImgBoxList";
import { useIntersectionObserverRef } from "@hooks/useIntersectionObserverRef ";
import { useLoading } from "@hooks/useLoading";
import { useGetImages } from "@hooks/useGetImages";
import { getImages, getLikeImages } from "@services/imagesApi";
import { getErrorStatus } from "@utils/errorHandleing";
import { errorStatusState } from "@list/atom";
import { useRecoilState } from "recoil";

//NOTE - 메인페이지,북마크페이지 갤러리
//props type : main이면 메인페이지 콘텐츠 렌더링, bookmark면 북마크페이지 콘텐츠 렌더링

//무한스크롤로 추가적인 이미지들을 불러와서 보여주기 위한 컴포넌트, 초기 랜딩페이지와 북마크 페이지의 api parameter만 다르고 return되는 데이터는 동일
interface MainImgComponentProps {
  type: string;
}

const MainImgComponent: React.FC<MainImgComponentProps> = ({
  type,
}: MainImgComponentProps) => {
  const page = useRef<number>(1);
  const navigate = useNavigate();
  const [errorStatus, setErrorStatus] = useRecoilState(errorStatusState);
  const { loadingState, setLoadingState } = useLoading();
  const { searchItem, searchItemYn, noMoreItem, getImagesFunction } =
    useGetImages({
      getImages: type === "main" ? getImages : getLikeImages,
    });

  //type으로 구분하여 데이터 로드
  const fetchData = async () => {
    //로딩 시작
    setLoadingState(true);
    try {
      await getImagesFunction(page.current);
    } catch (error: unknown) {
      const axiosError: number = getErrorStatus(error)!;
      setErrorStatus(axiosError);
      navigate("/errorPage");
    }
    //데이터 조회가 성공적으로 이루어졌다면 page ++
    page.current++;

    //로딩 종료
    setLoadingState(false);
  };

  //무한 스크롤 customhooks 호출
  const infiniteScrollRef = useIntersectionObserverRef<HTMLDivElement>({
    callback: () => {
      fetchData();
    },
  });

  // 화면 초기 조회시
  useLayoutEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {searchItemYn === true ? (
        <NotFound />
      ) : (
        <div>
          <ImgBoxList searchItem={searchItem} />
          {!noMoreItem && <div ref={infiniteScrollRef} />}
          {loadingState && <Loading />}
        </div>
      )}
    </div>
  );
};

export default MainImgComponent;
