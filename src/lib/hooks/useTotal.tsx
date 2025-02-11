"use client";

import { useMemo } from "react";
import { CartItem } from "../store/features/cart/cartSlice";

export const useTotal = (product: CartItem) => {
  const totalPrice = useMemo(() => {
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
  }, [product]);

  return totalPrice;
};
