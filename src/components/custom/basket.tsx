"use client";

import { useAppSelector } from "@/lib/store/hooks";
import { ShoppingBasket } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const Basket = () => {
  const searchParams = useSearchParams();
  const restaurantId = searchParams.get("restaurantId");
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  return (
    <>
      <div className="relative">
        <Link
          href={`/cart?restaurantId=${restaurantId}`}
          className="font-medium hover:text-primary"
        >
          <ShoppingBasket size={20} />
        </Link>
        <span className="absolute -right-5 -top-4 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary font-bold text-white">
          {cartItems.length}
        </span>
      </div>
    </>
  );
};

export default Basket;
