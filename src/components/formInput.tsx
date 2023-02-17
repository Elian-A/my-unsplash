import { useEffect } from "react";
import type { FC, Dispatch, SetStateAction } from "react";
import type { FormError } from "../types";

interface FormInputInterface {
  label: string;
  type?: "text" | "password";
  placeholder: string;
  error: FormError | null;
  setErrors: Dispatch<SetStateAction<FormError[]>>;
}

const FormInput: FC<FormInputInterface> = ({
  label,
  placeholder,
  error,
  type = "text",
  setErrors,
}) => {
  useEffect(() => {
    const timeoutId = setTimeout(() => setErrors([]), 3000);
    return () => clearTimeout(timeoutId);
  }, [error, setErrors]);
  return (
    <div className="grid gap-1 ">
      <label htmlFor={label} className="text-md capitalize">
        {label}
      </label>
      <input
        type={type}
        id={label}
        name={label}
        placeholder={placeholder}
        className="text-medium text-ellipsis rounded-xl border border-neutral-700 p-3"
      />
      {error ? <p className="text-sm text-red-500">{error.message}</p> : null}
    </div>
  );
};

export default FormInput;
