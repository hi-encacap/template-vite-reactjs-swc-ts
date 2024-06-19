import { HttpStatusCode, InternalAxiosRequestConfig, isAxiosError } from "axios";

import { authService } from "@services/index";

import { Axios } from "./axios/axios";

interface AxiosErrorHandler {
  onUnauthorized?: (error: unknown) => void;
}

const slugify = (text: string): string => {
  let result = text.toLowerCase();

  result = result.replace(/(?<id>à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/gu, "a");
  result = result.replace(/(?<id>è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/gu, "e");
  result = result.replace(/(?<id>ì|í|ị|ỉ|ĩ)/gu, "i");
  result = result.replace(/(?<id>ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/gu, "o");
  result = result.replace(/(?<id>ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/gu, "u");
  result = result.replace(/(?<id>ỳ|ý|ỵ|ỷ|ỹ)/gu, "y");
  result = result.replace(/(?<id>đ)/gu, "d");

  result = result.replace(/(?<id>[^0-9a-z-\s])/g, "");

  result = result.replace(/(?<id>\s+)/g, "-");

  result = result.replace(/^-+/g, "");

  result = result.replace(/-+$/g, "");

  return result;
};

const beautyPrice = (price: number): string => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const normalizePrice = (price: string): number => {
  return parseFloat(price.replace(/,/g, ""));
};

const normalizeRequestConfig = (request: InternalAxiosRequestConfig) => {
  const { headers, params } = request;

  if (headers) {
    const { accessToken } = authService.getTokens();

    if (accessToken) {
      headers.Authorization = `Bearer ${String(accessToken)}`;
    }
  }

  if (params) {
    const { filters, pagination, sorter, ...newParams } = params;

    if (pagination) {
      newParams.page = pagination.current;
      newParams.limit = pagination.pageSize;
    }

    if (filters) {
      Object.keys(filters).forEach((key) => {
        if (key.includes("[]")) {
          const newKey = key.replace("[]", "");

          newParams[newKey] = filters[key];
          return;
        }

        newParams[key] = filters[key].join(",");
      });
    }

    if (sorter && "field" in sorter && "order" in sorter) {
      const { field } = sorter;
      const sortOrderNumber = sorter.order === "ascend" ? 1 : -1;

      newParams.sortBy = `${field},${sortOrderNumber}`;
    }

    // Remove all empty string from newParams
    request.params = Object.keys(newParams).reduce(
      (acc, key) => {
        const value = newParams[key];

        if (value !== "") {
          acc[key] = value;
        }

        return acc;
      },
      {} as Record<string, string>,
    );
  }

  return request;
};

const handleAxiosError = async (
  error: unknown,
  instance: Readonly<Axios>,
  { onUnauthorized }: AxiosErrorHandler,
) => {
  if (!isAxiosError(error)) {
    return Promise.reject(error);
  }

  const { response, config } = error;

  if (response && config) {
    const { status } = response;
    const autoRefreshToken = config.autoRefreshToken;

    if (status === HttpStatusCode.Unauthorized) {
      try {
        if (autoRefreshToken !== false) {
          const { refreshToken } = authService.getTokens();

          if (refreshToken) {
            const newTokens = await authService.refreshToken(refreshToken);

            authService.setTokens(newTokens.accessToken, newTokens.refreshToken);

            config.headers.Authorization = `Bearer ${newTokens.accessToken}`;
            config.autoRefreshToken = false;

            return instance.request(config);
          }
        }

        throw error;
      } catch (refreshTokenError) {
        return onUnauthorized?.(error);
      }
    }
  }

  return Promise.reject(error);
};

const getScreenSize = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  return {
    width,
    height,
  };
};

export { beautyPrice, getScreenSize, handleAxiosError, normalizePrice, normalizeRequestConfig, slugify };
