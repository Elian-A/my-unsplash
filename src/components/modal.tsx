import type { FC, MouseEventHandler } from "react";
import type { ModalType } from "../context/modalContext";
import { useContext } from "react";
import { ModalContext } from "../context/modalContext";

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

const FormInput: FC<{ label: string; placeholder: string }> = ({
  label,
  placeholder,
}) => (
  <div className="grid gap-1 ">
    <label htmlFor={label} className="text-md">
      {label}
    </label>
    <input
      type="text"
      id={label}
      name={label}
      placeholder={placeholder}
      className="text-medium text-ellipsis rounded-xl border border-neutral-700 p-3"
    />
  </div>
);

const AddModal = () => {
  return (
    <article className="grid gap-4 font-sans">
      <h3 className="text-xl">Add new photo</h3>
      <div className="grid gap-4">
        <FormInput label="Label" placeholder="Suspendisse elit massa" />
        <FormInput
          label="Url"
          placeholder="https://images.unsplash.com/photo-1676348879583-fd7e0fd5514c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80"
        />
      </div>
      <div className="flex justify-end gap-8 align-middle">
        <button className="text-sm text-neutral-600">cancel</button>
        <button className="rounded-xl bg-primary-500 px-5 py-3 font-bold text-white">
          Submit
        </button>
      </div>
    </article>
  );
};

const DeleteModal = () => {
  return <article>ar</article>;
};

export default Modal;
