import { useEffect, useRef } from "react";

//NOTE - useDidMountEffec CustomHooks
//params func : 실행할 함수
//params deps : 의존성 배열
//useEffect와 역할은 같지만 화면의 첫 렌더링때는 실행하지 않음

interface useDidMountEffectInterface {
  func: () => void;
  readonly deps: number[];
}

export const useDidMountEffect = ({
  func,
  deps,
}: useDidMountEffectInterface) => {
  const didMount = useRef<boolean>(false);

  useEffect(() => {
    if (didMount.current) func();
    else didMount.current = true;
  }, deps);
};
