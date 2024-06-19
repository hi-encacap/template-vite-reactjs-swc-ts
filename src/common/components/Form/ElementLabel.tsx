import { HTMLProps, memo } from "react";
import { twMerge } from "tailwind-merge";

interface FormElementLabelProps extends HTMLProps<HTMLLabelElement> {
  id?: string;
  isRequired?: boolean;
  isError?: boolean;
  label: string;
}

const FormElementLabel = ({ className, id, label, isRequired, isError }: FormElementLabelProps) => {
  return (
    <label
      htmlFor={id}
      className={twMerge(
        "relative -mt-2 mb-2 flex items-center text-sm font-semibold text-stone-700",
        isError && "text-red-500",
        className,
      )}
    >
      <div className="line-clamp-1 inline-block">{label}</div>
      {isRequired && <div className="ml-1 text-red-500">*</div>}
    </label>
  );
};

export default memo(FormElementLabel);
