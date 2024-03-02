//NOTE - 북마크페이지 헤더
//categoryList의 아이템을 뿌려주고 focusing할 아이템을 확인하여 포인트를 줌
//props categoryList : 헤더에서 보여줄 전체 아이템
//props focusing : 포커싱 요소를 줄 아이템

interface CategoryHeaderProps {
  categoryList: string[];
  focusing: string;
}

const CategoryHeader = ({ categoryList, focusing }: CategoryHeaderProps) => {
  return (
    <div className="flex flex-row justify-center items-center w-full gap-10">
      {categoryList.map((item: string) =>
        item === focusing ? (
          <div key={item} className="w-auto h-8 border-b-2 border-black">
            <span>
              <strong>{item}</strong>
            </span>
          </div>
        ) : (
          <div key={item} className="w-auto h-8 ">
            <span>{item}</span>
          </div>
        )
      )}
    </div>
  );
};

export default CategoryHeader;
