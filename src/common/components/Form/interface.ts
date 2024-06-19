import { FormControl } from "@interfaces/common";
import { ReactNode } from "react";

export type FormElementSize = "normal" | "sm";

export interface SelectOption<T = string | number> {
  label: ReactNode;
  value: T;
}

export interface BaseUncontrolledFormElementProps {
  error?: string;
  isRequired?: boolean;
  label?: string;
  labelClassName?: string;
  name: string;
  size?: FormElementSize;
}

export interface BaseFormElementProps extends BaseUncontrolledFormElementProps {
  control?: FormControl;
}
