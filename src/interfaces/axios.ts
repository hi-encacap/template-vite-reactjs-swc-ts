export interface IAxiosResponseMeta {
  page: number;
  limit: number;
  totalPage: number;
  totalResults: number;
}

export interface IAxiosResponse<T = unknown> extends IAxiosResponseMeta {
  results: T;
}
