import { memo } from "react";
import { LabelProps } from "recharts";

interface ChartLabelProps extends LabelProps {
  unit?: string;
}

const ChartLabel = ({ x = 0, y, value, width = 0, height, unit }: ChartLabelProps) => {
  return (
    <text
      className="flex text-center text-base text-black text-inherit"
      dy={Number(height) > 32 ? 24 : -6}
      x={Number(x) + Number(width) / 2}
      y={y}
      textAnchor="middle"
      width={width}
    >
      {value}
      {unit && <tspan className="text-base text-gray-400">{unit}</tspan>}
    </text>
  );
};

export default memo(ChartLabel);
