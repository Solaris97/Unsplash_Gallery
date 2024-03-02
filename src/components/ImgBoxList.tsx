import ImageBox from "@components/ImageBox";
import type { searchItemType } from "types/searchItemType";

//NOTE - 이미지 박스 리스트
//props searchItem : 뿌려줄 데이터의 리스트
interface ImgBoxListProps {
  searchItem: searchItemType[] | null | undefined;
}

const ImgBoxList: React.FC<ImgBoxListProps> = ({
  searchItem,
}: ImgBoxListProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {searchItem?.map((item: searchItemType) => (
        <ImageBox
          key={item.id}
          id={item.id}
          alt_description={item.alt_description}
          src={item.urls.small}
          liked_by_user={item.liked_by_user}
        />
      ))}
    </div>
  );
};

export default ImgBoxList;
