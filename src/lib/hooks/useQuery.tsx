import {
  QueryKey,
  UseQueryOptions,
  useQuery as useQueryOriginal,
  UseQueryResult as UseQueryResultOriginal,
} from "@tanstack/react-query";

import { IAxiosResponse } from "@interfaces/axios";

type UseQueryResult<TData, TError> = Omit<UseQueryResultOriginal<TData, TError>, "data"> & {
  data: TData | null;
  meta: unknown;
};

const useQuery = <
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  options: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
): UseQueryResult<TData, TError> => {
  const queryResults = useQueryOriginal(options);
  const response = queryResults.data as IAxiosResponse<TData> | TData;

  if (response && typeof response === "object") {
    if ("data" in response) {
      return {
        ...queryResults,
        meta: response.meta,
        data: response.data,
      };
    }

    return {
      ...queryResults,
      meta: null,
      data: response,
    };
  }

  return {
    ...queryResults,
    meta: null,
    data: null,
  };
};

export default useQuery;
