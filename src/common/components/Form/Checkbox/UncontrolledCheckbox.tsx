import { Checkbox, CheckboxProps } from "antd";
import { memo } from "react";
import { twMerge } from "tailwind-merge";

export interface UncontrolledCheckboxProps extends CheckboxProps {
  label?: string;
  labelClassName?: string;
  name: string;
  error?: string;
}

const UncontrolledCheckbox = ({
  className,
  name,
  id,
  disabled = false,
  label,
  labelClassName,
  error,
  ...otherProps
}: UncontrolledCheckboxProps) => {
  return (
    <label
      htmlFor={id ?? name}
      className={twMerge("inline-flex space-x-4", className, "group items-center justify-start")}
    >
      <Checkbox disabled={disabled} id={id ?? name} name={name} {...otherProps}>
        {label && <div className={labelClassName}>{label}</div>}
      </Checkbox>
      {error && <div className="mt-1 text-sm text-red-500">{error}</div>}
    </label>
  );
};

export default memo(UncontrolledCheckbox);
