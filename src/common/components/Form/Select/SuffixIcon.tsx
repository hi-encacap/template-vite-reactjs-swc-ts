import { Spin } from "antd";
import { ChevronDown, LoaderCircle } from "lucide-react";
import { memo } from "react";

interface SuffixIconProps {
  loading?: boolean;
}

const SuffixIcon = ({ loading }: SuffixIconProps) => {
  if (loading) {
    return <Spin indicator={<LoaderCircle className="animate-spin text-gray-400" />} size="small" />;
  }

  return <ChevronDown size={18} className="-mr-0.5 mt-px" />;
};

export default memo(SuffixIcon);
