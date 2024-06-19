import { memo } from "react";

import { BaseFormElementProps } from "../interface";

import ControlledDebounceSelect from "./ControlledDebounceSelect";
import UncontrolledDebounceSelect, { UncontrolledDebounceSelectProps } from "./UncontrolledDebounceSelect";

export type DebounceSelectProps = BaseFormElementProps & UncontrolledDebounceSelectProps;

const DebounceSelect = ({ control, name, ...props }: DebounceSelectProps) => {
  if (!control) {
    return <UncontrolledDebounceSelect name={name} {...props} />;
  }

  return <ControlledDebounceSelect control={control} name={name} {...props} />;
};

export default memo(DebounceSelect);
