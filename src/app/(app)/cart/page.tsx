import { Suspense } from "react";
import CartItems from "./cart-items";

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
