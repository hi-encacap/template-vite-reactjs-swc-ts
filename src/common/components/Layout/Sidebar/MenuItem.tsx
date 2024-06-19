import { ChevronDown } from "lucide-react";
import { useCallback, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";

import { MenuItem } from "../interface";

import SidebarMenuItemChildren from "./Children";
import MenuItemContainer from "./MenuItemContainer";

interface SidebarMenuItemProps {
  item: MenuItem;
  selectedKey: string;
  onSelect: (key: string) => void;
}

const SidebarMenuItem = ({ item, selectedKey, onSelect }: SidebarMenuItemProps) => {
  const { pathname } = useLocation();
  const children = useMemo(() => item.children ?? [], [item]);
  const isSelected = useMemo(() => {
    const { children, key } = item;

    if (selectedKey === key) {
      return true;
    }

    if (children) {
      return children.some((child) => child.key === selectedKey);
    }

    return false;
  }, [item, selectedKey]);

  const handleClick = useCallback(() => {
    if (!item.to) {
      onSelect(item.key);
    }

    if (selectedKey !== item.key && pathname.includes(item.to!)) {
      console.log("pathname", pathname);

      onSelect(item.key);
    }
  }, [item, pathname, selectedKey, onSelect]);

  return (
    <div>
      <MenuItemContainer
        className={twMerge(
          "group flex h-12 cursor-pointer items-center space-x-3.5 rounded-llg px-4 duration-75",
          isSelected && "bg-primary text-white",
        )}
        item={item}
        tabIndex={0}
        role="button"
        onClick={handleClick}
      >
        <div
          className={twMerge(
            "flex h-6 w-6 items-center justify-center text-primary",
            isSelected && "text-inherit",
          )}
        >
          {item.icon}
        </div>
        <div
          className={twMerge(
            "flex-1 text-md font-semibold duration-75 group-hover:text-primary",
            isSelected && "group-hover:text-inherit",
          )}
        >
          {item.label}
        </div>
        {children.length > 0 && (
          <ChevronDown
            className={twMerge("duration-75", !isSelected && "-rotate-90")}
            size={16}
            strokeWidth={2.5}
          />
        )}
      </MenuItemContainer>
      {!!children.length && (
        <SidebarMenuItemChildren items={children} isShow={isSelected} selectedKey={selectedKey} />
      )}
    </div>
  );
};

export default SidebarMenuItem;
