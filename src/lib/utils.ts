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

export function getFromPrice(product: Product): number {
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
}
