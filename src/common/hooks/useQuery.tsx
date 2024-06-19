import {
  QueryKey,
  UseQueryOptions,
  useQuery as useQueryOriginal,
  UseQueryResult as UseQueryResultOriginal,
} from "@tanstack/react-query";

import { IAxiosResponse, IAxiosResponseMeta } from "@/interfaces/axios";

type UseQueryResult<TData, TError> = Omit<UseQueryResultOriginal<TData, TError>, "data"> &
  IAxiosResponseMeta & {
    results: TData;
  };

const useQuery = <
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  options: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
): UseQueryResult<TData, TError> | TData => {
  const queryResults = useQueryOriginal(options);
  const response = queryResults.data as IAxiosResponse<TData> | TData;

  if (response && typeof response === "object") {
    if ("results" in response) {
      return {
        ...queryResults,
        ...response,
        results: response.results,
      };
    }

    return response as TData;
  }

  return queryResults as unknown as IAxiosResponseMeta & TData;
};

export default useQuery;
