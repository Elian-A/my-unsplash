import { useCallback, useContext, useState } from "react";
import type { FormEventHandler } from "react";
import { ModalContext } from "../context/modalContext";
import type { FormError } from "../types";
import FormInput from "./formInput";
import { deleteImage } from "../utils/image";
import { ImageContext } from "../context/imageContext";

const DeleteModal = () => {
  const [errors, setErrors] = useState<FormError[]>([]);
  const { toggleModalView, image, setImage, modalView } =
    useContext(ModalContext);
  const { deletePhoto } = useContext(ImageContext);
  // const { addPhotos } = useContext(ImageContext);

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    const { title } = Object.fromEntries(
      new FormData(e.target as HTMLFormElement)
    );
    if (title === image?.title) {
      const id = image?.id as string;
      deleteImage(id)
        .then((res) => {
          setImage(null);
          deletePhoto(id);
          toggleModalView(!modalView);
        })
        .catch((err) => console.log(err));
    }
    setErrors([{ message: "Wrong title", path: "label" }]);
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
          label="title"
          type="text"
          placeholder="...."
          error={findError("label")}
          setErrors={setErrors}
        />
        <p>
          Enter your image title &quot;
          <span className="text-red-500">{image?.title}</span>&quot; to delete
        </p>
        <div className="flex justify-end gap-8 align-middle capitalize">
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
