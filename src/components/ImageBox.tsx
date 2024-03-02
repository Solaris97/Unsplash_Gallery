import { useModal } from "@hooks/useModal";
import { useEffect } from "react";
import { useBookMark } from "@hooks/useBookMark";
import { useRecoilState } from "recoil";
import { detailLikeIdState } from "@list/atom";
import likedWebp from "@icon/liked.webp";
import unlikedWebp from "@icon/unliked.webp";
import likedPng from "@icon/liked.png";
import unlikedPng from "@icon/unliked.png";

//NOTE - 갤러리 이미지 박스
//props id: 이미지의 고유 id
//props alt_description: 이미지 설명
//props src : 이미지 주소
//props liked_by_user: 사용자의 이미지 북마크 여부
interface ImageBoxProps {
  id: string;
  alt_description: string;
  src: string;
  liked_by_user: boolean;
}

const ImageBox: React.FC<ImageBoxProps> = ({
  id,
  alt_description,
  src,
  liked_by_user,
}: ImageBoxProps) => {
  const { clickModal } = useModal();
  const { bookMarkState, setBookMarkState, clickBookMark } = useBookMark();
  const [detailLikeId, setDetailLikeId] = useRecoilState(detailLikeIdState);

  useEffect(() => {
    setBookMarkState(liked_by_user);
  }, []);

  //상세 정보 모달에서 좋아요가 변경됐다면 검색 화면에서 보여지는 좋아요 여부도 변경
  useEffect(() => {
    if (id === detailLikeId) {
      if (bookMarkState) {
        setBookMarkState(false);
      } else {
        setBookMarkState(true);
      }
    }
  }, [detailLikeId]);

  return (
    <>
      <div className="relative cursor-pointer hover:scale-110">
        <img
          onClick={() => {
            clickModal(id);
          }}
          className="w-60 h-52"
          src={src}
          alt={alt_description}
          id={id}
        />

        {bookMarkState === true ? (
          <picture>
            <source srcSet={likedWebp} type="image/webp" />
            <img
              onClick={() => {
                clickBookMark(id);
              }}
              src={likedPng}
              className="absolute w-6 h-6 right-2 bottom-2 hover:animate-ping"
            />
          </picture>
        ) : (
          <picture>
            <source srcSet={unlikedWebp} type="image/webp" />
            <img
              onClick={() => {
                clickBookMark(id);
              }}
              src={unlikedPng}
              className="absolute w-6 h-6 right-2 bottom-2 hover:animate-ping"
            />
          </picture>
        )}
      </div>
    </>
  );
};

export default ImageBox;
