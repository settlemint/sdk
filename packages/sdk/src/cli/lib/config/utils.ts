export const escapeNewlines = (str: string) => str.replace(/\n/g, "\\n");

export const format = (key: string, value: string) => `${key}=${escapeNewlines(value)}`;
