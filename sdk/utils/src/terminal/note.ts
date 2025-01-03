import { maskTokens } from "@/terminal/mask-tokens.js";

export const note = (message: string): void => {
  console.log("");
  console.log(maskTokens(message));
};
