import { useSearch } from "@hooks/useSearch";
import searchButton from "@icon/searchButton.svg";

//NOTE - 검색창
const SearchBox = () => {
  const { changeSearchQuery, submitSearchQuery, searchQuery } = useSearch();
  return (
    <form
      className="w-full md:w-[600px] lg:w-[800px] h-12"
      onSubmit={() => submitSearchQuery()}
    >
      <div className="relative">
        <input
          className="w-full md:w-[600px] lg:w-[800px] h-12 p-4 rounded-lg focus:outline-0"
          type="text"
          onChange={changeSearchQuery}
          value={searchQuery}
          placeholder="고해상도 이미지 검색"
        />
        <button className="absolute inset-y-0 right-0 w-12 h-12 px-4 py-2 ">
          <img src={searchButton} alt="search" />
        </button>
      </div>
    </form>
  );
};

export default SearchBox;
