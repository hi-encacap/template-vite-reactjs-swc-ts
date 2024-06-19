import { useQuery } from "@tanstack/react-query";
import { ReactNode, memo, useEffect } from "react";

import { setConfig } from "@app/slices/common";
import useDispatch from "@hooks/useDispatch";
import { configService } from "@services/index";

interface AuthProviderProps {
  children: ReactNode;
  onLoad: VoidFunction;
}

const ConfigProvider = ({ children, onLoad }: AuthProviderProps) => {
  const { data, isLoading } = useQuery({
    queryKey: ["config", "general"],
    queryFn: configService.getConfigs,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoading) {
      onLoad();
    }
  }, [isLoading, onLoad]);

  useEffect(() => {
    if (!data) {
      return;
    }

    dispatch(setConfig(data));
  }, [data, dispatch]);

  return children;
};

export default memo(ConfigProvider);
