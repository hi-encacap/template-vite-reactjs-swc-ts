import { HTMLAttributes, ReactNode, memo } from "react";
import { twMerge } from "tailwind-merge";

interface BlockProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  childrenContainerClassName?: string;
  title: string;
  titleAction?: ReactNode;
}

const Block = ({ className, children, childrenContainerClassName, title, titleAction }: BlockProps) => {
  return (
    <div className={twMerge("rounded-xl bg-white shadow-centered", className)}>
      <div className="flex items-center justify-between border-b-2 border-gray-100 px-6 py-4">
        <div className="text-lg font-semibold text-primary">{title}</div>
        {titleAction}
      </div>
      <div className={childrenContainerClassName}>{children}</div>
    </div>
  );
};

export default memo(Block);
