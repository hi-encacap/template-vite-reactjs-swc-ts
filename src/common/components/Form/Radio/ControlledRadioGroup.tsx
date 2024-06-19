import { memo } from "react";
import { useController } from "react-hook-form";

import { BaseFormElementProps } from "../interface";

import UncontrolledRadioGroup, { UncontrolledRadioGroupProps } from "./UncontrolledRadioGroup";

const ControlledRadioGroup = ({
  control,
  name,
  ...props
}: BaseFormElementProps & UncontrolledRadioGroupProps) => {
  const {
    field: { onChange, onBlur, value, ref },
    formState: { errors },
  } = useController({
    name,
    control,
  });

  return (
    <UncontrolledRadioGroup
      name={name}
      ref={ref}
      error={(errors[name]?.message as string) ?? ""}
      onBlur={onBlur}
      onChange={onChange}
      {...(value ? { value } : { value: "" })}
      {...props}
    />
  );
};

export default memo(ControlledRadioGroup);
