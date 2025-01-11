import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Phone, ShoppingBasket } from "lucide-react";
import Link from "next/link";
import Logo from "../icons/logo";
import { Button } from "../ui/button";

const Header = () => {
  return (
    <header>
      <nav className="container mx-auto flex items-center justify-between px-24 py-6">
        <div className="flex items-center space-x-4">
          <Logo />
          <Select>
            <SelectTrigger className="w-[180px] focus:ring-0">
              <SelectValue placeholder="Select Restaurant" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cheesy-delight">Cheesy Delight</SelectItem>
              <SelectItem value="pizza-hut">Pizza Hut</SelectItem>
              <SelectItem value="kids-corner">Kids Corner</SelectItem>
            </SelectContent>
          </Select>
        </div>
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
          <div className="relative">
            <Link href="#" className="font-medium hover:text-primary">
              <ShoppingBasket size={20} />
            </Link>
            <span className="absolute -right-5 -top-4 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary font-bold text-white">
              3
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Phone size={20} />
            <span>+91 9800 980 980</span>
          </div>
          <Button size="sm">Logout</Button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
