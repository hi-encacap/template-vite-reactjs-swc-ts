export interface IAxiosResponseMeta {
  total: number;
  page: number;
  limit: number;
}

export interface IAxiosResponse<T = unknown> {
  data: T;
  meta: IAxiosResponseMeta;
}
