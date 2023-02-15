import type { FC } from "react";

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

export default FormInput;
