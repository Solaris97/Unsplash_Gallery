import { useRecoilState } from "recoil";

import { useNavigate } from "react-router-dom";
import {
  isModalOpenState,
  detailItemState,
  errorStatusState,
} from "@list/atom";
import { getImagesById } from "@services/imagesApi";
import { getErrorStatus } from "@utils/errorHandleing";

//NOTE - 모달 customhooks
//return 모달 상태, 모달 클릭 이벤트, 모달 닫기 이벤트
interface useModalReturn {
  isModalOpen: boolean;
  clickModal: (detail_id: string) => Promise<void>;
  closeModal: () => void;
}

export const useModal = (): useModalReturn => {
  const [isModalOpen, setIsModalOpen] = useRecoilState(isModalOpenState);
  const [detailItem, setDetailItem] = useRecoilState(detailItemState);
  const [errorStatus, setErrorStatus] = useRecoilState(errorStatusState);
  const navigate = useNavigate();

  //모달 클릭시 id의 고유값을 확인하여 해당 이미지 상세 조회
  const clickModal = async (detail_id: string) => {
    try {
      const res = await getImagesById(detail_id);
      setDetailItem(res);
    } catch (error: unknown) {
      const axiosError: number = getErrorStatus(error)!;
      setErrorStatus(axiosError);
      navigate("/errorPage");
    }
    setIsModalOpen(true);
  };

  //모달 닫기
  const closeModal: () => void = () => {
    setIsModalOpen(false);
  };
  return { isModalOpen, clickModal, closeModal };
};
