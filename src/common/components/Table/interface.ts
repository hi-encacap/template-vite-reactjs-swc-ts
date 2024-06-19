import { TableColumnType as AntdTableColumnType, SpinProps } from "antd";
import { AnyObject } from "antd/es/_util/type";
import { ColumnFilterItem, FilterValue } from "antd/es/table/interface";

import { TableParams } from "@interfaces/common";

export type ColumnGetFilterOptions = (search: string) => Promise<ColumnFilterItem[]> | ColumnFilterItem[];

export interface TableColumnType<T = AnyObject> extends AntdTableColumnType<T> {
  onGetFilterOptions?: ColumnGetFilterOptions;
}

export type TableColumnsType<T = AnyObject> = TableColumnType<T>[];

export type TableFilterChangeHandler = (
  dataIndex: string,
  value?: string | number | string[] | number[],
) => void;

export type TableFiltersChangeHandler = (filters: Record<string, FilterValue>) => void;

export interface TableContextType<T = AnyObject> {
  dataSource: readonly T[];
  loading?: boolean | SpinProps;
  params: TableParams<T>;
  onChangeFilter: TableFilterChangeHandler;
}

export interface TableRowActionProps<T = AnyObject> {
  isDisabled?: boolean;
  record: T;
  onClickEdit?: (record: T) => void;
  onClickDelete?: (record: T) => void;
}
