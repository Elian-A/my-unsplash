import type { FC, MouseEventHandler } from "react";
import type { ModalType } from "../context/modalContext";
import { useContext } from "react";
import { ModalContext } from "../context/modalContext";
import AddModal from "./addModal";
import DeleteModal from "./deleteModal";

export type FormError = {
  message: string;
  path: string;
};

const getModal = (type: ModalType) => {
  switch (type) {
    case "add":
      return AddModal;
    case "delete":
      return DeleteModal;
  }
};

const Modal: FC = () => {
  const { type, toggleModalView } = useContext(ModalContext);
  const ModalComponent = getModal(type);

  const handleBackgroundClick = () => {
    toggleModalView(false);
  };

  const preventPropagation: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      onClick={handleBackgroundClick}
      className="absolute top-0 left-0 z-50  flex h-full w-full items-center justify-center bg-black bg-opacity-60 px-5"
    >
      <div
        onClick={preventPropagation}
        className="w-full max-w-[670px] rounded-lg bg-neutral-100  py-6 px-4"
      >
        <ModalComponent />
      </div>
    </div>
  );
};

export default Modal;
