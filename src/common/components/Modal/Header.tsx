import { ModalProps } from "antd";
import { X } from "lucide-react";
import { memo } from "react";

const ModalHeader = ({ title, onCancel }: Pick<ModalProps, "title" | "onCancel">) => {
  return (
    <div className="flex items-center justify-between border-b-2 border-gray-100 px-6 pb-5 pt-6">
      <div className="text-base font-semibold">{title}</div>
      <button
        className="flex h-8 w-8 items-center justify-center rounded-md duration-75 hover:bg-gray-100"
        type="button"
        onClick={onCancel}
      >
        <X size={18} />
      </button>
    </div>
  );
};

export default memo(ModalHeader);
