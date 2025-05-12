"use client";

import dynamic from "next/dynamic";
import Link from "next/link";

const BasketWithoutSSR = dynamic(() => import("./basket"), {
	ssr: false,
});

const NavRight = () => {
	return (
		<>
			<ul className="flex items-center space-x-4">
				<li className="inline-block">
					<Link href="#menu" className="font-medium hover:text-primary">
						Menu
					</Link>
				</li>
				<li className="inline-block">
					<Link href="/orders" className="font-medium hover:text-primary">
						Orders
					</Link>
				</li>
			</ul>
			<BasketWithoutSSR />
		</>
	);
};

export default NavRight;
