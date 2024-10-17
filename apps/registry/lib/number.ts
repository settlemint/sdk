/**
 * Formats a number as a currency string.
 * @param amount - The amount to format.
 * @param currency - The currency code (e.g., 'USD', 'EUR').
 * @param locale - Optional locale for formatting.
 * @returns A formatted currency string.
 */
export const formatCurrency = (amount: number, currency: string, locale?: Intl.LocalesArgument) => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    currencyDisplay: "symbol",
  }).format(amount);
};

/**
 * Formats a token value with a specified number of decimal places.
 * @param amount - The amount to format.
 * @param decimals - The number of decimal places to display.
 * @param locale - Optional locale for formatting.
 * @returns A formatted string representing the token value.
 */
export const formatTokenValue = (amount: number | bigint, decimals: number, locale?: Intl.LocalesArgument) => {
  return new Intl.NumberFormat(locale, {
    style: "decimal",
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  }).format(amount);
};

/**
 * Formats a number or string as a percentage.
 * @param amount - The amount to format as a percentage.
 * @param locale - Optional locale for formatting.
 * @returns A formatted percentage string.
 * @throws Will return "0%" if parsing fails.
 */
export const formatPercentage = (amount: number | bigint | string, locale?: Intl.LocalesArgument) => {
  try {
    const numericValue = Number.parseFloat(amount.toString());
    const dividedValue = numericValue / 100;

    return new Intl.NumberFormat(locale, {
      style: "percent",
      minimumFractionDigits: 1,
      maximumFractionDigits: 2,
    }).format(dividedValue);
  } catch (error) {
    console.error(error, amount);
    return "0%";
  }
};

/**
 * Formats a large number into a more readable string with units.
 * @param value - The number to format.
 * @returns A string representing the large number with appropriate unit.
 */
export function formatLargeNumber(value: string | number | bigint): string {
  const bigIntValue = BigInt(Math.floor(Number(value)));
  const units = [
    "",
    "Thousand",
    "Million",
    "Billion",
    "Trillion",
    "Quadrillion",
    "Quintillion",
    "Sextillion",
    "Septillion",
    "Octillion",
    "Nonillion",
    "Decillion",
    "Undecillion",
    "Duodecillion",
    "Tredecillion",
    "Quattuordecillion",
    "Quindecillion",
    "Sexdecillion",
    "Septendecillion",
    "Octodecillion",
    "Novemdecillion",
    "Vigintillion",
  ];
  const divisor = BigInt(1000);

  let unitIndex = 0;
  let scaledValue = bigIntValue;

  while (scaledValue >= divisor && unitIndex < units.length - 1) {
    scaledValue /= divisor;
    unitIndex++;
  }

  return `${scaledValue.toString()} ${units[unitIndex]}`;
}
