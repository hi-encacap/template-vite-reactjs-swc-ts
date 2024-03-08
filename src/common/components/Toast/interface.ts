import { MouseEvent } from "react";
import { Theme, TypeOptions } from "react-toastify";

export interface CloseButtonProps {
  closeToast: (e: MouseEvent<HTMLElement>) => void;
  type: TypeOptions;
  ariaLabel?: string;
  theme: Theme;
}
