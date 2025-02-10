"use client";

import { ShoppingBasket } from "lucide-react";
import Link from "next/link";

const Basket = () => {
  return (
    <>
      <div className="relative">
        <Link href="#" className="font-medium hover:text-primary">
          <ShoppingBasket size={20} />
        </Link>
        <span className="absolute -right-5 -top-4 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary font-bold text-white">
          {10}
        </span>
      </div>
    </>
  );
};

export default Basket;
