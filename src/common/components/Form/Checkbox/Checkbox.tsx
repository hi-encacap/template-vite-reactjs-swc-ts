import { memo } from "react";

import { BaseFormElementProps } from "../interface";

import ControlledCheckbox from "./ControlledCheckbox";
import UncontrolledCheckbox, { UncontrolledCheckboxProps } from "./UncontrolledCheckbox";

export type CheckboxProps = BaseFormElementProps & UncontrolledCheckboxProps;

const Checkbox = ({ control, name, ...props }: CheckboxProps) => {
  if (!control) {
    return <UncontrolledCheckbox name={name} {...props} />;
  }

  return <ControlledCheckbox control={control} name={name} {...props} />;
};

export default memo(Checkbox);
