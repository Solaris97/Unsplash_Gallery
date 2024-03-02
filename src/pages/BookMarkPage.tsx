import React from "react";
import MainImgComponent from "@components/MainImgComponent";
import CategoryHeader from "@components/CategoryHeader";
import DetailModal from "@components/DetailModal";
import Header from "@components/Header";

import { useModal } from "@hooks/useModal";

//NOTE - 북마크 페이지

const BookMarkPage: React.FC = () => {
  const { isModalOpen, closeModal } = useModal();
  const categoryList: string[] = ["사진", "좋아요", "컬렉션", "통계"];

  return (
    <div className="w-full z-10">
      <Header subUse={false} />
      {isModalOpen && <DetailModal closeModal={closeModal} />}
      <div className="h-full">
        <div className="w-full h-20"></div>
        <div className="flex flex-col justify-center items-center w-full mt-12">
          <CategoryHeader categoryList={categoryList} focusing="좋아요" />
        </div>
        <div className="flex flex-col justify-center items-center w-full p-20">
          <MainImgComponent type="bookmark" />
        </div>
      </div>
    </div>
  );
};

export default BookMarkPage;
