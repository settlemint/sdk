"use client";

import type { ChartConfig } from "@/components/ui/chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChartCard } from "@/components/ui/token-charts/chart-card";
import { calculateTrend } from "@/components/ui/token-charts/chart-utils";
import { useVolumeChartData } from "@/components/ui/token-charts/use-chart-data";
import { useState } from "react";

const chartConfig = {
  volume: {
    label: "Volume",
    color: "hsl(var(--chart-1))",
  },
  transfers: {
    label: "Transfers",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function TokenCharts({ token }: { token?: string }) {
  const [selectedInterval, setSelectedInterval] = useState<"hour" | "day">("day");
  const { data } = useVolumeChartData(selectedInterval, token);

  const volumeTrend = calculateTrend(data ?? [], "volume");
  const transfersTrend = calculateTrend(data ?? [], "transfers");

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-primary">Token Statistics</h3>
        <Select
          value={selectedInterval}
          onValueChange={(value) => {
            setSelectedInterval(value as "hour" | "day");
          }}
        >
          <SelectTrigger className="h-8 w-[100px] text-sm bg-card">
            <SelectValue placeholder={selectedInterval} />
          </SelectTrigger>
          <SelectContent side="top">
            <SelectItem key="hour" value="hour">
              Per hour
            </SelectItem>
            <SelectItem key="day" value="day">
              Per day
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <ChartCard
          title={`Volume per ${selectedInterval}`}
          description={`${data?.[0]?.timestamp} - ${data?.[data.length - 1]?.timestamp}`}
          data={data ?? []}
          dataKey="volume"
          color="var(--color-volume)"
          trend={volumeTrend}
          interval={selectedInterval}
          chartConfig={chartConfig}
        />
        <ChartCard
          title={`Transfers per ${selectedInterval}`}
          description={`${data?.[0]?.timestamp} - ${data?.[data.length - 1]?.timestamp}`}
          data={data ?? []}
          dataKey="transfers"
          color="var(--color-transfers)"
          trend={transfersTrend}
          interval={selectedInterval}
          chartConfig={chartConfig}
        />
      </div>
    </>
  );
}
