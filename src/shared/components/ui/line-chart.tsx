"use client";

import React from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./chart";

export const description = "A reusable dynamic multi-line chart";

type DynamicChartConfig = Record<
  string,
  {
    label: string;
    color: string;
  }
>;

interface ChartLineMultipleProps {
  title?: string;
  data: Record<string, any>[];
  xKey: string;
  yKeys: string[];
  config: DynamicChartConfig;
  yDomain?: [number, number | "auto"];
}

export function ChartLineMultiple({
  title,
  data,
  xKey,
  yKeys,
  config,
  yDomain = [0, "auto"],
}: Readonly<ChartLineMultipleProps>) {
  return (
    <Card className="flex min-h-[58rem] flex-col justify-between pt-7">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          {title || "Dynamic Line Chart"}
        </CardTitle>
      </CardHeader>

      <CardContent className="h-[40rem]">
        <ChartContainer config={config} className="size-full">
          <LineChart
            accessibilityLayer
            data={data}
            margin={{ left: 5, right: 12, bottom: 12 }}
          >
            <CartesianGrid vertical={false} strokeDasharray="10" />
            <XAxis
              dataKey={xKey}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) =>
                typeof value === "string" ? value.slice(0, 3) : value
              }
              tick={{ fontSize: 12 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              domain={yDomain}
              tick={{ fontSize: 12 }}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Legend
              verticalAlign="top"
              height={40}
              formatter={(value) => (
                <span className="text-sm font-medium text-gray-700">
                  {config[value]?.label || value}
                </span>
              )}
            />
            {yKeys.map((key) => (
              <Line
                key={key}
                dataKey={key}
                type="monotone"
                stroke={config[key]?.color || "#000"}
                strokeWidth={2}
                dot={false}
              />
            ))}
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
