import { memo, ReactNode } from "react";

interface ContainerRightProps {
  children: ReactNode;
  subtitle: string;
  title: string;
}

const ContainerRight = ({ children, subtitle, title }: ContainerRightProps) => {
  return (
    <div className="px-10 pb-10 pt-10">
      <h2 className="text-xl font-extrabold text-title">{title}</h2>
      <p className="mt-2 text-sm text-slate-500">{subtitle}</p>
      <div className="mt-8 flex items-center space-x-2">
        <div className="h-1.5 w-10 rounded-xl bg-gray-100" />
        <div className="h-1.5 w-8 rounded-xl bg-gray-100" />
        <div className="h-1.5 w-6 rounded-xl bg-gray-100" />
      </div>
      {children}
    </div>
  );
};

export default memo(ContainerRight);
