import slugify from "slugify";

export function sanitizeName(value: string, length = 35) {
  return slugify(value, {
    strict: true,
    remove: /[!"'()*+.:@~]/g,
    replacement: "-",
    lower: true,
  })
    .slice(0, length)
    .replaceAll(/(^\d*)/g, "")
    .replaceAll(/(-$)/g, "")
    .replaceAll(/(^-)/g, "");
}
