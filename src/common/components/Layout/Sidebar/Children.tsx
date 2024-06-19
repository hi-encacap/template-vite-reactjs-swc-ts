import { motion } from "framer-motion";
import { memo } from "react";

import { MenuItem } from "../interface";
import SidebarMenuItemChildrenItem from "./ChildrenItem";

interface SidebarMenuItemChildrenProps {
  items: MenuItem[];
  isShow: boolean;
  selectedKey: string;
}

const SidebarMenuItemChildren = ({ items, isShow, selectedKey }: SidebarMenuItemChildrenProps) => {
  return (
    <motion.div
      layout
      className="overflow-hidden"
      initial={{ height: 0 }}
      animate={{ height: isShow ? "auto" : 0 }}
      transition={{ duration: 0.075 }}
    >
      <div className="pt-2">
        {items.map((item) => (
          <SidebarMenuItemChildrenItem key={item.key} item={item} isSelected={selectedKey === item.key} />
        ))}
      </div>
    </motion.div>
  );
};

export default memo(SidebarMenuItemChildren);
