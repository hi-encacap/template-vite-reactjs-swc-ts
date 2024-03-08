import { memo, useMemo } from "react";

interface ToastMessageProps {
  message?: string;
  title: string;
}

const UMToastMessage = ({ title, message: messageProp }: ToastMessageProps) => {
  const message = useMemo(() => {
    if (title && messageProp) {
      return messageProp;
    }

    return title;
  }, [messageProp, title]);

  return (
    <div className="flex flex-col space-y-0.5 pr-4 font-be-vietnam-pro">
      {title && messageProp && <div className="font-medium text-title">{title}</div>}
      {message && <div className="mt-0.5 pt-px text-sm text-message">{message}</div>}
    </div>
  );
};

const ToastMessage = memo(UMToastMessage);

export default ToastMessage;
