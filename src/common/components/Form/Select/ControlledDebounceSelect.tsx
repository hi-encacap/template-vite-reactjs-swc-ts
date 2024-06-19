import { memo } from "react";
import { useController } from "react-hook-form";

import { BaseFormElementProps } from "../interface";

import UncontrolledDebounceSelect, { UncontrolledDebounceSelectProps } from "./UncontrolledDebounceSelect";

const ControlledDebounceSelect = ({
  control,
  name,
  ...props
}: BaseFormElementProps & UncontrolledDebounceSelectProps) => {
  const {
    field: { onChange, onBlur, value, ref },
    formState: { errors },
  } = useController({
    name,
    control,
  });

  return (
    <UncontrolledDebounceSelect
      name={name}
      ref={ref}
      error={(errors[name]?.message as string) ?? ""}
      onBlur={onBlur}
      onChange={onChange}
      {...(value ? { value } : { value: null })}
      {...props}
    />
  );
};

export default memo(ControlledDebounceSelect);
