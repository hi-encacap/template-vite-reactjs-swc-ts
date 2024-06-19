import { Radio, RadioGroupProps } from "antd";
import { ForwardedRef, forwardRef, memo, useMemo } from "react";
import { twMerge } from "tailwind-merge";

import ElementError from "../ElementError";
import ElementLabel from "../ElementLabel";
import { BaseUncontrolledFormElementProps, SelectOption } from "../interface";

export type UncontrolledRadioGroupProps = BaseUncontrolledFormElementProps &
  Omit<RadioGroupProps, "options"> & {
    options: SelectOption[];
    isInline?: boolean;
  };

const UncontrolledRadioGroup = (
  {
    className,
    error,
    id,
    isRequired,
    isInline,
    label,
    labelClassName,
    name,
    size,
    options,
    ...props
  }: UncontrolledRadioGroupProps,
  ref: ForwardedRef<HTMLDivElement>,
) => {
  const inputId = id ?? name;
  const sizeClassName = useMemo(() => {
    if (size === "sm") {
      return "h-9";
    }

    return "h-11";
  }, [size]);

  return (
    <label
      className={twMerge(isInline && "flex items-center justify-between", labelClassName)}
      htmlFor={inputId}
    >
      {label && (
        <ElementLabel
          className={twMerge(isInline && "-mt-0.5 mb-0")}
          id={inputId}
          label={label}
          isRequired={isRequired}
          isError={!!error}
        />
      )}
      <Radio.Group
        className={twMerge(sizeClassName, "flex items-center", className)}
        name={name}
        ref={ref}
        {...props}
      >
        {options.map((item) => (
          <Radio key={item.value} value={item.value}>
            {item.label}
          </Radio>
        ))}
      </Radio.Group>
      {error && <ElementError error={error} />}
    </label>
  );
};

export default memo(forwardRef(UncontrolledRadioGroup));
