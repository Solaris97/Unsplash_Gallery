import axios from "axios";
import { searchItemType, searchTotalItemType } from "types/searchItemType";
import { UNSPLASH_API_KEY,UNSPLASH_ACCESS_TOKEN } from '../configs';

// NOTE - 쿼리 없이 이미지 조회
export const getImages = (page: number): Promise<searchItemType[]> => {
  return axios
    .get("https://api.unsplash.com/photos", {
      params: {
        client_id: UNSPLASH_API_KEY,
        page: page,
        per_page: 24,
        order_by: "latest",
      },
      //사용자의 북마크 여부를 확인하기 위해 사용
      headers: {
        Authorization: UNSPLASH_ACCESS_TOKEN,
      },
    })
    .then((res) => {
      if (res.status === 200) {
        return res.data;
      }
      throw new Error("Unexpected response status");
    })
    .catch((error) => {
      throw error;
    });
};

// NOTE - 이미지 북마크
export const likeImage = (id: string): Promise<number> => {
  return axios
    .post(`https://api.unsplash.com/photos/${id}/like`, null, {
      params: { client_id: UNSPLASH_API_KEY },
      headers: {
        Authorization: UNSPLASH_ACCESS_TOKEN,
      },
    })
    .then((res) => {
      if (res.status === 201) {
        return res.status;
      }
      throw new Error("Unexpected response status");
    })
    .catch((error) => {
      throw error;
    });
};

// NOTE - 이미지 북마크 해제
export const unlikeImage = (id: string): Promise<number> => {
  return axios
    .delete(`https://api.unsplash.com/photos/${id}/like`, {
      params: { client_id: UNSPLASH_API_KEY },
      headers: {
        Authorization: UNSPLASH_ACCESS_TOKEN,
      },
    })
    .then((res) => {
      if (res.status === 200) {
        return res.status;
      }
      throw new Error("Unexpected response status");
    })
    .catch((error) => {
      throw error;
    });
};

//NOTE - 북마크한 이미지 조회
//API의 문제로 북마크 해제 후 첫번쨰 조회시 북마크 해제가 반영되지않음, 북마크 페이지에서 북마크 해제시 강제로 두번 조회하는 로직을 넣기에는 API 호출 횟수 제한이 있어 관련 로직 미추가
export const getLikeImages = (page: number): Promise<searchItemType[]> => {
  const username: string = "solaris121997";
  return axios
    .get(`https://api.unsplash.com/users/${username}/likes`, {
      params: {
        client_id: UNSPLASH_API_KEY,
        username: username,
        page: page,
        per_page: 24,
        order_by: "latest",
      },
      headers: {
        Authorization: UNSPLASH_ACCESS_TOKEN,
      },
    })
    .then((res) => {
      if (res.status === 200) {
        return res.data;
      }
      throw new Error("Unexpected response status");
    })
    .catch((error) => {
      throw error;
    });
};

//NOTE - id로 이미지 상세 조회
export const getImagesById = (id: string): Promise<searchItemType> => {
  const Access_Key = UNSPLASH_API_KEY;

  return axios
    .get(`https://api.unsplash.com/photos/${id}`, {
      params: {
        client_id: Access_Key,
      },
      headers: {
        Authorization: UNSPLASH_ACCESS_TOKEN,
      },
    })
    .then((res) => {
      if (res.status === 200) {
        return res.data;
      }
      throw new Error("Unexpected response status");
    })
    .catch((error) => {
      throw error;
    });
};

//NOTE - 쿼리로 이미지 조회
//몇몇 검색어들의 경우 실제 데이터와 API가 보내주는 totalItem 갯수가 다른 경우가 있음 이 경우 페이지의 마지막 번호가 정상적이지 않음
export const searchImages = (
  page: number,
  query: string
): Promise<searchTotalItemType> => {
  const Access_Key = UNSPLASH_API_KEY;

  return axios
    .get(`https://api.unsplash.com/search/photos`, {
      params: {
        client_id: Access_Key,
        page: page,
        per_page: 24,
        query: query,
        order_by: "latest",
      },
      headers: {
        Authorization: UNSPLASH_ACCESS_TOKEN,
      },
    })
    .then((res) => {
      if (res.status === 200) {
        return res.data;
      }
      throw new Error("Unexpected response status");
    })
    .catch((error) => {
      throw error;
    });
};
