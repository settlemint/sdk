import { greenBright, inverse } from "yoctocolors";

export const outro = (msg: string) => {
  console.log("");
  console.log(inverse(greenBright(msg)));
  console.log("");
};
