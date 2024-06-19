import { ForwardRefRenderFunction, forwardRef, memo } from "react";
import { LegendProps } from "recharts";
import { twMerge } from "tailwind-merge";

import ChartLegendItem from "./LegendItem";

interface ChartLegendProps extends LegendProps {
  onGetItemTotal?: (dataKey: string) => number | string;
}

const ChartLegend: ForwardRefRenderFunction<HTMLDivElement, ChartLegendProps> = (
  { payload = [], className, onGetItemTotal },
  ref,
) => {
  if (!payload.length) {
    return null;
  }

  return (
    <div className={twMerge("flex items-center space-x-6", className)} ref={ref}>
      {payload.map((entry) => (
        <ChartLegendItem key={String(entry.dataKey)} onGetTotal={onGetItemTotal} {...entry} />
      ))}
    </div>
  );
};

export default memo(forwardRef(ChartLegend));
