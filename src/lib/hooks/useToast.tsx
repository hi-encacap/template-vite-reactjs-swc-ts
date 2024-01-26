import { useCallback, useMemo } from "react";
import { ToastOptions, toast } from "react-toastify";

import { ToastMessage } from "@components/Toast";

type IToastHandler = (title: string, message?: string, options?: ToastOptions) => void;
interface IToast {
  success: IToastHandler;
  error: IToastHandler;
  info: IToastHandler;
  warn: IToastHandler;
  warning: IToastHandler;
}

const useToast = () => {
  const handler = useMemo(() => ({}) as IToast, []);

  const showToast = useCallback(
    (title: string, message: string, options?: ToastOptions) =>
      toast(<ToastMessage title={title} message={message} />, options),
    [],
  );

  handler.success = useCallback(
    (title: string, message = "", options?: ToastOptions) => {
      return showToast(title, message, { ...options, type: "success" });
    },
    [showToast],
  );

  handler.error = useCallback(
    (title: string, message = "", options?: ToastOptions) => {
      return showToast(title, message, { ...options, type: "error" });
    },
    [showToast],
  );

  handler.info = useCallback(
    (title: string, message = "", options?: ToastOptions) => {
      return showToast(title, message, { ...options, type: "info" });
    },
    [showToast],
  );

  handler.warn = useCallback(
    (title: string, message = "", options?: ToastOptions) => {
      return showToast(title, message, { ...options, type: "warning" });
    },
    [showToast],
  );

  handler.warning = handler.warn;

  return handler;
};

export default useToast;
