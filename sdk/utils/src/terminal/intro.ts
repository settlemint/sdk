import { maskTokens } from "@/terminal/mask-tokens.js";
import { magentaBright } from "yoctocolors";

export const intro = (msg: string): void => {
  console.log("");
  console.log(magentaBright(maskTokens(msg)));
  console.log("");
};
