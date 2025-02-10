"use client";

import { increment } from "@/lib/store/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { ShoppingBasket } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

const Basket = () => {
  const dispatch = useAppDispatch();
  const value = useAppSelector((state) => state.cart.value);

  const handleIncrement = () => {
    dispatch(increment());
  };
  return (
    <>
      <div className="relative">
        <Link href="#" className="font-medium hover:text-primary">
          <ShoppingBasket size={20} />
        </Link>
        <span className="absolute -right-5 -top-4 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary font-bold text-white">
          {value}
        </span>
      </div>
      <Button onClick={handleIncrement}>Add to basket</Button>
    </>
  );
};

export default Basket;
