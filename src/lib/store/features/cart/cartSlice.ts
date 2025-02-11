import { hashTheItem } from "@/lib/utils";
import { Product, Topping } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
        JSON.stringify([...state.cartItems, newItem])
      );
      return {
        cartItems: [...state.cartItems, newItem],
      };
    },
    setInitialCartItems: (state, action: PayloadAction<CartItem[]>) => {
      if (Array.isArray(action.payload)) {
        state.cartItems.push(...action.payload);
      }
    },
    changeQty: (
      state,
      action: PayloadAction<{ hash: string; qty: number }>
    ) => {
      const { hash, qty } = action.payload;
      const index = state.cartItems.findIndex((item) => item.hash === hash);
      state.cartItems[index].qty = Math.max(
        1,
        state.cartItems[index].qty + qty
      );

      // Save to local storage
      window.localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, setInitialCartItems, changeQty } = cartSlice.actions;

export default cartSlice.reducer;
