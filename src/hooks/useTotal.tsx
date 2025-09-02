"use client";

import { useMemo } from "react";
import type { CartItem } from "../lib/store/features/cart/cartSlice";
import { getItemTotal } from "../lib/utils";

export const useTotal = (product: CartItem) => {
	const totalPrice = useMemo(() => {
		return getItemTotal(product);
	}, [product]);

	return totalPrice;
};
