"use client";

import { Phone } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Button } from "../ui/button";

const BasketWithoutSSR = dynamic(() => import("./basket"), {
  ssr: false,
});

const NavRight = () => {
  return (
    <div className="flex items-center space-x-8">
      <ul className="flex items-center space-x-4">
        <li className="inline-block">
          <Link href="#" className="font-medium hover:text-primary">
            Menu
          </Link>
        </li>
        <li className="inline-block">
          <Link href="#" className="font-medium hover:text-primary">
            Orders
          </Link>
        </li>
      </ul>
      <BasketWithoutSSR />
      <div className="flex items-center space-x-2">
        <Phone size={20} />
        <span>+91 9800 980 980</span>
      </div>
      <Button size="sm">Logout</Button>
    </div>
  );
};

export default NavRight;
