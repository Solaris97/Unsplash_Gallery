import { useState } from "react";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { likeImage, unlikeImage } from "@services/imagesApi";
import { errorStatusState } from "@list/atom";
import { getErrorStatus } from "@utils/errorHandleing";

//NOTE - BookMark CustomHooks
//return 북마크 상태, 북마크 선택 이벤트

interface useBookMarkReturn {
  bookMarkState: boolean;
  setBookMarkState: React.Dispatch<React.SetStateAction<boolean>>;
  clickBookMark: (img_id: string) => Promise<void>;
}

export const useBookMark = (): useBookMarkReturn => {
  const [bookMarkState, setBookMarkState] = useState<boolean>(false);
  const [errorStatus, setErrorStatus] = useRecoilState(errorStatusState);
  const navigate = useNavigate();

  //이미지의 고유id를 확인하여 해당 이미지를 북마크하거나 이미 북마크 된 이미지라면 북마크 해제
  const clickBookMark = async (img_id: string) => {
    if (bookMarkState === false) {
      try {
        const res = await likeImage(img_id);
      } catch (error: unknown) {
        const axiosError: number = getErrorStatus(error)!;
        setErrorStatus(axiosError);
        navigate("/errorPage");
      }
      setBookMarkState(true);
    } else {
      try {
        const res = await unlikeImage(img_id);
      } catch (error: unknown) {
        const axiosError: number = getErrorStatus(error)!;
        setErrorStatus(axiosError);
        navigate("/errorPage");
      }
      setBookMarkState(false);
    }
  };
  return { bookMarkState, setBookMarkState, clickBookMark };
};
