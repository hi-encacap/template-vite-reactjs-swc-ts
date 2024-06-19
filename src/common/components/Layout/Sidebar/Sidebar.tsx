import { BadgePercent, CalendarClock, LayoutDashboard, ScanBarcode, School, UsersRound } from "lucide-react";
import { memo, useCallback, useLayoutEffect, useMemo, useState } from "react";
import { useIntl } from "react-intl";
import { useLocation } from "react-router-dom";

import { Logo } from "@components/Logo";
import { MANAGER_PATH } from "@constants/path";

import { MenuItem } from "../interface";

import SidebarMenu from "./Menu";

const Sidebar = () => {
  const { formatMessage } = useIntl();

  const adminMenuItems = useMemo<MenuItem[]>(
    () => [
      {
        key: "dashboard",
        label: formatMessage({ id: "dashboard" }),
        icon: <LayoutDashboard size={16} strokeWidth="2.1" />,
        to: MANAGER_PATH.DASHBOARD,
      },
      {
        key: "room-list",
        label: formatMessage({ id: "rooms" }),
        icon: <School size={16} strokeWidth="2.1" />,
        to: MANAGER_PATH.ROOM.ROOMS,
      },
      {
        key: "room-rate",
        label: formatMessage({ id: "rates" }),
        icon: <BadgePercent size={16} strokeWidth="2.1" />,
        to: MANAGER_PATH.ROOM.RATES,
      },
      {
        key: "room-reservation",
        label: formatMessage({ id: "reservations" }),
        icon: <CalendarClock size={16} strokeWidth="2.1" />,
        to: MANAGER_PATH.ROOM.RESERVATIONS,
      },
      {
        key: "inventory",
        label: formatMessage({ id: "inventories" }),
        icon: <ScanBarcode size={16} strokeWidth="2.1" />,
        to: MANAGER_PATH.INVENTORY.PRODUCTS,
      },
      {
        key: "customer",
        label: formatMessage({ id: "customers" }),
        icon: <UsersRound size={16} strokeWidth="2.1" />,
        to: MANAGER_PATH.CUSTOMER,
      },
    ],
    [formatMessage],
  );

  const menuItems = useMemo(() => adminMenuItems, [adminMenuItems]);
  const { pathname } = useLocation();

  const [selectedItemKey, setSelectedItemKey] = useState<string>("");

  const handleToggleSelectedItem = useCallback(
    (key: string) => {
      setSelectedItemKey((prev) => {
        const item = menuItems.find((item) => item.key === key)!;
        const isChildren = item.children && item.children.find((child) => child.key === prev);

        if (prev === key || isChildren) {
          return "";
        }

        return key;
      });
    },
    [menuItems],
  );

  const handleChangePathname = useCallback(
    (path: string) => {
      let key = "dashboard";

      menuItems.forEach((item) => {
        const { children, to } = item;

        if (to === "/") {
          return;
        }

        if (to && path.includes(to)) {
          key = item.key;
          return;
        }

        if (children) {
          children.forEach((child) => {
            if (child.to && path.includes(child.to)) {
              key = child.key;
            }
          });
        }
      });

      setSelectedItemKey(key);
    },
    [menuItems],
  );

  useLayoutEffect(() => {
    handleChangePathname(pathname);
  }, [handleChangePathname, pathname]);

  return (
    <>
      <div className="fixed inset-y-0 left-0 flex h-screen w-66 flex-shrink-0 flex-col space-y-0 rounded-r-2.5xl bg-white shadow-centered">
        <div className="my-4 flex h-24 items-center justify-center px-8">
          <Logo imageClassName="h-24" />
        </div>
        <SidebarMenu items={menuItems} selectedKey={selectedItemKey} onSelect={handleToggleSelectedItem} />
      </div>
      <div className="w-66 flex-shrink-0" />
    </>
  );
};

export default memo(Sidebar);
