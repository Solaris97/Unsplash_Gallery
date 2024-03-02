import { AxiosError } from "axios";
//NOTE - 커스텀 에러 핸들링
//https://immigration9.github.io/typescript/2022/01/09/error-typescript.html를 보고 status 코드를 반환하는 함수 개발

export const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) return error.message;
  return String(error);
};

export const getErrorStatus = (error: unknown) => {
  if (isAxiosError(error)) return (error as AxiosError).response?.status;
  return Number(error);
};

function isAxiosError(error: unknown): error is AxiosError {
  return (error as AxiosError).isAxiosError !== undefined;
}
