import { RefCallback, RefObject, useEffect, useRef } from "react";

//NOTE - 무한스크롤 CustomHooks
//params callback 관찰 결과가 변경될 때 호출되는 콜백 함수
//params options Intersection Observer를 구성하는 옵션 객체
//root : 요소가 교차되는지 확인, rootMargin: 교차 영역을 확장 또는 축소 시킬 여백을 지정, threshhold: 교차 비율 지정
//params type hooks이 반환하는 값의 유형을 지정
//callback : 콜백 함수 반환(하나의 DOM 요소 관찰), ref : RefObject 반환(여러 개의 DOM 요소 관찰 가능)
//return 관찰결과
//https://hyunwoo12.tistory.com/42#Typing을 보고 학습하여 개발, 익숙해지기 위해 추가적인 공부 필요

interface UseIntersectionObserverRefInterface {
  readonly callback: IntersectionObserverCallback;
  readonly options?: IntersectionObserverInit;
  readonly type?: "callback" | "ref";
}

export const useIntersectionObserverRef = <T extends HTMLElement>({
  callback,
  options = { root: null, rootMargin: "0px", threshold: 0 },
  type = "ref",
}: UseIntersectionObserverRefInterface): RefCallback<T> | RefObject<T> => {
  //IntersectionObserver는 생성될 때 callback을 실행하기 때문에 생성될 때 실행을 막기 위해 포장
  const callbackOnlyIntersecting: IntersectionObserverCallback = (
    entries,
    observer
  ) => {
    const isIntersecting = entries
      .map((entry) => entry.isIntersecting)
      .reduce((acc, cur) => acc && cur, true);
    if (isIntersecting) {
      callback(entries, observer);
    }
  };

  const observerRef = useRef<IntersectionObserver>(
    new IntersectionObserver(callbackOnlyIntersecting, options)
  );
  const elementRef = useRef<T>(null);

  //하나의 DOM 노드를 관찰
  useEffect(() => {
    if (type === "callback" || !elementRef.current || !observerRef.current) {
      return;
    }
    //IntersectionObserver를 생성하고 dom에 연결된 ref를 활용해 해당 dom을 관찰
    observerRef.current.observe(elementRef.current);
    //unmiunt시 관찰 해제
    return () => observerRef.current.disconnect();
  }, [elementRef, observerRef]);

  //여러개의 DOM 노드를 관찰시에 사용(ex:레이지로딩)
  if (type === "callback") {
    const refCallback = (element: T) => {
      if (element && observerRef.current) {
        observerRef.current.observe(element);
      }
    };
    return refCallback;
  }

  return elementRef;
};
