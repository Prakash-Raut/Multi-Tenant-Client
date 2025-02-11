"use client";

import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/lib/store/hooks";
import { ArrowRight, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import CartItem from "./cart-item";

const CartItems = () => {
  const searchParams = useSearchParams();

  const restaurantId = searchParams.get("restaurantId");

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const cart = useAppSelector((state) => state.cart.cartItems);

  if (!isClient) {
    return null;
  }

  if (!cart.length) {
    return (
      <div className="flex items-center gap-2">
        <ShoppingCart />
        <p className="text-gray-500">
          <strong>Your Cart is empty</strong>
          <Link
            className="text-orange-500"
            href={`/restaurantId=${restaurantId}`}
          >
            Continue Shopping?
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {cart.map((cartItem) => (
        <CartItem key={cartItem.hash} item={cartItem} />
      ))}
      <div className="flex items-center justify-between">
        <span className="text-xl font-bold">&#8377;{4000}</span>
        <Button>
          Checkout
          <ArrowRight size={16} />
        </Button>
      </div>
    </div>
  );
};

export default CartItems;
