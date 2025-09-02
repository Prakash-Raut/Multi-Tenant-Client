"use client";

import { useEffect } from "react";
import { clearCart } from "@/lib/store/features/cart/cartSlice";
import { useAppDispatch } from "@/lib/store/hooks";

const CartCleaner = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(clearCart());
	}, [dispatch]);

	return null;
};

export default CartCleaner;
