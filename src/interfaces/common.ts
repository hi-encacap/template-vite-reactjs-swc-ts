import { GetProp, TablePaginationConfig, TableProps } from "antd";
import { AnyObject } from "antd/es/_util/type";
import { SorterResult } from "antd/es/table/interface";
import { Control } from "react-hook-form";
import { IntlFormatters } from "react-intl";
import { AnySchema } from "yup";

import { ConfigKey } from "@constants/config";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FormControl = Control<any>;

export type FormatMessage = IntlFormatters["formatMessage"];

export type FormValidationSchemaShapeType<T> = {
  [P in keyof T]: AnySchema;
};

export interface IConfig {
  key: ConfigKey;
  value: string | number;
}

export type INormalizedConfig = Record<ConfigKey, string | number>;

export type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

export interface TableParams<T = AnyObject> {
  pagination: TablePaginationConfig;
  filters: Parameters<GetProp<TableProps, "onChange">>[1];
  sorter: SorterResult<T> | SorterResult<T>[];
}

export type FetchListQuery<T = AnyObject> = TableParams<T> & Record<string, unknown>;

export interface IUploadResponse {
  url: string;
}
