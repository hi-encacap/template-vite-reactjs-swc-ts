import { memo } from "react";

interface TableHeaderFilterLabelProps {
  title: string;
  text: string;
}

const TableHeaderFilterLabel = ({ text, title }: TableHeaderFilterLabelProps) => {
  return (
    <div>
      <span className="font-semibold">{title}</span>
      <span className="mr-1">:</span>
      <span>{text}</span>
    </div>
  );
};

export default memo(TableHeaderFilterLabel);
