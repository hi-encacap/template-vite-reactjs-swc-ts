import { AnyObject } from "antd/es/_util/type";
import { Pencil, Trash2 } from "lucide-react";

import { TableRowActionProps } from "../interface";

import { memo } from "react";
import TableRowActionButton from "./ActionButton";

const TableRowAction = <T extends AnyObject>({
  isDisabled,
  record,
  onClickDelete,
  onClickEdit,
}: TableRowActionProps<T>) => {
  return (
    <div className="flex items-center justify-center space-x-4 px-4">
      {onClickEdit && (
        <TableRowActionButton isDisabled={isDisabled} record={record} onClick={onClickEdit}>
          <Pencil size={16} />
        </TableRowActionButton>
      )}
      {onClickDelete && (
        <TableRowActionButton
          className="bg-red-100 text-red-500"
          isDisabled={isDisabled}
          record={record}
          onClick={onClickDelete}
        >
          <Trash2 size={16} />
        </TableRowActionButton>
      )}
    </div>
  );
};

export default memo(TableRowAction) as typeof TableRowAction;
