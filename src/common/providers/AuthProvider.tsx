import { setUser } from "@app/slices/common";
import useDispatch from "@hooks/useDispatch";
import { authService } from "@services/index";
import { useQuery } from "@tanstack/react-query";
import { ReactNode, memo, useEffect } from "react";

interface AuthProviderProps {
  children: ReactNode;
  onLoad: VoidFunction;
}

const AuthProvider = ({ children, onLoad }: AuthProviderProps) => {
  const { data, isLoading } = useQuery({
    queryKey: ["auth", "me"],
    queryFn: authService.getMe,
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

    dispatch(setUser(data));
  }, [data, dispatch]);

  return children;
};

export default memo(AuthProvider);
