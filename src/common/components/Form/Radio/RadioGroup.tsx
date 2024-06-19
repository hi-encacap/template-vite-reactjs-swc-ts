import { memo } from "react";

import { BaseFormElementProps } from "../interface";

import ControlledRadioGroup from "./ControlledRadioGroup";
import UncontrolledRadioGroup, { UncontrolledRadioGroupProps } from "./UncontrolledRadioGroup";

const RadioGroup = ({ control, name, ...props }: BaseFormElementProps & UncontrolledRadioGroupProps) => {
  if (!control) {
    return <UncontrolledRadioGroup name={name} {...props} />;
  }

  return <ControlledRadioGroup control={control} name={name} {...props} />;
};

export default memo(RadioGroup);
