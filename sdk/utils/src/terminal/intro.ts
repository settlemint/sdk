import { magentaBright } from "yoctocolors";

export const intro = (msg: string): void => {
  console.log("");
  console.log(magentaBright(msg));
  console.log("");
};
