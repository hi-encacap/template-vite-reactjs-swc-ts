import { isAxiosError } from "axios";
import { ReactNode, memo, useCallback, useEffect } from "react";

import { axios } from "@utils/index";

interface AxiosProviderProps {
  children: ReactNode;
}

const UMAxiosProvider = ({ children }: AxiosProviderProps) => {
  const handleAxiosError = useCallback((error: unknown) => {
    if (isAxiosError(error)) {
      // const { response } = error;
      // if (response) {
      //   const { data, status } = response as AxiosResponse<unknown>;
      //   toast.error(`${status}: ${String(data)}`);
      // }
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
