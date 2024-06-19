import { ReactNode, memo, useCallback, useEffect } from "react";

import { setUser } from "@app/slices/common";
import useDispatch from "@hooks/useDispatch";
import { authService } from "@services/index";
import { handleAxiosError, normalizeRequestConfig } from "@utils/helpers";
import { axios } from "@utils/index";

interface AxiosProviderProps {
  children: ReactNode;
}

const AxiosProvider = ({ children }: AxiosProviderProps) => {
  const dispatch = useDispatch();

  const handleUnauthorized = useCallback(
    (error: unknown) => {
      authService.removeTokens();
      dispatch(setUser(null));

      return Promise.reject(error);
    },
    [dispatch],
  );

  useEffect(() => {
    axios.setRequestInterceptor(normalizeRequestConfig);
    axios.setResponseInterceptor(
      (response) => response,
      (error) => handleAxiosError(error, axios, { onUnauthorized: handleUnauthorized }),
    );
  }, [handleUnauthorized]);

  return children;
};

export default memo(AxiosProvider);
