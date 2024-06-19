import { Input, InputNumber, InputNumberProps, InputProps, InputRef } from "antd";
import { omit } from "lodash";
import { ForwardedRef, HTMLInputTypeAttribute, InputHTMLAttributes, forwardRef, memo, useMemo } from "react";
import { twMerge } from "tailwind-merge";

import FormElementError from "../ElementError";
import ElementLabel from "../ElementLabel";
import { BaseUncontrolledFormElementProps } from "../interface";

import PriceInput from "./PriceInput";

export interface UncontrolledInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "name" | "prefix">,
    BaseUncontrolledFormElementProps,
    Omit<InputProps, "size" | "value" | "name"> {
  type?: HTMLInputTypeAttribute | "price";
}

const UncontrolledInput = (
  {
    name,
    id,
    type = "text",
    className,
    label,
    labelClassName,
    size = "normal",
    error,
    isRequired,
    disabled,
    ...inputProps
  }: UncontrolledInputProps,
  ref: ForwardedRef<InputRef>,
) => {
  const inputId = id ?? name;

  const inputSizeClassName = useMemo(() => {
    if (size === "sm") {
      return "h-9";
    }

    return "h-11";
  }, [size]);

  return (
    <div className={labelClassName}>
      {label && <ElementLabel id={inputId} label={label} isRequired={isRequired} isError={!!error} />}
      {type === "password" && (
        <Input.Password
          className={twMerge(className, inputSizeClassName)}
          disabled={disabled}
          name={name}
          ref={ref}
          status={error ? "error" : undefined}
          {...inputProps}
        />
      )}
      {type === "price" && (
        <PriceInput
          className={twMerge(inputSizeClassName, className)}
          disabled={disabled}
          name={name}
          ref={ref}
          status={error ? "error" : undefined}
          {...omit(inputProps, "prefix")}
        />
      )}
      {type === "number" && (
        <InputNumber
          rootClassName={twMerge("w-full", className, inputSizeClassName)}
          className="flex items-center"
          disabled={disabled}
          id={inputId}
          name={name}
          ref={ref as ForwardedRef<HTMLInputElement>}
          status={error ? "error" : undefined}
          {...(inputProps as InputNumberProps)}
        />
      )}
      {type !== "password" && type !== "price" && type !== "number" && (
        <Input
          className={twMerge(className, inputSizeClassName)}
          disabled={disabled}
          id={inputId}
          name={name}
          ref={ref}
          status={error ? "error" : undefined}
          type={type}
          {...inputProps}
        />
      )}
      {error && <FormElementError error={error} />}
    </div>
  );
};

export default memo(forwardRef(UncontrolledInput));
