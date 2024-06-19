import { ReactNode, memo } from "react";
import { twMerge } from "tailwind-merge";

import { TableColumnType } from "../interface";

import TableHeaderFilter from "./Filter";
import TableHeaderSearch from "./Search";

export interface TableHeaderProps {
  columns: TableColumnType[];
  postfix?: ReactNode;
  search: string;
  isEnableSearch?: boolean;
  onChangeSearch: (value: string) => void;
  onChangeFilter: (dataIndex: string, value?: string | number) => void;
}

const TableHeader = ({
  columns,
  isEnableSearch = true,
  postfix,
  search,
  onChangeSearch,
  onChangeFilter,
}: TableHeaderProps) => {
  return (
    <div
      className={twMerge("flex items-start justify-between", !isEnableSearch && !columns.length && "mb-6")}
    >
      <div className="flex flex-wrap items-center justify-start">
        {isEnableSearch && <TableHeaderSearch value={search} onChange={onChangeSearch} />}
        {columns.map((column) => (
          <TableHeaderFilter key={String(column.dataIndex)} column={column} onChange={onChangeFilter} />
        ))}
      </div>
      {postfix}
    </div>
  );
};

export default memo(TableHeader);
