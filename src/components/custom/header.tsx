import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { api } from "@/lib/config";
import { Tenant } from "@/types";
import Logo from "../icons/logo";
import NavRight from "./nav-right";

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
        <NavRight />
      </nav>
    </header>
  );
};

export default Header;
