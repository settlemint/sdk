import { maskTokens } from "@/terminal/mask-tokens.js";
import { inverse, redBright } from "yoctocolors";

export const cancel = (msg: string): never => {
  console.log("");
  console.log(inverse(redBright(maskTokens(msg))));
  console.log("");
  process.exit(1);
};
