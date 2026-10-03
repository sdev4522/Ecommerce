import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { CurrencyConfig } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const DEFAULT_CURRENCY_CONFIG: CurrencyConfig = {
  code: "INR",
  symbol: "₹",
  name: "Indian Rupee",
  position: "before",
  decimal_places: 0,
  decimal_separator: ".",
  thousand_separator: ",",
};

let activeCurrencyConfig: CurrencyConfig = DEFAULT_CURRENCY_CONFIG;

/**
 * Sets the active global currency configuration.
 * Called when site settings are loaded or updated.
 */
export function setActiveCurrencyConfig(config: CurrencyConfig): void {
  if (config && config.symbol) {
    activeCurrencyConfig = {
      ...DEFAULT_CURRENCY_CONFIG,
      ...config,
    };
  }
}

/**
 * Gets the current active currency configuration.
 */
export function getActiveCurrencyConfig(): CurrencyConfig {
  return activeCurrencyConfig;
}

/**
 * Formats a monetary amount using the centralized backend currency configuration.
 * Does NOT perform currency conversion. Only formats according to the active
 * or specified currency parameters (symbol, position, decimal places, separators).
 *
 * Example outputs:
 * - INR (0 decimals): ₹1,999
 * - INR (2 decimals): ₹1,999.00
 * - USD (2 decimals): $1,999.00
 * - EUR (2 decimals, suffix): 1,999.00€
 */
export function formatPrice(
  price: number | string | undefined | null,
  customConfig?: Partial<CurrencyConfig>
): string {
  const config: CurrencyConfig = {
    ...activeCurrencyConfig,
    ...customConfig,
  };

  const {
    symbol = "₹",
    position = "before",
    decimal_places = 0,
    decimal_separator = ".",
    thousand_separator = ",",
  } = config;

  if (price === undefined || price === null || price === "") {
    const zeroFixed = (0).toFixed(decimal_places);
    const [zInt, zDec] = zeroFixed.split(".");
    const zNum = zDec !== undefined && decimal_places > 0
      ? `${zInt}${decimal_separator}${zDec}`
      : zInt;
    return position === "after" ? `${zNum}${symbol}` : `${symbol}${zNum}`;
  }

  const num = typeof price === "number" ? price : parseFloat(String(price));
  if (isNaN(num)) {
    const zeroFixed = (0).toFixed(decimal_places);
    const [zInt, zDec] = zeroFixed.split(".");
    const zNum = zDec !== undefined && decimal_places > 0
      ? `${zInt}${decimal_separator}${zDec}`
      : zInt;
    return position === "after" ? `${zNum}${symbol}` : `${symbol}${zNum}`;
  }

  const isNegative = num < 0;
  const absNum = Math.abs(num);
  const fixed = absNum.toFixed(decimal_places);
  const [intPart, decPart] = fixed.split(".");

  // Insert thousands separator
  const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, thousand_separator);

  // Combine with decimal separator if decimal places > 0
  const formattedNumber = decPart !== undefined && decimal_places > 0
    ? `${formattedInt}${decimal_separator}${decPart}`
    : formattedInt;

  const valueWithSymbol = position === "after"
    ? `${formattedNumber}${symbol}`
    : `${symbol}${formattedNumber}`;

  return isNegative ? `-${valueWithSymbol}` : valueWithSymbol;
}
