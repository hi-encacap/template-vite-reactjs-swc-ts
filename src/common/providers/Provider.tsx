import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, memo, useMemo } from "react";

import AxiosProvider from "./AxiosProvider";
import IntlProvider from "./IntlProvider";
import ToastProvider from "./ToastProvider";

interface UnmemorizedProviderProps {
  children: ReactNode;
}

const UMProvider = ({ children }: UnmemorizedProviderProps) => {
  const queryClient = useMemo(() => new QueryClient(), []);

  return (
    <>
      <ToastProvider />
      <AxiosProvider>
        <QueryClientProvider client={queryClient}>
          <IntlProvider>{children}</IntlProvider>
        </QueryClientProvider>
      </AxiosProvider>
    </>
  );
};

const Provider = memo(UMProvider);

export default Provider;
