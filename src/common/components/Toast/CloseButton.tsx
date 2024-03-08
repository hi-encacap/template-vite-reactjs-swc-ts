import { X } from "lucide-react";
import { memo } from "react";

import { CloseButtonProps } from "./interface";

const UMToastCloseButton = ({ closeToast }: CloseButtonProps) => {
  return (
    <button
      aria-label="close"
      className="mt-0.5 flex h-6 w-6 items-center justify-center text-gray-400"
      type="button"
      onClick={closeToast}
    >
      <X size={18} strokeWidth={2.5} />
    </button>
  );
};

const ToastCloseButton = memo(UMToastCloseButton);

export default ToastCloseButton;
