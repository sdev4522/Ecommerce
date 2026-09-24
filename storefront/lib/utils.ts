import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number | string | undefined | null): string {
  if (price === undefined || price === null || isNaN(Number(price))) return "₹0";
  const num = Number(price);
  return `₹${num.toLocaleString("en-IN")}`;
}
