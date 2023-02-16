import { useCallback, useContext, useState } from "react";
import type { FormEventHandler } from "react";

import FormInput from "./formInput";

import { ModalContext } from "../context/modalContext";
import { postImage } from "../utils/image";
import type { FormError } from "../types";

import { z } from "zod";
export const addFormValidator = z.object({
  label: z.string().min(1).max(20),
  url: z.string().url(),
});

const AddModal = () => {
  const [errors, setErrors] = useState<FormError[]>([]);
  const { toggleModalView } = useContext(ModalContext);

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    const formElement = e.target as HTMLFormElement;
    const formInputs = Object.fromEntries(new FormData(formElement));
    const validatedForm = addFormValidator.safeParse(formInputs);

    if (!validatedForm.success) {
      const zodErrors = validatedForm.error.errors;
      setErrors(
        zodErrors.map(({ path, message }) => ({
          message,
          path: path.toString(),
        }))
      );
      return;
    }

    const image = validatedForm.data;
    postImage(image)
      .then((res) => {
        // Update photos
        console.log("Update images dude!!", { res });
        // Close modal
      })
      .catch((err) => console.error(err));
  };

  const findError = useCallback(
    (label: string) => errors.find((err) => err.path === label) || null,
    [errors]
  );

  return (
    <article className="grid gap-4 font-sans">
      <h3 className="text-xl">Add new photo</h3>
      <form className="grid gap-4" onSubmit={handleSubmit}>
        <FormInput
          label="label"
          placeholder="Suspendisse elit massa"
          error={findError("label")}
          setErrors={setErrors}
        />
        <FormInput
          label="url"
          placeholder="https://images.unsplash.com/photo-1676348879583-fd7e0fd5514c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80"
          error={findError("url")}
          setErrors={setErrors}
        />
        <div className="flex justify-end gap-8 align-middle">
          <button
            type="button"
            className="text-sm text-neutral-600"
            onClick={() => toggleModalView(false)}
          >
            cancel
          </button>
          <button
            type="submit"
            className="rounded-xl bg-primary-500 px-5 py-3 font-bold text-white"
          >
            Submit
          </button>
        </div>
      </form>
    </article>
  );
};
export default AddModal;
