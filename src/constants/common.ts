import { TablePaginationConfig } from "antd";
import { AnyObject } from "antd/es/_util/type";
import { cloneDeep, set, unset } from "lodash";

import { FetchListQuery } from "@interfaces/common";

interface GetDefaultTableParams {
  pagination?: Partial<TablePaginationConfig> | false;
  filters: AnyObject;
}

export const DEFAULT_TABLE_PARAMS: FetchListQuery<AnyObject> = {
  pagination: {
    current: 1,
    pageSize: 10,
  },
  filters: {},
  sorter: [],
};

export const GET_DEFAULT_TABLE_PARAMS = <T = unknown>(
  params?: Partial<GetDefaultTableParams> | undefined,
): FetchListQuery<T> => {
  const data = cloneDeep(DEFAULT_TABLE_PARAMS) as FetchListQuery<T>;
  const { pagination, filters } = params ?? {};

  if (pagination) {
    const { pageSize } = pagination;

    set(data, "pagination.pageSize", pageSize);
  }

  if (pagination === false) {
    unset(data, "pagination");
  }

  if (filters) {
    set(data, "filters", filters);
  }

  return data;
};

export const DEFAULT_DEBOUNCE_TIME = 500;

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
}

export enum PaymentMethod {
  CASH = "CASH",
  CARD = "CARD",
  TRANSFER = "BANKING",
}
