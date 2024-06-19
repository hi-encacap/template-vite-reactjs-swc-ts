import { ButtonProps } from "antd";
import { Plus } from "lucide-react";
import { ReactNode, memo, useMemo } from "react";

import { Button } from "@components/Button";

interface BlockButtonProps extends ButtonProps {
  icon?: "add" | ReactNode;
  title: string;
}

const BlockButton = ({ icon: iconProp, title, ...props }: BlockButtonProps) => {
  const icon = useMemo(() => {
    if (iconProp === "add") {
      return <Plus size={18} strokeWidth={2.5} />;
    }

    return iconProp;
  }, [iconProp]);

  return (
    <Button className="flex items-center justify-center" type="primary" {...props}>
      <span className="uppercase">{title}</span>
      {icon && (
        <div className="ml-4 flex h-11 items-center justify-center border-l border-white pl-4">{icon}</div>
      )}
    </Button>
  );
};

export default memo(BlockButton);
