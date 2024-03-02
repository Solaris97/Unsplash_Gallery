import React from "react";
import { useNavigate } from "react-router-dom";
import ErrorComponent from "@components/ErrorComponent";

//NOTE - 에러 페이지

const ErrorPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/mainpage");
  };

  return (
    <div className="flex flex-col justify-center items-center bg-gray-100 w-full h-[100vh]">
      <ErrorComponent />
      <div
        className="flex flex-col justify-center items-center w-32 h-12 rounded-full border bg-white mt-16 p-1 cursor-pointer"
        onClick={handleGoHome}
      >
        <p>홈으로</p>
      </div>
    </div>
  );
};

export default ErrorPage;
