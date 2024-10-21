import { addDays, addHours } from "date-fns";

export interface ChartDataPoint {
  timestamp: string;
  transfers: number;
  volume: number;
}

export const getStartOfCurrentHour = () => {
  const now = new Date();
  now.setMinutes(0, 0, 0);
  return now;
};

export const getStartOfCurrentDay = () => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return now;
};

export const generateTimeArray = (since: Date, interval: "hour" | "day"): Date[] => {
  const result: Date[] = [];
  const now = new Date();
  let current = since;

  while (current <= now) {
    result.push(current);
    current = interval === "hour" ? addHours(current, 1) : addDays(current, 1);
  }

  return result;
};

export const calculateTrend = (data: ChartDataPoint[], key: "volume" | "transfers") => {
  if (data.length < 2) return { percentage: 0, direction: "flat" as const };

  const midPoint = Math.floor(data.length / 2);
  const currentPeriod = data.slice(midPoint);
  const previousPeriod = data.slice(0, midPoint);

  const currentTotal = currentPeriod.reduce((sum, item) => sum + item[key], 0);
  const previousTotal = previousPeriod.reduce((sum, item) => sum + item[key], 0);

  if (previousTotal === 0) return { percentage: 0, direction: "flat" as const };

  const percentageChange = ((currentTotal - previousTotal) / previousTotal) * 100;
  const direction =
    percentageChange > 0 ? ("up" as const) : percentageChange < 0 ? ("down" as const) : ("flat" as const);

  return { percentage: Math.abs(percentageChange), direction };
};
