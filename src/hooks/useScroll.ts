import { RefObject, useEffect, useState } from "react";

//NOTE - 스크롤 생성 여부 확인 customhooks
//params ref : 스크롤 생성이 됐는지 확인할 ref

interface useIsOverflowInterface {
  ref: RefObject<HTMLUListElement>;
}

export const useIsOverflow = ({ ref }: useIsOverflowInterface) => {
  const [isOverflow, setIsOverflow] = useState<boolean>(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  //ref.current의 전체 크기와 현재 크기를 비교하여 수평 스크롤 생성 여부를 확인
  useEffect(() => {
    const element = ref.current;
    if (element) {
      const isOverflow = element.scrollWidth > element.clientWidth;
      setIsOverflow(isOverflow);
    }
  }, [windowWidth]);

  return isOverflow;
};
