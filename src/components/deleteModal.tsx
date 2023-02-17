import { useCallback, useContext, useState } from "react";
import type { FormEventHandler } from "react";
import { ImageContext } from "../context/imageContext";
import { ModalContext } from "../context/modalContext";
import type { FormError } from "../types";
import FormInput from "./formInput";

const DeleteModal = () => {
  const [errors, setErrors] = useState<FormError[]>([]);
  const { toggleModalView } = useContext(ModalContext);
  // const { addPhotos } = useContext(ImageContext);

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
  };

  const findError = useCallback(
    (label: string) => errors.find((err) => err.path === label) || null,
    [errors]
  );

  return (
    <article className="grid gap-4 font-sans">
      <h3 className="text-xl">Are you sure?</h3>
      <form className="grid gap-4" onSubmit={handleSubmit}>
        <FormInput
          label="password"
          type="password"
          placeholder="*******************"
          error={findError("label")}
          setErrors={setErrors}
        />
        <div className="flex justify-end gap-8 align-middle">
          <button
            type="button"
            className="text-sm text-neutral-600"
            onClick={() => toggleModalView(false)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-xl bg-secondary-400 px-5 py-3 font-bold text-white"
          >
            Delete
          </button>
        </div>
      </form>
    </article>
  );
};

export default DeleteModal;
