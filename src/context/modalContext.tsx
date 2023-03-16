import { createContext, useState } from "react";
import type { SetStateAction, Dispatch, FC, ReactElement } from "react";

export type ModalType = "add" | "delete";
export type ModalImageType = { id: string; title: string } | null;

interface ModalContextInterface {
  modalView: boolean;
  type: ModalType;
  image: ModalImageType;
  toggleModalView: Dispatch<SetStateAction<boolean>>;
  setType: Dispatch<SetStateAction<ModalType>>;
  setImage: Dispatch<SetStateAction<ModalImageType>>;
}

export const ModalContext = createContext<ModalContextInterface>({
  modalView: false,
  type: "add",
  image: null,
  toggleModalView: () => ({}),
  setType: () => ({}),
  setImage: () => ({}),
});

export const ModalProvider: FC<{ children: ReactElement }> = ({ children }) => {
  const [modalView, toggleModalView] = useState(false);
  const [type, setType] = useState<ModalType>("add");
  const [image, setImage] = useState<ModalImageType>(null);
  const value = { modalView, toggleModalView, type, setType, image, setImage };
  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};
