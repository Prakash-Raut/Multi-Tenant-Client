"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import type { Tenant } from "@/types";

const TenantSelect = ({ resturants }: { resturants: { data: Tenant[] } }) => {
	const router = useRouter();

	const searchParams = useSearchParams();

	const restaurantId = searchParams.get("restaurantId") ?? "1";

	const handleValueChange = (value: string) => {
		router.push(`/?restaurantId=${value}`);
	};

	return (
		<Select onValueChange={handleValueChange} defaultValue={restaurantId}>
			<SelectTrigger className="w-[180px] focus:ring-0">
				<SelectValue placeholder="Select Outlet" />
			</SelectTrigger>
			<SelectContent>
				{resturants.data?.map((restaurant) => (
					<SelectItem key={restaurant.id} value={String(restaurant.id)}>
						{restaurant.name}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
};

export default TenantSelect;
