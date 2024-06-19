import {
  QueryKey,
  UseQueryOptions,
  UseQueryResult as UseQueryResultOriginal,
  keepPreviousData,
  useQuery,
} from "@tanstack/react-query";
import { TablePaginationConfig } from "antd";
import { last, unset } from "lodash";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { TableFilterChangeHandler, TableFiltersChangeHandler, TableProps } from "@components/Table";
import { GET_DEFAULT_TABLE_PARAMS } from "@constants/common";
import { IAxiosResponse } from "@interfaces/axios";
import { FetchListQuery } from "@interfaces/common";

type UseTableQueryResult<TData, TError> = Omit<UseQueryResultOriginal<TData, TError>, "data"> & {
  data: TData[] | undefined;
  originalData: (IAxiosResponse<TData[]> & Record<string, unknown>) | undefined;
  pagination: TablePaginationConfig;
  originalPagination: TablePaginationConfig;
  tableParams: FetchListQuery<TData>;
  filters: FetchListQuery<TData>["filters"];
  setTableParams: Required<TableProps<TData>>["onChange"];
  setFilter: TableFilterChangeHandler;
  setFilters: TableFiltersChangeHandler;
};

interface UseTableQueryOptions<TQueryFnData, TError, TData, TQueryKey extends QueryKey>
  extends Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, "queryFn"> {
  pagination?: Partial<TablePaginationConfig> | false;
  filters?: Record<string, unknown>;
  queryFn: (params: FetchListQuery<TData>) => Promise<IAxiosResponse<TData[]>>;
}

const useTableQuery = <
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = readonly unknown[],
>({
  filters,
  pagination,
  queryKey,
  queryFn,
  ...options
}: UseTableQueryOptions<TQueryFnData, TError, TData, TQueryKey>): UseTableQueryResult<TData, TError> => {
  const [tableParams, setTableParams] = useState(GET_DEFAULT_TABLE_PARAMS<TData>({ pagination, filters }));
  const [prevTotalResults, setPrevTotalResults] = useState(0);

  const isTouchedRef = useRef(false);

  const queryResults = useQuery<IAxiosResponse<TData[]>, TError, IAxiosResponse<TData[]>>({
    ...(options as UseQueryOptions<IAxiosResponse<TData[]>, TError, IAxiosResponse<TData[]>>),
    retry: false,
    enabled: isTouchedRef.current,
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [...queryKey, tableParams],
    placeholderData: keepPreviousData,
    queryFn: ({ queryKey }) => {
      const params = last(queryKey) as FetchListQuery<TData>;

      if (pagination === false) {
        unset(params, "pagination");
      }

      return queryFn(params);
    },
  });

  const { data, isFetching: isFetchingResult, refetch } = queryResults;

  const isFetching = useMemo(() => {
    if (!isTouchedRef.current) return true;

    return isFetchingResult;
  }, [isFetchingResult]);

  const resPagination = useMemo(() => {
    const { pagination } = tableParams;

    return {
      ...pagination,
      total: data?.totalResults ?? prevTotalResults,
    };
  }, [data, tableParams, prevTotalResults]);

  const handleChangeTableParams = useCallback<Required<TableProps<TData>>["onChange"]>(
    (newPagination, newFilters, newSorter) => {
      isTouchedRef.current = true;

      setTableParams((prev) => ({
        ...prev,
        pagination: newPagination,
        filters: newFilters,
        sorter: newSorter,
      }));
    },
    [],
  );

  const handleChangeTableFilter: TableFilterChangeHandler = useCallback((dataIndex, value) => {
    setTableParams(({ filters, pagination, ...prev }) => {
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

  const handleChangeTableFilters: TableFiltersChangeHandler = useCallback((filters) => {
    setTableParams(({ filters: prevFilters, pagination, ...prev }) => {
      const newFilters = { ...prevFilters, ...filters };

      pagination.current = 1;

      return {
        ...prev,
        pagination,
        filters: newFilters,
      };
    });
  }, []);

  useEffect(() => {
    if (!data) return;

    setPrevTotalResults(data.totalResults);
  }, [data]);

  return {
    ...queryResults,
    data: data?.results,
    originalData: data,
    isFetching,
    pagination: resPagination,
    originalPagination: pagination,
    tableParams,
    refetch,
    setTableParams: handleChangeTableParams,
    setFilter: handleChangeTableFilter,
    setFilters: handleChangeTableFilters,
  } as UseTableQueryResult<TData, TError>;
};

export default useTableQuery;
