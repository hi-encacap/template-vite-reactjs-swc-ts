import { get } from "lodash";
import { memo, useMemo } from "react";
import { useIntl } from "react-intl";
import { LegendProps } from "recharts";

import ChartLegendItemShape from "./LegendItemShape";

interface ChartLegendItemProps extends Partial<Required<LegendProps>["payload"][number]> {
  onGetTotal?: (dataKey: string) => number | string;
}

const ChartLegendItem = ({ payload, dataKey, type, onGetTotal }: ChartLegendItemProps) => {
  const { formatMessage } = useIntl();

  const total = useMemo(() => onGetTotal?.(dataKey!.toString()), [dataKey, onGetTotal]);

  const fill = get(payload, "fill");
  const stroke = get(payload, "stroke");
  const strokeWidth = get(payload, "strokeWidth");

  return (
    <div className="flex items-center justify-start space-x-3">
      <ChartLegendItemShape fill={fill} stroke={stroke} strokeWidth={strokeWidth} type={type!} />
      <div className="flex items-center">
        {dataKey && <div>{formatMessage({ id: dataKey.toString() })}</div>}
        {total && (
          <>
            <div className="mr-1">:</div>
            <div className="font-semibold">{total}</div>
          </>
        )}
      </div>
    </div>
  );
};

export default memo(ChartLegendItem);
