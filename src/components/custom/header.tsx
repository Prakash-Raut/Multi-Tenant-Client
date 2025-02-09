import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { api } from "@/lib/config";
import { Tenant } from "@/types";
import { Phone, ShoppingBasket } from "lucide-react";
import Link from "next/link";
import Logo from "../icons/logo";
import { Button } from "../ui/button";

const Header = async () => {
  const tenantResponse = await fetch(
    `${api}/api/auth/tenants?perPage=100&currentPage=1`,
    {
      next: {
        revalidate: 3600, // 1 hour
      },
    }
  );

  if (!tenantResponse.ok) {
    throw new Error("Failed to fetch tenants");
  }

  const tenants: { data: Tenant[] } = await tenantResponse.json();

  console.log(tenants);

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
              {tenants.data.map((tenant) => (
                <SelectItem key={tenant.id} value={String(tenant.id)}>
                  {tenant.name}
                </SelectItem>
              ))}
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
