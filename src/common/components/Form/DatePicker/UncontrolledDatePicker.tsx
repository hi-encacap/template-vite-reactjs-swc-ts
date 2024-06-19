import { DatePicker, DatePickerProps } from "antd";
import { PickerRef } from "rc-picker";
import { ForwardedRef, forwardRef, memo, useMemo } from "react";
import { twMerge } from "tailwind-merge";

import ElementError from "../ElementError";
import ElementLabel from "../ElementLabel";
import { BaseUncontrolledFormElementProps } from "../interface";

export type UncontrolledDatePickerProps = BaseUncontrolledFormElementProps &
  Omit<DatePickerProps, "size" | "name">;

const UncontrolledDatePicker = (
  {
    className,
    error,
    id,
    isRequired,
    label,
    labelClassName,
    name,
    size,
    ...props
  }: UncontrolledDatePickerProps,
  ref: ForwardedRef<PickerRef>,
) => {
  const inputId = id ?? name;

  const sizeClassName = useMemo(() => {
    if (size === "sm") {
      return "h-9";
    }

    return "h-11";
  }, [size]);

  return (
    <label className={labelClassName} htmlFor={inputId}>
      {label && <ElementLabel id={inputId} label={label} isRequired={isRequired} isError={!!error} />}
      <DatePicker
        className={twMerge(className, "flex", sizeClassName)}
        id={id}
        name={name}
        ref={ref}
        status={error ? "error" : undefined}
        {...props}
      />
      {error && <ElementError error={error} />}
    </label>
  );
};

export default memo(forwardRef(UncontrolledDatePicker));
