import { ModalProps } from "antd";
import { ReactNode, memo } from "react";
import { useIntl } from "react-intl";
import { twMerge } from "tailwind-merge";

import { Button } from "@components/Button";

const ModalFooter = ({
  confirmLoading,
  cancelText,
  disabled = false,
  disabledOk = false,
  okText,
  middle,
  showOk,
  onCancel,
}: Pick<ModalProps, "onCancel" | "okText" | "cancelText" | "confirmLoading"> & {
  showOk: boolean;
  middle?: ReactNode;
  disabled?: boolean;
  disabledOk?: boolean;
}) => {
  const { formatMessage } = useIntl();

  return (
    <div className="flex space-x-6 rounded-b-xl bg-gray-100 px-6 py-5">
      <Button
        className={twMerge("bg-white px-8", !showOk && "flex-1")}
        disabled={confirmLoading || disabled}
        htmlType="button"
        type="default"
        onClick={onCancel}
      >
        {cancelText ?? formatMessage({ id: "cancel" })}
      </Button>
      {middle}
      {showOk && (
        <Button
          className="flex-1"
          htmlType="submit"
          disabled={disabled || disabledOk}
          loading={confirmLoading}
          type="primary"
        >
          {okText ?? formatMessage({ id: "save" })}
        </Button>
      )}
    </div>
  );
};

export default memo(ModalFooter);
