import { useCallback, useContext, useState } from "react";
import type { FormEventHandler } from "react";

import { z } from "zod";
import FormInput from "./formInput";

import { ModalContext } from "../context/modalContext";
import type { FormError } from "../types";

const modalValidator = z.object({
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
    const validatedform = modalValidator.safeParse(formInputs);
    if (!validatedform.success) {
      const zodErrors = validatedform.error.errors.map(({ path, message }) => ({
        message,
        path: path.toString(),
      }));
      setErrors(zodErrors);
    }

    /* TODO: 
           Send to backend 
           Close modal
    */
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
