import { ButtonProps } from "antd";
import { memo, ReactNode } from "react";

import { Button } from "@components/Button";

interface LoginSSOButtonProps extends ButtonProps {
  children: ReactNode;
}

const LoginSSOButton = ({ children, onClick }: LoginSSOButtonProps) => {
  return (
    <Button
      className="bg-primary !bg-opacity-10 text-message hover:text-white"
      htmlType="button"
      type="primary"
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default memo(LoginSSOButton);
