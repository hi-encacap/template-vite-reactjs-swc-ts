import { memo } from "react";
import { LegendType } from "recharts";
import { twMerge } from "tailwind-merge";

interface ChartLegendItemShapeProps {
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  type: LegendType;
}

const ChartLegendItemShape = ({ fill, type, stroke, strokeWidth }: ChartLegendItemShapeProps) => {
  if (type === "line") {
    return (
      <div className="relative flex h-5 w-5 items-center justify-center">
        <div
          className={twMerge("h-0 w-full", strokeWidth && "border-t")}
          style={{
            backgroundColor: fill,
            borderColor: stroke,
            borderWidth: (strokeWidth ?? 2) / 1.5,
            borderStyle: "solid",
          }}
        />
        <div
          className={twMerge(
            "absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full",
            strokeWidth && "border",
          )}
          style={{ backgroundColor: fill, borderColor: stroke, borderWidth: strokeWidth }}
        />
      </div>
    );
  }

  return (
    <div
      className="h-5 w-5 rounded"
      style={{
        backgroundColor: fill,
        borderColor: stroke,
        borderWidth: strokeWidth,
        borderStyle: "solid",
      }}
    />
  );
};

export default memo(ChartLegendItemShape);
