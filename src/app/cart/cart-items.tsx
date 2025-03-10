"use client";

import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/lib/store/hooks";
import { getItemTotal } from "@/lib/utils";
import { ArrowRight, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import CartItem from "./cart-item";

const CartItems = () => {
	const searchParams = useSearchParams();

	const restaurantId = searchParams.get("restaurantId");

	const router = useRouter();

	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	const cart = useAppSelector((state) => state.cart.cartItems);

	const finalTotal = useMemo(() => {
		return cart.reduce((acc, item) => {
			return acc + item.qty * getItemTotal(item);
		}, 0);
	}, [cart]);

	if (!isClient) {
		return null;
	}

	if (!cart.length) {
		return (
			<div className="flex items-center gap-2">
				<ShoppingCart />
				<p className="text-gray-500">
					<strong>Your Cart is empty</strong>
					<Link
						className="text-orange-500"
						href={`/restaurantId=${restaurantId}`}
					>
						Continue Shopping?
					</Link>
				</p>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-8">
			{cart.map((cartItem) => (
				<CartItem key={cartItem.hash} item={cartItem} />
			))}
			<div className="flex items-center justify-between">
				<span className="text-xl font-bold">&#8377;{finalTotal}</span>
				<Button
					onClick={() => router.push(`/checkout?restaurantId=${restaurantId}`)}
				>
					Checkout
					<ArrowRight size={16} />
				</Button>
			</div>
		</div>
	);
};

export default CartItems;
