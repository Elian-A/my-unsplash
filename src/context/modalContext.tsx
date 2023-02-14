import { createContext, useState } from "react";
import type { SetStateAction, Dispatch, FC, ReactElement } from "react";

export type ModalType = "add" | "delete";

interface ModalContextInterface {
  modalView: boolean;
  type: ModalType;
  toggleModalView: Dispatch<SetStateAction<boolean>>;
  setType: Dispatch<SetStateAction<ModalType>>;
}

export const ModalContext = createContext<ModalContextInterface>({
  modalView: false,
  type: "add",
  toggleModalView: () => ({}),
  setType: () => ({}),
});

export const ModalProvider: FC<{ children: ReactElement }> = ({ children }) => {
  const [modalView, toggleModalView] = useState(false);
  const [type, setType] = useState<ModalType>("add");
  const value = { modalView, toggleModalView, type, setType };
  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};
