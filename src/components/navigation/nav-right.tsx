"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const BasketWithoutSSR = dynamic(() => import("./basket"), {
	ssr: false,
});

const NavRight = () => {
	const searchParams = useSearchParams();
	const restaurantId = searchParams.get("restaurantId") ?? "1";

	return (
		<>
			<ul className="flex items-center space-x-4">
				<li className="inline-block">
					<Link
						href={`/?restaurantId=${restaurantId}`}
						className="font-medium hover:text-primary"
					>
						Menu
					</Link>
				</li>
				<li className="inline-block">
					<Link
						href={`/orders?restaurantId=${restaurantId}`}
						className="font-medium hover:text-primary"
					>
						Orders
					</Link>
				</li>
			</ul>
			<BasketWithoutSSR />
		</>
	);
};

export default NavRight;
