import { HTMLAttributes, ReactNode, memo } from "react";
import { twMerge } from "tailwind-merge";

interface IconWrapperProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const IconWrapper = ({ children, className, ...props }: IconWrapperProps) => {
  return (
    <div className={twMerge("flex items-center justify-center", className)} {...props}>
      {children}
    </div>
  );
};

export default memo(IconWrapper);
