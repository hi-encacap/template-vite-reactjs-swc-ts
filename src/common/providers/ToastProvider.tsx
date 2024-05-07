import { memo, useCallback } from "react";
import { IconProps, ToastContainer } from "react-toastify";

import { CloseButtonProps, ToastCloseButton, ToastIcon } from "@components/Toast";

const ToastProvider = () => {
  const renderIcon = useCallback((props: IconProps) => <ToastIcon {...props} />, []);
  const renderCloseButton = useCallback((props: CloseButtonProps) => <ToastCloseButton {...props} />, []);

  return (
    <ToastContainer
      closeButton={renderCloseButton}
      icon={renderIcon}
      position="top-right"
      autoClose={false}
    />
  );
};

export default memo(ToastProvider);
