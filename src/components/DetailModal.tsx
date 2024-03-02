import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";

import Loading from "@components/Loading";
import { useBookMark } from "@hooks/useBookMark";
import { useLoading, useImgLoadStatusRef } from "@hooks/useLoading";
import { calculateTimeDifference } from "@utils/calculateTime";
import { searchItemTagType } from "types/searchItemType";
import whiteClose from "@icon/whiteClose.svg";
import { detailItemState, detailLikeIdState } from "@list/atom";
import likedWebp from "@icon/liked.webp";
import unlikedWebp from "@icon/unliked.webp";
import likedPng from "@icon/liked.png";
import unlikedPng from "@icon/unliked.png";
interface ModalProps {
  closeModal?: () => void;
}

//NOTE - 이미지 상세 정보 모달
//모달이 호출되면 모달 외 영역 스크롤 잠금 및 클릭 시 모달 종료

const Modal = ({ closeModal }: ModalProps) => {
  const [detailItem, setDetailItem] = useRecoilState(detailItemState);
  const [detailLikeId, setDetailLikeId] = useRecoilState(detailLikeIdState);
  const [created, setCreated] = useState<string>("");
  const { bookMarkState, setBookMarkState, clickBookMark } = useBookMark();
  const { loadingState, setLoadingState } = useLoading();
  const [loadingImgClass, setLoadingImgClass] = useState<string>(
    "w-full h-full object-contain invisible"
  );

  //이미지 로딩 여부를 확인하기 위한 ref
  const imgRef = useRef<HTMLImageElement>(null);

  //이미지 로딩 여부를 확인하기 위한 customhooks
  const isImgLoaded: boolean = useImgLoadStatusRef({ ref: imgRef });

  useEffect(() => {
    // 모달이 열릴 때 스크롤 이벤트 비활성화
    document.body.style.overflow = "hidden";
    setCreated(calculateTimeDifference(detailItem.created_at));

    //detailItem의 데이터를 확인하여 북마크 여부를 조회
    if (detailItem.liked_by_user === true) {
      setBookMarkState(true);
    } else {
      setBookMarkState(false);
    }
    return () => {
      // 모달이 닫힐 때 스크롤 이벤트 활성화
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleLikeClick = () => {
    clickBookMark(detailItem.id);
    setDetailLikeId(detailItem.id);
  };

  useEffect(() => {
    setLoadingState(isImgLoaded);
    setLoadingImgClass("w-full h-full object-contain");
  }, [isImgLoaded]);

  return (
    <div className="fixed flex flex-col justify-center items-center w-[100vw] h-[100vh] px-4 lg:px-40 py-10 z-30">
      <div
        className="absolute w-full h-[100vh] top-0 left-0 bg-black opacity-50 z-30"
        onClick={closeModal}
      />
      <div className="flex flex-auto flex-col w-full h-full bg-white rounded-md z-30 overflow-y-auto">
        <div className="flex flex-row justify-between w-full h-12 sm:h-16 bg-gray-400 p-5">
          <div className="flex flex-row justify-center items-center gap-4 sm:gap-6">
            <div className="w-6 h-6 cursor-pointer" onClick={closeModal}>
              <img src={whiteClose} />
            </div>
            <div className="w-auto h-6 text-base sm:text-lg text-white">
              <span>
                <strong>{detailItem.user.name}</strong>
              </span>
            </div>
          </div>
          <div className="flex flex-row justify-center items-center gap-4 sm:gap-6">
            <div>
              {bookMarkState === true ? (
                <picture>
                  <source srcSet={likedWebp} type="image/webp" />
                  <img
                    onClick={handleLikeClick}
                    src={likedPng}
                    className="w-4 h-4 sm:w-6 sm:h-6 cursor-pointer hover:animate-ping"
                  />
                </picture>
              ) : (
                <picture>
                  <source srcSet={unlikedWebp} type="image/webp" />
                  <img
                    onClick={handleLikeClick}
                    src={unlikedPng}
                    className="w-4 h-4 sm:w-6 sm:h-6 cursor-pointer hover:animate-ping"
                  />
                </picture>
              )}
            </div>
            {/* 다운로드 기능 미개발 */}
            <div className="flex flex-row justify-center items-center text-white w-16 h-6 sm:w-20 sm:h-8 rounded-lg border border-white cursor-pointer">
              <span className="h-4 sm:h-5 text-sm sm:text-base">다운로드</span>
            </div>
          </div>
        </div>

        <div className="w-full h-2/3 p-6">
          {!loadingState && (
            <div className="absolute">
              <Loading />
            </div>
          )}
          <img
            className={loadingImgClass}
            src={detailItem.urls.full}
            ref={imgRef}
          />
        </div>
        <div className="w-full h-1/4 mt-10 p-8 lg:p-14">
          <div className="flex flex-row justify-start text-sm sm:text-base">
            <div className="flex flex-col justify-start items-left w-36 lg:w-48">
              <span>이미지 크기</span>
              <span className="mt-2">
                <strong>
                  {detailItem.width}X{detailItem.height}
                </strong>
              </span>
            </div>
            <div className="flex flex-col justify-start items-left w-36 lg:w-48">
              <span>업로드</span>

              <span className="mt-2">
                <strong>{created}</strong>
              </span>
            </div>
            <div className="flex flex-col justify-start items-left w-36 lg:w-48">
              <span>다운로드</span>
              <span className="mt-2">
                <strong>{detailItem.downloads}</strong>
              </span>
            </div>
          </div>
          {/* detailItem의 tag를 확인하여 태그 조회 */}
          <div className="mt-6 h-20">
            {detailItem.tags?.map((item: searchItemTagType) => (
              <span className="inline-block h-8 bg-slate-100 rounded-md m-1 px-2 py-1 overflow-hidden">
                {item.title}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
