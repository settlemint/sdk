import { greenBright, inverse } from "yoctocolors";

export const outro = (msg: string): void => {
  console.log("");
  console.log(inverse(greenBright(msg)));
  console.log("");
};
