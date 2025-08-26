import CartItems from "@/components/cart/cart-items";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
	title: "Your Cart - Pizza Galleria",
	description:
		"Review the delicious pizzas and sides in your cart before proceeding to checkout. Customize your order and enjoy great deals!",
};

const CartPage = () => {
	return (
		<section className="w-full max-w-7xl">
			<h1 className="text-lg font-bold">Shopping Cart</h1>
			<div className="mt-6 rounded-lg bg-white p-6">
				<Suspense fallback={<div>Loading...</div>}>
					<CartItems />
				</Suspense>
			</div>
		</section>
	);
};

export default CartPage;
