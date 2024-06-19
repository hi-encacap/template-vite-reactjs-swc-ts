import { Table as AntdTable, TableProps as AntdTableProps, Pagination } from "antd";
import { AnyObject } from "antd/es/_util/type";
import { GetRowKey } from "antd/es/table/interface";
import { ReactNode, memo, useCallback, useEffect, useMemo, useState } from "react";
import { useIntl } from "react-intl";
import { twMerge } from "tailwind-merge";

import { GET_DEFAULT_TABLE_PARAMS } from "@constants/common";
import { TableParams } from "@interfaces/common";

import TableEmpty from "./Empty";
import TableHeader, { TableHeaderProps } from "./Header/Header";
import TableContext from "./context";
import { TableColumnType, TableContextType, TableFilterChangeHandler } from "./interface";

export interface TableProps<T>
  extends Omit<AntdTableProps<T>, "onChange" | "columns">,
    Pick<TableHeaderProps, "isEnableSearch"> {
  columns: TableColumnType<T>[];
  containerClassName?: string;
  children?: ReactNode;
  filters?: TableParams<T>["filters"];
  headerPostfix?: TableHeaderProps["postfix"];
  isShowPagination?: boolean;
  searchBy?: string[];
  paginationScaleUp?: number;
  onChange?: (
    pagination: TableParams<T>["pagination"],
    filters: TableParams<T>["filters"],
    sorter: TableParams<T>["sorter"],
  ) => void;
}

const Table = <T extends AnyObject>({
  bordered = true,
  columns,
  containerClassName,
  children,
  dataSource = [],
  filters,
  headerPostfix,
  isEnableSearch,
  isShowPagination = true,
  loading,
  rowKey,
  searchBy,
  scroll,
  sticky,
  pagination: paginationProp,
  paginationScaleUp = 1,
  onChange,
}: TableProps<T>) => {
  const { formatMessage } = useIntl();

  const [params, setParams] = useState<TableParams<T>>(
    GET_DEFAULT_TABLE_PARAMS<T>({ pagination: paginationProp, filters }),
  );
  const searchValue = useMemo(() => {
    if (!params.filters) return "";

    return params.filters["search"]?.join("") ?? "";
  }, [params.filters]);
  const hasFilterColumns = useMemo(() => columns.filter((column) => column.onGetFilterOptions), [columns]);

  const getRowKey = useCallback<GetRowKey<T>>(
    (record) => {
      if (typeof rowKey === "function") {
        return rowKey(record);
      }

      return record["key"] ?? record["id"] ?? record["code"];
    },
    [rowKey],
  );

  const handleChangeProps = useCallback<Required<AntdTableProps<T>>["onChange"]>(
    (newPagination, _, sorter) => {
      setParams((prev) => {
        const { pageSize = 0 } = newPagination;

        return {
          ...prev,
          pagination: {
            ...newPagination,
            pageSize: pageSize,
          },
          sorter,
        };
      });
    },
    [],
  );

  const handleChangeSearch = useCallback(
    (value: string) => {
      setParams((prev) => ({
        ...prev,
        pagination: {
          ...prev.pagination,
          current: 1,
        },
        filters: {
          ...prev.filters,
          ...(searchBy ?? ["search"]).reduce(
            (acc, key) => {
              acc[key] = value ? [value] : [];
              return acc;
            },
            {} as TableParams<T>["filters"],
          ),
        },
      }));
    },
    [searchBy],
  );

  const handleChangeFilter: TableFilterChangeHandler = useCallback((dataIndex, value) => {
    setParams((prev) => {
      const filters = { ...prev.filters };
      const pagination = { ...prev.pagination };

      if (!value) {
        delete filters[dataIndex];
      } else {
        filters[dataIndex] = Array.isArray(value) ? value : [value];
      }

      pagination.current = 1;

      return {
        ...prev,
        pagination,
        filters,
      };
    });
  }, []);

  const handleShowTotal = useCallback(
    (total: number, range: [number, number]) => {
      return (
        <div className="text-sm">
          {formatMessage(
            { id: "showing_from_to_of" },
            {
              from: Math.ceil(range[0] / paginationScaleUp),
              to: range[1] / paginationScaleUp,
              of: total / paginationScaleUp,
            },
          )}
        </div>
      );
    },
    [formatMessage, paginationScaleUp],
  );

  const handleChangePagination = useCallback((page: number, pageSize?: number) => {
    setParams((prev) => ({
      ...prev,
      pagination: {
        ...prev.pagination,
        current: page,
        pageSize,
      },
    }));
  }, []);

  const tableContextValue: TableContextType = useMemo(
    () => ({ dataSource, params, loading, onChangeFilter: handleChangeFilter }),
    [dataSource, loading, params, handleChangeFilter],
  );

  useEffect(() => {
    const calculatedPagination = {
      ...params.pagination,
      pageSize: (params.pagination.pageSize ?? 0) / paginationScaleUp,
    };

    onChange?.(calculatedPagination, params.filters, params.sorter);
  }, [params, paginationScaleUp, onChange]);

  return (
    <div
      className={twMerge(
        "rounded-xl bg-white px-6 pb-2 pt-6 shadow-centered",
        loading && !dataSource.length && "pb-6",
        containerClassName,
        (!paginationProp || !isShowPagination) && children && "pb-6",
        !loading && !dataSource.length && "pb-6",
      )}
    >
      <TableHeader
        columns={hasFilterColumns}
        postfix={headerPostfix}
        search={searchValue}
        isEnableSearch={isEnableSearch}
        onChangeSearch={handleChangeSearch}
        onChangeFilter={handleChangeFilter}
      />
      {children && (
        <TableContext.Provider value={tableContextValue}>
          {children}
          {!!dataSource.length && paginationProp && isShowPagination && (
            <Pagination
              className="table-grid-pagination"
              showSizeChanger={false}
              showTotal={handleShowTotal}
              onChange={handleChangePagination}
              {...paginationProp}
            />
          )}
        </TableContext.Provider>
      )}
      {!children && (
        <AntdTable
          bordered={bordered}
          columns={columns}
          locale={{ emptyText: <TableEmpty loading={!!loading} /> }}
          rowKey={getRowKey}
          dataSource={dataSource}
          pagination={
            isShowPagination && {
              ...paginationProp,
              showSizeChanger: false,
              showTotal: handleShowTotal,
            }
          }
          loading={loading}
          scroll={{ x: "100%", ...scroll }}
          sticky={sticky}
          onChange={handleChangeProps}
        />
      )}
    </div>
  );
};

export default memo(Table) as typeof Table;
