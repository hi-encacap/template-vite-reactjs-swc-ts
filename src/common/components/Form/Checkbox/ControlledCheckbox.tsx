import { CheckboxChangeEvent } from "antd/es/checkbox";
import { memo, useCallback } from "react";
import { useController } from "react-hook-form";

import { BaseFormElementProps } from "../interface";

import UncontrolledCheckbox, { UncontrolledCheckboxProps } from "./UncontrolledCheckbox";

const ControlledCheckbox = ({
  control,
  name,
  ...props
}: BaseFormElementProps & UncontrolledCheckboxProps) => {
  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
  });

  const handleChange = useCallback(
    (e: CheckboxChangeEvent) => {
      onChange(e.target.checked);
    },
    [onChange],
  );

  return <UncontrolledCheckbox name={name} checked={value} onChange={handleChange} {...props} />;
};

export default memo(ControlledCheckbox);
