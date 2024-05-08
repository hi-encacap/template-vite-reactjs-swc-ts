import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, memo, useCallback, useMemo, useState } from "react";
import { Provider as ReduxProvider } from "react-redux";

import { store } from "@app/store";
import { LoadingOverlay } from "@components/Loading";
import AxiosProvider from "./AxiosProvider";
import IntlProvider from "./IntlProvider";
import ToastProvider from "./ToastProvider";

interface UnmemorizedProviderProps {
  children: ReactNode;
}

const Provider = ({ children }: UnmemorizedProviderProps) => {
  const [isLoadingTranslation, setIsLoadingTranslation] = useState(true);

  const isLoading = useMemo(() => isLoadingTranslation, [isLoadingTranslation]);
  const queryClient = useMemo(() => new QueryClient(), []);

  const handleLoadTranslation = useCallback(() => {
    setIsLoadingTranslation(false);
  }, []);

  return (
    <>
      <ToastProvider />
      <ReduxProvider store={store}>
        {isLoading && <LoadingOverlay />}
        <AxiosProvider>
          <QueryClientProvider client={queryClient}>
            <IntlProvider onLoad={handleLoadTranslation}>{!isLoading && children}</IntlProvider>
          </QueryClientProvider>
        </AxiosProvider>
      </ReduxProvider>
    </>
  );
};

export default memo(Provider);
