import { Phone, User } from "lucide-react";
import Link from "next/link";
import { api } from "@/lib/config";
import { getSession } from "@/lib/session";
import type { Tenant } from "@/types";
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
		<header className="sticky top-0 z-50 px-24 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container flex h-16 items-center justify-between">
				<div className="flex items-center gap-4">
					<Logo />
					<TenantSelect resturants={tenants} />
				</div>
				<div className="flex items-center gap-4">
					<nav className="hidden md:flex items-center gap-6">
						<NavRight />
					</nav>
					<div className="hidden md:flex items-center gap-1 ml-4">
						<Phone className="h-4 w-4 text-primary" />
						<span className="text-sm font-medium">555-123-4567</span>
					</div>
					{session ? (
						<Logout />
					) : (
						<Button className="bg-primary hover:bg-primary/90" asChild>
							<Link href="/login">
								<User className="h-4 w-4 mr-2" />
								Login
							</Link>
						</Button>
					)}
				</div>
			</div>
		</header>
	);
};

export default Header;
