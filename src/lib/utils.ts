import { Product } from "@/types";
import { clsx, type ClassValue } from "clsx";
import CryptoJs from "crypto-js";
import { twMerge } from "tailwind-merge";
import { CartItem } from "./store/features/cart/cartSlice";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function hashTheItem(payload: CartItem): string {
  const payloadJsonString = JSON.stringify({ ...payload, qty: undefined });

  const hash = CryptoJs.SHA256(payloadJsonString).toString();

  return hash;
}

export const getFromPrice = (product: Product): number => {
  const basePrice = Object.entries(product.priceConfiguration)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .filter(([key, value]) => {
      return value.priceType === "base";
    })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .reduce((acc, [key, value]) => {
      const smallestPrice = Math.min(...Object.values(value.availableOptions));
      return acc + smallestPrice;
    }, 0);

  return basePrice;
};

export const getItemTotal = (product: CartItem) => {
  const toppingsTotal = product.chosenConfiguration.selectedToppings.reduce(
    (acc, curr) => acc + curr.price,
    0
  );
  const configTotal = Object.entries(
    product.chosenConfiguration.priceConfiguration
  ).reduce((acc, [key, value]) => {
    const price = product.priceConfiguration[key].availableOptions[value];
    return acc + price;
  }, 0);

  return toppingsTotal + configTotal;
};

/**
 * Sanitizes searchParams by ensuring all values are strings.
 * - Converts `Symbol` values to an empty string (`""`).
 * - Replaces `null` and `undefined` with an empty string.
 */
export const sanitizeParams = (
  params: Record<string, unknown>
): Record<string, string> => {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => [
      key,
      typeof value === "symbol" ? "" : String(value ?? ""),
    ])
  );
};
