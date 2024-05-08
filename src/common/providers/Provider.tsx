import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, memo, useMemo } from "react";
import { Provider as ReduxProvider } from "react-redux";

import { store } from "@app/store";
import AxiosProvider from "./AxiosProvider";
import IntlProvider from "./IntlProvider";
import ToastProvider from "./ToastProvider";

interface UnmemorizedProviderProps {
  children: ReactNode;
}

const Provider = ({ children }: UnmemorizedProviderProps) => {
  const queryClient = useMemo(() => new QueryClient(), []);

  return (
    <>
      <ToastProvider />
      <ReduxProvider store={store}>
        <AxiosProvider>
          <QueryClientProvider client={queryClient}>
            <IntlProvider>{children}</IntlProvider>
          </QueryClientProvider>
        </AxiosProvider>
      </ReduxProvider>
    </>
  );
};

export default memo(Provider);
