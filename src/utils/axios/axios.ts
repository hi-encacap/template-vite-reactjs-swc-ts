import { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";

import AxiosSingleton from "./axiosSingleton";

export class Axios {
  private instance: AxiosInstance;

  constructor() {
    this.instance = AxiosSingleton.getInstance();
  }

  public request<T = unknown>(config: AxiosRequestConfig) {
    return this.instance.request<T>(config);
  }

  public get<T = unknown>(url: string, config?: AxiosRequestConfig) {
    return this.instance.get<T>(url, config);
  }

  public delete<T = unknown>(url: string, config?: AxiosRequestConfig) {
    return this.instance.delete<T>(url, config);
  }

  public post<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    return this.instance.post<T>(url, data, config);
  }

  public put<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    return this.instance.put<T>(url, data, config);
  }

  public patch<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    return this.instance.patch<T>(url, data, config);
  }

  public setRequestInterceptor(
    onFulfilled?: (value: InternalAxiosRequestConfig) => InternalAxiosRequestConfig,
    onRejected?: (error: unknown) => unknown,
  ) {
    return this.instance.interceptors.request.use(onFulfilled, onRejected);
  }

  public setResponseInterceptor(
    onFulfilled?: (value: AxiosResponse<unknown>) => AxiosResponse<unknown>,
    onRejected?: (error: unknown) => unknown,
  ) {
    return this.instance.interceptors.response.use(onFulfilled, onRejected);
  }
}

const axios = Object.freeze(new Axios());

export default axios;
