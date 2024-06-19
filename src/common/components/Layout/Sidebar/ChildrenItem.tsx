import { memo } from "react";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

import { MenuItem } from "../interface";

interface SidebarMenuItemChildrenItemProps {
  item: MenuItem;
  isSelected: boolean;
}

const SidebarMenuItemChildrenItem = ({ item, isSelected }: SidebarMenuItemChildrenItemProps) => {
  return (
    <Link className="group/child flex h-9 items-center space-x-6 px-6" to={item.to!}>
      <div className="h-0 w-1.5 border-t-2 border-primary duration-75 group-hover/child:w-4" />
      <div className={twMerge("text-md group-hover/child:text-primary", isSelected && "text-primary")}>
        {item.label}
      </div>
    </Link>
  );
};

export default memo(SidebarMenuItemChildrenItem);
