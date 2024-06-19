import { MenuItem } from "../interface";

import SidebarMenuItem from "./MenuItem";

interface SidebarMenuProps {
  items: MenuItem[];
  selectedKey: string;
  onSelect: (key: string) => void;
}

const SidebarMenu = ({ items, selectedKey, onSelect }: SidebarMenuProps) => {
  return (
    <div className="flex flex-1 flex-col space-y-2.5 px-5">
      {items.map((item) => (
        <SidebarMenuItem key={item!.key} item={item} selectedKey={selectedKey} onSelect={onSelect} />
      ))}
    </div>
  );
};

export default SidebarMenu;
