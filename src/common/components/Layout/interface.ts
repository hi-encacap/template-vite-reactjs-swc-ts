import { ReactNode } from "react";

interface BaseMenuItem {
  key: string;
  label: string;
  icon?: ReactNode;
}

export interface MenuItemWithChildren extends BaseMenuItem {
  children: MenuItem[];
  to?: never;
}

export interface MenuItemWithLink extends BaseMenuItem {
  to: string;
  children?: never;
}

export type MenuItem = MenuItemWithChildren | MenuItemWithLink;
