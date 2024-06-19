import { Avatar, Dropdown, MenuProps } from "antd";
import { CircleUserRound, LoaderCircle, LogOut } from "lucide-react";
import { memo, useCallback, useMemo, useState } from "react";
import { useIntl } from "react-intl";
import { Link } from "react-router-dom";

import { userSelector } from "@app/selectors/common";
import { IconWrapper } from "@components/Icon";
import { MANAGER_PATH } from "@constants/path";
import useSelector from "@hooks/useSelector";
import { authService } from "@services/index";

const ContainerHeaderUser = () => {
  const { formatMessage } = useIntl();
  const user = useSelector(userSelector)!;

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClickLogout = useCallback(async () => {
    setIsLoading(true);
    await authService.logout();
    window.location.reload();
  }, []);

  const adminMenuItems = useMemo<Required<MenuProps>["items"]>(
    () => [
      {
        key: "information",
        label: <Link to={MANAGER_PATH.MY.PROFILE}>{formatMessage({ id: "profile" })}</Link>,
        icon: (
          <IconWrapper className="h-5 w-5">
            <CircleUserRound size={18} />
          </IconWrapper>
        ),
        className: "space-x-1",
      },
      {
        type: "divider",
      },
      {
        className: "space-x-1",
        key: "logout",
        label: formatMessage({ id: "logout" }),
        icon: (
          <IconWrapper className="h-5 w-5">
            {!isLoading && <LogOut size={16} />}
            {isLoading && <LoaderCircle className="animate-spin" size={16} />}
          </IconWrapper>
        ),
        onClick: handleClickLogout,
      },
    ],
    [isLoading, formatMessage, handleClickLogout],
  );

  const menuItems = useMemo(() => adminMenuItems, [adminMenuItems]);

  return (
    <Dropdown menu={{ items: menuItems, className: "w-56" }} trigger={["click"]}>
      <Avatar className="bg-primary font-bold text-white" size="large">
        {user.name[0].toUpperCase()}
      </Avatar>
    </Dropdown>
  );
};

export default memo(ContainerHeaderUser);
