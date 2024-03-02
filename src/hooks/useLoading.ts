import { RefObject, useEffect, useState } from "react";

//NOTE - 로딩 CustomHooks
//return 로딩 상태
interface useLoadingReturn {
  loadingState: boolean;
  setLoadingState: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useLoading = (): useLoadingReturn => {
  const [loadingState, setLoadingState] = useState<boolean>(true);

  return { loadingState, setLoadingState };
};

//NOTE - 이미지 로드 확인 CustomHooks
//params ref : 이미지 로드를 확인할 ref
//return 이미지 로드 결과
interface useImgLoadStatusRefInterface {
  ref: RefObject<HTMLImageElement>;
}

export const useImgLoadStatusRef = ({ ref }: useImgLoadStatusRefInterface) => {
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const updateStatus = (img: HTMLImageElement) => {
      //completed와 이미지의 실제 높이를 확인하여 이미지의 로드 여부를 확인
      const isLoaded = img.complete && img.naturalHeight !== 0;

      setLoading(isLoaded);
    };

    //한번만 실행하기 위해서 once:true
    ref.current.addEventListener(
      "load",
      () => updateStatus(ref.current as HTMLImageElement),
      { once: true }
    );
  }, [ref]);

  return loading;
};
