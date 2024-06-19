import { memo } from "react";
import { TooltipProps } from "recharts";
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";

import ChartTooltipItem from "./TooltipItem";

const ChartTooltip = <TValue extends ValueType, TName extends NameType>({
  payload,
  label,
}: TooltipProps<TValue, TName>) => {
  if (!payload || !payload.length) {
    return null;
  }

  return (
    <div className="flex flex-col rounded-lg border-2 border-gray-200 bg-white text-sm shadow-centered">
      <data className="w-full border-b-2 border-gray-100 px-4 py-3 font-semibold">{label}</data>
      <div className="flex flex-col space-y-3 p-4">
        {payload.map((entry) => (
          <ChartTooltipItem key={String(entry.dataKey)} {...entry} />
        ))}
      </div>
    </div>
  );
};

export default memo(ChartTooltip);
