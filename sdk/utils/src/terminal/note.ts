import { maskTokens } from "@/terminal/mask-tokens.js";
import { yellowBright } from "yoctocolors";

export const note = (message: string, level: "info" | "warn" = "info"): void => {
  console.log("");
  const maskedMessage = maskTokens(message);
  if (level === "warn") {
    console.warn(yellowBright(maskedMessage));
  } else {
    console.log(maskedMessage);
  }
};
