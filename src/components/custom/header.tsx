import { api } from "@/lib/config";
import { getSession } from "@/lib/session";
import type { Tenant } from "@/types";
import Link from "next/link";
import Logo from "../icons/logo";
import { Button } from "../ui/button";
import Logout from "./logout";
import NavRight from "./nav-right";
import TenantSelect from "./tenant-select";

const Header = async () => {
	const session = await getSession();

	const tenantResponse = await fetch(
		`${api}/api/auth/tenants?perPage=100&currentPage=1`,
		{
			next: {
				revalidate: 3600, // 1 hour
			},
		},
	);

	if (!tenantResponse.ok) {
		throw new Error("Failed to fetch tenants");
	}

	const tenants: { data: Tenant[] } = await tenantResponse.json();

	return (
		<header className="container mx-auto flex items-center justify-between px-24 py-6">
			<nav className="">
				<div className="flex items-center space-x-4">
					<Logo />
					<TenantSelect resturants={tenants} />
				</div>
			</nav>
			<div className="flex items-center space-x-8">
				<NavRight />
				{session ? (
					<Logout />
				) : (
					<Button asChild>
						<Link href="/login">Login</Link>
					</Button>
				)}
			</div>
		</header>
	);
};

export default Header;
