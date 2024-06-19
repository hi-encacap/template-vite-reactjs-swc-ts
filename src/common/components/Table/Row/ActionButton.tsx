import { Tooltip } from "antd";
import { AnyObject } from "antd/es/_util/type";
import { HTMLAttributes, ReactNode, memo, useCallback } from "react";
import { twMerge } from "tailwind-merge";

interface TableRowActionButtonProps<T = AnyObject>
  extends Omit<HTMLAttributes<HTMLButtonElement>, "onClick"> {
  children: ReactNode;
  isDisabled?: boolean;
  record: T;
  onClick: (record: T) => void;
}

const TableRowActionButton = <T extends AnyObject>({
  children,
  className,
  isDisabled,
  record,
  title,
  onClick,
}: TableRowActionButtonProps<T>) => {
  const handleClick = useCallback(() => {
    onClick(record);
  }, [record, onClick]);

  return (
    <Tooltip title={title} placement="bottom">
      <button
        className={twMerge(
          "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 duration-100 hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400",
          className,
        )}
        disabled={isDisabled}
        type="button"
        onClick={handleClick}
      >
        {children}
      </button>
    </Tooltip>
  );
};

export default memo(TableRowActionButton) as typeof TableRowActionButton;
