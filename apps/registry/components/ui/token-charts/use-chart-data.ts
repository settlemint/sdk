import { theGraphClient, theGraphGraphql } from "@/lib/settlemint/the-graph";
import { useSuspenseQuery } from "@tanstack/react-query";
import { format, subDays, subMonths } from "date-fns";
import { type ChartDataPoint, generateTimeArray, getStartOfCurrentDay, getStartOfCurrentHour } from "./chart-utils";

const TokenVolumes = theGraphGraphql(`
query TokenVolumes($timestamp_gt: Timestamp!, $interval: Aggregation_interval!) {
  tokenVolumeStats_collection(
    where: {timestamp_gt: $timestamp_gt}
    interval: $interval
  ) {
    timestamp
    totalTransfers
    totalVolume
    token {
      id
      name
      symbol
    }
  }
}
`);

const TokenVolumesPerToken = theGraphGraphql(`
  query TokenVolumes($timestamp_gt: Timestamp!, $interval: Aggregation_interval!, $tokenId: Bytes!) {
    tokenVolumeStats_collection(
      where: {timestamp_gt: $timestamp_gt, token_: {id: $tokenId}}
      interval: $interval
    ) {
      timestamp
      totalTransfers
      totalVolume
      token {
        id
        name
        symbol
      }
    }
  }
  `);

export const useVolumeChartData = (interval: "hour" | "day", token?: string) => {
  return useSuspenseQuery({
    queryKey: ["token-volumes", interval, token],
    queryFn: async () => {
      const since = interval === "hour" ? subDays(getStartOfCurrentHour(), 2) : subMonths(getStartOfCurrentDay(), 2);

      const { tokenVolumeStats_collection: rawChartData } = token
        ? await theGraphClient.request(TokenVolumesPerToken, {
            interval,
            timestamp_gt: `${since.getTime()}000`,
            tokenId: token,
          })
        : await theGraphClient.request(TokenVolumes, { interval, timestamp_gt: `${since.getTime()}000` });

      const timeArray = generateTimeArray(since, interval);

      const aggregatedData = rawChartData.reduce(
        (acc, item) => {
          const itemDate = new Date(Number(item.timestamp) / 1000);
          const key =
            interval === "hour"
              ? `${itemDate.getDate()}-${itemDate.getHours()}`
              : `${itemDate.getMonth()}-${itemDate.getDate()}`;

          if (!acc[key]) {
            acc[key] = { transfers: 0, volume: BigInt(0) };
          }
          acc[key].transfers += Number(item.totalTransfers);
          acc[key].volume += BigInt(item.totalVolume);
          return acc;
        },
        {} as Record<string, { transfers: number; volume: bigint }>,
      );

      const formattedData: ChartDataPoint[] = timeArray.map((time) => {
        const key =
          interval === "hour" ? `${time.getDate()}-${time.getHours()}` : `${time.getMonth()}-${time.getDate()}`;
        const aggregatedItem = aggregatedData[key];

        return {
          timestamp: format(time, interval === "hour" ? "HH:mm" : "MMM d"),
          transfers: aggregatedItem?.transfers ?? 0,
          volume: Number(aggregatedItem?.volume ?? BigInt(0)) / 1e18,
        };
      });

      return formattedData;
    },
    refetchInterval: 10 * 60 * 1000,
  });
};
