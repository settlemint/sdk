import { inverse, magentaBright } from "yoctocolors";

export const intro = (msg: string) => {
  console.log("");
  console.log(inverse(magentaBright(msg)));
  console.log("");
};
