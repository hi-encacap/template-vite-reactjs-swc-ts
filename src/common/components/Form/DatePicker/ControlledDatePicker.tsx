import { omit } from "lodash";
import { memo } from "react";
import { useController } from "react-hook-form";

import { BaseFormElementProps } from "../interface";

import UncontrolledDatePicker, { UncontrolledDatePickerProps } from "./UncontrolledDatePicker";

const ControlledDatePicker = ({
  name,
  control,
  ...props
}: BaseFormElementProps & UncontrolledDatePickerProps) => {
  const {
    field: { onChange, onBlur, value, ref },
    formState: { errors },
  } = useController({
    name,
    control,
  });

  return (
    <UncontrolledDatePicker
      name={name}
      ref={ref}
      error={(errors[name]?.message as string) ?? ""}
      onBlur={onBlur}
      onChange={onChange}
      {...(value ? { value } : { value: "" })}
      {...omit(props, ["value", "onChange", "onBlur"])}
    />
  );
};

export default memo(ControlledDatePicker);
