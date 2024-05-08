import { ReactNode, memo, useEffect } from "react";
import { IntlProvider as IntlProviderOriginal } from "react-intl";

import useQuery from "@/common/hooks/useQuery";
import { languageService } from "@services/index";

interface IntlProviderProps {
  children: ReactNode;
  onLoad: VoidFunction;
}

const IntlProvider = ({ children, onLoad }: IntlProviderProps) => {
  const { data, isLoading } = useQuery({
    queryKey: ["language", "translation"],
    queryFn: languageService.getUserLanguageTranslation,
  });

  useEffect(() => {
    if (!isLoading && data) {
      onLoad();
    }
  }, [data, isLoading, onLoad]);

  if (isLoading || !data) {
    return null;
  }

  return (
    <IntlProviderOriginal locale={data.code} messages={data.translation}>
      {children}
    </IntlProviderOriginal>
  );
};

export default memo(IntlProvider);
