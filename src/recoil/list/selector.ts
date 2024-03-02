import { selector } from "recoil";
import { searchTotalItemState } from "@list/atom";
import { searchItemType } from "types/searchItemType";

//searchTotalItemState의 값을 가져와 보여줄 수 있는 데이터가 있다면 searchItem에 값을 할당
export const searchItemState = selector<searchItemType[] | null>({
  key: "searchItem",
  get: ({ get }) => {
    const totalState = get(searchTotalItemState);
    if (totalState.results.length > 0) {
      return totalState.results;
    }
    return null;
  },
  set: ({ set }, newValue) => {
    if (newValue) {
      set(searchItemState, newValue);
    }
  },
});
