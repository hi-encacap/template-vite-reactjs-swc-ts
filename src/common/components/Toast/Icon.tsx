import { Check, X } from "lucide-react";
import { memo } from "react";
import { IconProps } from "react-toastify";
import { twMerge } from "tailwind-merge";

import { Exclamation } from "@components/Icon";

const UMToastIcon = ({ type }: IconProps) => {
  return (
    <div
      className={twMerge(
        "flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-b text-white",
        type === "success" && "from-green-primary to-cyan-primary",
        type === "error" && "from-red-primary to-red-secondary",
        type === "info" && "from-blue-primary to-blue-secondary",
        type === "warning" && "from-orange-primary to-orange-secondary",
      )}
    >
      {type === "success" && <Check size={14} strokeWidth={3} className="ml-px mt-px" />}
      {type === "error" && <X size={15} strokeWidth={3} className="mt-px" />}
      {(type === "info" || type === "warning") && <Exclamation className="w-1" />}
    </div>
    // bg-gradient-to-r from-green-300 via-blue-500 to-purple-600
  );
};

const ToastIcon = memo(UMToastIcon);

export default ToastIcon;
