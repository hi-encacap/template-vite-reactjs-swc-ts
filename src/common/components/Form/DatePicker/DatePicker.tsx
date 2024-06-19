import { memo } from "react";

import { BaseFormElementProps } from "../interface";

import ControlledDatePicker from "./ControlledDatePicker";
import UncontrolledDatePicker, { UncontrolledDatePickerProps } from "./UncontrolledDatePicker";

export type DatePickerProps = BaseFormElementProps & UncontrolledDatePickerProps;

const DatePicker = ({ control, name, ...props }: DatePickerProps) => {
  if (!control) {
    return <UncontrolledDatePicker name={name} {...props} />;
  }

  return <ControlledDatePicker name={name} control={control} {...props} />;
};

export default memo(DatePicker);
