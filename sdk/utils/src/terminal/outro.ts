import { maskTokens } from "@/terminal/mask-tokens.js";
import { greenBright, inverse } from "yoctocolors";

export const outro = (msg: string): void => {
  console.log("");
  console.log(inverse(greenBright(maskTokens(msg))));
  console.log("");
};
