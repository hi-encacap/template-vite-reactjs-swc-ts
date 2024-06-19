import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, memo, useCallback, useMemo, useState } from "react";
import { Provider as ReduxProvider } from "react-redux";

import { store } from "@app/store";
import { LoadingOverlay } from "@components/Loading";
import { configService, languageService } from "@services/index";

import AntdConfigProvider from "./AntdConfigProvider";
import AuthProvider from "./AuthProvider";
import AxiosProvider from "./AxiosProvider";
import ConfigProvider from "./ConfigProvider";
import IntlProvider from "./IntlProvider";
import ToastProvider from "./ToastProvider";

interface UnmemorizedProviderProps {
  children: ReactNode;
}

const Provider = ({ children }: UnmemorizedProviderProps) => {
  const [isLoadingTranslation, setIsLoadingTranslation] = useState(true);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [isLoadingConfig, setIsLoadingConfig] = useState(true);

  const isLoading = useMemo(
    () => isLoadingTranslation || isLoadingUser || isLoadingConfig,
    [isLoadingTranslation, isLoadingUser, isLoadingConfig],
  );
  const queryClient = useMemo(() => new QueryClient(), []);

  queryClient.prefetchQuery({
    queryKey: ["language", "translation"],
    queryFn: languageService.getUserLanguageTranslation,
    retry: false,
  });
  queryClient.prefetchQuery({
    queryKey: ["config", "general"],
    queryFn: configService.getConfigs,
    retry: false,
  });

  const handleLoadTranslation = useCallback(() => {
    setIsLoadingTranslation(false);
  }, []);

  const handleLoadUser = useCallback(() => {
    setIsLoadingUser(false);
  }, []);

  const handleLoadConfig = useCallback(() => {
    setIsLoadingConfig(false);
  }, []);

  return (
    <>
      <ToastProvider />
      <ReduxProvider store={store}>
        <AntdConfigProvider>
          {isLoading && <LoadingOverlay />}
          <AxiosProvider>
            <QueryClientProvider client={queryClient}>
              <IntlProvider onLoad={handleLoadTranslation}>
                <AuthProvider onLoad={handleLoadUser}>
                  <ConfigProvider onLoad={handleLoadConfig}>{!isLoading && children}</ConfigProvider>
                </AuthProvider>
              </IntlProvider>
            </QueryClientProvider>
          </AxiosProvider>
        </AntdConfigProvider>
      </ReduxProvider>
    </>
  );
};

export default memo(Provider);
