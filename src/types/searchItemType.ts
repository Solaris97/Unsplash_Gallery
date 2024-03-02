export type subHeadCategoryObject = {
  query: string;
  title: string;
};


export type searchItemTagType = {
  type: string;
  title: string;
};

export type searchUserType = {
  name: string;
  id: string;
};

export type searchItemSizeType = {
  full: string;
  raw: string;
  regular: string;
  small: string;
  small_s3: string;
  thumb: string;
};

export type searchItemType = {
  alt_description: string;
  created_at: Date;
  description: string;
  user: searchUserType;
  id: string;
  urls: searchItemSizeType;
  width: number;
  height: number;
  downloads: number;
  likes: number;
  tags: searchItemTagType[];
  liked_by_user:boolean;
};

export type searchTotalItemType = {
  total: number;
  total_pages: number;
  results: searchItemType[];
};
