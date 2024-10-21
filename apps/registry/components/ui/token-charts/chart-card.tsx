"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Minus, TrendingDown, TrendingUp } from "lucide-react";
import type React from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import type { ChartDataPoint } from "./chart-utils";

interface ChartCardProps {
  title: string;
  description: string;
  data: ChartDataPoint[];
  dataKey: "volume" | "transfers";
  color: string;
  trend: { percentage: number; direction: "up" | "down" | "flat" };
  interval: "hour" | "day";
  chartConfig: ChartConfig;
}

export const ChartCard: React.FC<ChartCardProps> = ({
  title,
  description,
  data,
  dataKey,
  color,
  trend,
  interval,
  chartConfig,
}) => {
  const renderTrendInfo = () => {
    const icon =
      trend.direction === "up" ? (
        <TrendingUp className="h-4 w-4" />
      ) : trend.direction === "down" ? (
        <TrendingDown className="h-4 w-4" />
      ) : (
        <Minus className="h-4 w-4" />
      );

    return (
      <div className="flex gap-2 font-medium leading-none">
        {trend.direction === "flat" ? "No change" : `Trending ${trend.direction} by ${trend.percentage.toFixed(1)}%`}{" "}
        {icon}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="timestamp" tickLine={false} tickMargin={10} axisLine={false} />
            <YAxis tickLine={false} tickMargin={10} axisLine={false} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
            <Bar dataKey={dataKey} fill={color} radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        {renderTrendInfo()}
        <div className="leading-none text-muted-foreground">
          Showing total {dataKey} for the last {interval === "hour" ? "24 hours" : "30 days"}
        </div>
      </CardFooter>
    </Card>
  );
};
