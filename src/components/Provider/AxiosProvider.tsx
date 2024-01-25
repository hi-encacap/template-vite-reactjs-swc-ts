import { isAxiosError } from "axios";
import { ReactNode, memo, useCallback, useEffect } from "react";

import { axios } from "@utils/index";

interface AxiosProviderProps {
  children: ReactNode;
}

const UMAxiosProvider = ({ children }: AxiosProviderProps) => {
  const handleAxiosError = useCallback((error: unknown) => {
    if (isAxiosError(error)) {
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }, []);

  useEffect(() => {
    axios.setResponseInterceptor((response) => response, handleAxiosError);
  }, [handleAxiosError]);

  return children;
};

const AxiosProvider = memo(UMAxiosProvider);

export default AxiosProvider;
