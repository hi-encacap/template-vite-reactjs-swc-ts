import { Modal as AntdModal, ModalProps as AntdModalProps } from "antd";
import { FormEvent, MouseEvent, ReactNode, memo, useCallback } from "react";

import ModalFooter from "./Footer";
import ModalHeader from "./Header";

interface ModalProps extends AntdModalProps {
  disabledFooter?: boolean;
  disabledOk?: boolean;
  footerMiddle?: ReactNode;
  showHeader?: boolean;
  showOk?: boolean;
}

const Modal = ({
  disabledFooter,
  disabledOk,
  children,
  confirmLoading,
  cancelText,
  footerMiddle,
  open,
  okText,
  showHeader = true,
  showOk = true,
  title,
  onCancel,
  onOk,
  ...props
}: ModalProps) => {
  const handleSubmitForm = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      onOk?.(event as unknown as MouseEvent<HTMLButtonElement>);
    },
    [onOk],
  );

  return (
    <AntdModal
      centered
      closeIcon={null}
      footer={null}
      open={open}
      width="fit-content"
      onCancel={onCancel}
      {...props}
    >
      <form className="-m-6 rounded-xl bg-white" onSubmit={handleSubmitForm}>
        {showHeader && <ModalHeader title={title} onCancel={onCancel} />}
        {children}
        <ModalFooter
          confirmLoading={confirmLoading}
          cancelText={cancelText}
          disabled={disabledFooter}
          disabledOk={disabledOk}
          middle={footerMiddle}
          okText={okText}
          showOk={showOk}
          onCancel={onCancel}
        />
      </form>
    </AntdModal>
  );
};

export default memo(Modal);
