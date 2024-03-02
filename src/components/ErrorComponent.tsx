import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { errorStatusState } from "@list/atom";

//NOTE - 에러 확인 컴포넌트
//전역상태 errorStatus를 확인하여 사용자에게 보여 줄 에러메시지를 출력
//unsplash API는 1시간에 50번의 호출 가능 횟수를 가지고 있어 해당 에러에 대한 사용자에게 안내 목적

const ErrorComponent = () => {
  const [errorStatus, setErrorStatus] = useRecoilState(errorStatusState);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorMessageSub, setErrorMessageSub] = useState<string>("");
  useEffect(() => {
    if (errorStatus === 403) {
      setErrorMessage("호출 가능한 API의 최대 횟수를 초과하였습니다.");
      setErrorMessageSub("잠시만 기다려보신 후 다시 시도해주세요.");
    } else if (errorStatus === 404) {
      setErrorMessage("잘못된 요청입니다.");
      setErrorMessageSub("URL을 확인해주세요.");
    } else {
      setErrorMessage("통신 오류가 발생했습니다.");
      setErrorMessage("잠시만 기다려보신 후 다시 시도해주세요.");
    }
  }, [errorStatus]);

  useEffect(() => {
    return () => {
      setErrorStatus(0);
    };
  }, []);
  return (
    <div className="flex flex-col justify-center items-center">
      <p className="text-8xl font-bold">{errorStatus}</p>
      <p className="mt-8">{errorMessage}</p>
      <p className="mt-2">{errorMessageSub}</p>
    </div>
  );
};

export default ErrorComponent;
