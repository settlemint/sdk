export const maskTokens = (output: string): string => {
  return output.replace(/sm_(pat|aat|sat)_[0-9a-zA-Z]+/g, "***");
};
