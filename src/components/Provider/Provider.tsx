import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, memo, useMemo } from "react";

import IntlProvider from "./IntlProvider";

interface UnmemorizedProviderProps {
  children: ReactNode;
}

const UMProvider = ({ children }: UnmemorizedProviderProps) => {
  const queryClient = useMemo(() => new QueryClient(), []);

  return (
    <QueryClientProvider client={queryClient}>
      <IntlProvider>{children}</IntlProvider>
    </QueryClientProvider>
  );
};

const Provider = memo(UMProvider);

export default Provider;
