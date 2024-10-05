import { inverse, redBright } from "yoctocolors";

export const cancel = (msg: string) => {
  console.log("");
  console.log(inverse(redBright(msg)));
  console.log("");
  process.exit(1);
};
