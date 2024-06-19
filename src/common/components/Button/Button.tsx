import { Button as AntdButton, ButtonProps as AntdButtonProps } from "antd";
import { memo, useMemo } from "react";
import { twMerge } from "tailwind-merge";

const Button = ({ className, size, type, ...props }: AntdButtonProps) => {
  const sizeClassName = useMemo(() => {
    if (size === "small") {
      return "h-9";
    }

    return "h-11";
  }, [size]);

  const colorByType = useMemo(() => {
    if (type === "primary") {
      return "bg-primary";
    }

    return "";
  }, [type]);

  return (
    <AntdButton
      className={twMerge(sizeClassName, colorByType, "font-semibold", className)}
      type={type}
      {...props}
    />
  );
};

export default memo(Button);
