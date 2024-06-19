import { AlignLeft } from "lucide-react";
import { memo } from "react";

import ContainerHeaderSearch from "./ContainerHeaderSearch";
import ContainerHeaderUser from "./ContainerHeaderUser";

export interface ContainerHeaderProps {
  title: string;
}

const ContainerHeader = ({ title }: ContainerHeaderProps) => {
  return (
    <div className="flex h-22 items-center justify-between border-b-2 border-white/50">
      <div className="flex items-center space-x-6">
        <AlignLeft strokeWidth={2.25} size={28} className="text-title" />
        <div className="text-3xl font-bold text-title">{title}</div>
      </div>
      <div className="flex items-center justify-end space-x-6">
        <ContainerHeaderSearch />
        <ContainerHeaderUser />
      </div>
    </div>
  );
};

export default memo(ContainerHeader);
