import { memo } from "react";

import { BaseFormElementProps } from "../interface";

import ControlledInput from "./ControlledInput";
import UncontrolledInput, { UncontrolledInputProps } from "./UncontrolledInput";

export type InputProps = BaseFormElementProps & UncontrolledInputProps;

const Input = ({ control, name, ...props }: InputProps) => {
  if (!control) {
    return <UncontrolledInput name={name} {...props} />;
  }

  return <ControlledInput control={control} name={name} {...props} />;
};

export default memo(Input);
