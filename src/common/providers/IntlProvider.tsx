import { ReactNode, memo } from "react";
import { IntlProvider as IntlProviderOriginal } from "react-intl";

import useQuery from "@hooks/useQuery";
import { languageService } from "@services/index";

import { LoadingOverlay } from "../components/Loading";

interface IntlProviderProps {
  children: ReactNode;
}

const UMIntlProvider = ({ children }: IntlProviderProps) => {
  const { data, isLoading } = useQuery({
    queryKey: ["language", "translation"],
    queryFn: languageService.getUserLanguageTranslation,
  });

  if (isLoading || !data) {
    return <LoadingOverlay />;
  }

  return (
    <IntlProviderOriginal locale={data.code} messages={data.translation}>
      {children}
    </IntlProviderOriginal>
  );
};

const IntlProvider = memo(UMIntlProvider);

export default IntlProvider;
