import { omit } from "lodash";
import { FocusEvent, memo, useCallback } from "react";
import { useController } from "react-hook-form";

import { BaseFormElementProps } from "../interface";

import UncontrolledInput, { UncontrolledInputProps } from "./UncontrolledInput";

const ControlledInput = ({
  control,
  name,
  onBlur: onBlurOriginal,
  ...props
}: BaseFormElementProps & UncontrolledInputProps) => {
  const {
    field: { onChange, onBlur, value, ref },
    formState: { errors },
  } = useController({
    name,
    control,
  });

  const handleBlur = useCallback(
    (e: FocusEvent<HTMLInputElement>) => {
      onBlur();
      onBlurOriginal?.(e);
    },
    [onBlur, onBlurOriginal],
  );

  return (
    <UncontrolledInput
      name={name}
      ref={ref}
      error={(errors[name]?.message as string) ?? ""}
      onBlur={handleBlur}
      onChange={onChange}
      {...(value ? { value } : { value: "" })}
      {...omit(props, ["value", "onChange", "onBlur"])}
    />
  );
};

export default memo(ControlledInput);
