import { get } from "lodash";
import { memo } from "react";
import { useIntl } from "react-intl";
import { TooltipProps } from "recharts";
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";

import ChartLegendItemShape from "./LegendItemShape";

const ChartTooltipItem = <TValue extends ValueType, TName extends NameType>({
  payload,
  dataKey,
  ...props
}: Required<TooltipProps<TValue, TName>>["payload"][number]) => {
  const { formatMessage } = useIntl();

  const fill = get(props, "fill");
  const stroke = get(props, "stroke");
  const strokeWidth = get(props, "strokeWidth", 0);
  const type = get(props, "type");

  return (
    <div className="flex items-center space-x-3">
      <ChartLegendItemShape fill={fill} stroke={stroke} strokeWidth={Number(strokeWidth)} type={type!} />
      <div className="flex items-center">
        {dataKey && <div>{formatMessage({ id: dataKey.toString() })}</div>}
        <span className="mr-1">:</span>
        <div>{payload[dataKey!.toString()]}</div>
      </div>
    </div>
  );
};

export default memo(ChartTooltipItem) as typeof ChartTooltipItem;
