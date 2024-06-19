import { useEffect, useMemo } from "react";

import { configSelector } from "@app/selectors/common";
import { ConfigKey } from "@constants/config";

import useSelector from "./useSelector";

const useDocumentTitle = (title: string) => {
  const config = useSelector(configSelector);
  const appName = useMemo(() => config[ConfigKey.APP_NAME], [config]);

  useEffect(() => {
    document.title = `${title} - ${appName}`;
  }, [title, appName]);
};

export default useDocumentTitle;
