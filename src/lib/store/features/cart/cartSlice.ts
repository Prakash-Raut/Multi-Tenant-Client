"use client";

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { hashTheItem } from "@/lib/utils";
import type { Product, Topping } from "@/types";

export interface CartItem
	extends Pick<Product, "_id" | "name" | "image" | "priceConfiguration"> {
	chosenConfiguration: {
		priceConfiguration: {
			[key: string]: string;
		};
		selectedToppings: Topping[];
	};
	qty: number;
	hash?: string;
}
export interface CartState {
	cartItems: CartItem[];
}

const initialState: CartState = {
	cartItems: [],
};

export const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addToCart: (state, action: PayloadAction<CartItem>) => {
			const hash = hashTheItem(action.payload);
			const newItem = {
				...action.payload,
				hash,
			};
			// Save to local storage
			window.localStorage.setItem(
				"cartItems",
				JSON.stringify([...state.cartItems, newItem]),
			);
			return {
				cartItems: [...state.cartItems, newItem],
			};
		},
		setInitialCartItems: (state, action: PayloadAction<CartItem[]>) => {
			if (Array.isArray(action.payload)) {
				state.cartItems = [...action.payload];
			}
		},
		changeQty: (
			state,
			action: PayloadAction<{ hash: string; qty: number }>,
		) => {
			const { hash, qty } = action.payload;
			const index = state.cartItems.findIndex((item) => item.hash === hash);

			if (qty === 0) {
				state.cartItems.splice(index, 1);
				// Save to local storage
				window.localStorage.setItem(
					"cartItems",
					JSON.stringify(state.cartItems),
				);
				return;
			}

			state.cartItems[index].qty = Math.max(
				1,
				state.cartItems[index].qty + qty,
			);

			// Save to local storage
			window.localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
		},
		clearCart: () => {
			window.localStorage.removeItem("cartItems");
			return {
				cartItems: [],
			};
		},
	},
});

// Action creators are generated for each case reducer function
export const { addToCart, setInitialCartItems, changeQty, clearCart } =
	cartSlice.actions;

export default cartSlice.reducer;
