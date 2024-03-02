import { atom } from "recoil";
import { searchTotalItemType, searchItemType } from "types/searchItemType";

//페이지네이션을 위해 검색한 이미지의 총 갯수를 저장하는 전역상태
export const searchTotalItemState = atom<searchTotalItemType>({
  key: "searchTotalItem",
  default: { total: 0, total_pages: 0, results: [] },
});

//에러 코드를 저장하는 전역상태
export const errorStatusState = atom<number>({
  key: "errorStatus",
  default: 404,
});

//상세 모달에서 북마크가 변동 될 때 변동 된 이미지의 id를 저장하여 검색 화면 이미지의 북마크 여부를 변경하기 위한 전역상태
export const detailLikeIdState = atom<string>({
  key: "detailLikeId",
  default: "",
});

//상세 모달에서 사용하는 이미지의 상세정보 전역상태
export const detailItemState = atom<searchItemType>({
  key: "detailItem",
  default: {
    alt_description: "",
    created_at: new Date(),
    description: "",
    user: {
      name: "",
      id: "",
    },
    urls: {
      full: "",
      raw: "",
      regular: "",
      small: "",
      small_s3: "",
      thumb: "",
    },
    id: "",
    width: 0,
    height: 0,
    downloads: 0,
    likes: 0,
    tags: [],
    liked_by_user: false,
  },
});

//상세 정보 모달에서 사용하는 모달창 열려있는지 여부를 확인하는 전역상태
export const isModalOpenState = atom<boolean>({
  key: "isModalOpen",
  default: false,
});
