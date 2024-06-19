import { HTMLAttributes, MouseEventHandler, ReactNode, memo } from "react";
import { Link } from "react-router-dom";
import { MenuItem } from "../interface";

interface MenuItemContainerProps extends HTMLAttributes<HTMLDivElement> {
  item: MenuItem;
  children: ReactNode;
}

const MenuItemContainer = ({ item, className, children, onClick, ...props }: MenuItemContainerProps) => {
  if (item.to) {
    return (
      <Link
        to={item.to}
        className={className}
        onClick={onClick as unknown as MouseEventHandler<HTMLAnchorElement>}
      >
        {children}
      </Link>
    );
  }

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div className={className} onClick={onClick} {...props}>
      {children}
    </div>
  );
};

export default memo(MenuItemContainer);
