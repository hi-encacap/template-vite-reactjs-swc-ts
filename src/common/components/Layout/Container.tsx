import { HTMLAttributes, ReactNode, memo } from "react";
import { twMerge } from "tailwind-merge";

import useDocumentTitle from "@hooks/useDocumentTitle";

import ContainerHeader, { ContainerHeaderProps } from "./ContainerHeader";

interface ContainerProps extends ContainerHeaderProps, Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  children: ReactNode;
  childrenContainerClassName?: string;
}

const Container = ({ className, children, childrenContainerClassName, title }: ContainerProps) => {
  useDocumentTitle(title);

  return (
    <div className={twMerge("flex min-h-screen w-fit-layout flex-col space-y-8 px-8 pb-8", className)}>
      <ContainerHeader title={title} />
      <div className={childrenContainerClassName}>{children}</div>
    </div>
  );
};

export default memo(Container);
