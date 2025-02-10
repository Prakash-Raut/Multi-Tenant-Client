import { api } from "@/lib/config";
import { Tenant } from "@/types";
import Logo from "../icons/logo";
import NavRight from "./nav-right";
import TenantSelect from "./tenant-select";

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
          <TenantSelect resturants={tenants} />
        </div>
        <NavRight />
      </nav>
    </header>
  );
};

export default Header;
