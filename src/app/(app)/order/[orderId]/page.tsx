import OrderStep from "@/components/order/order-step";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { api } from "@/lib/config";
import { type Order, OrderStatus } from "@/types";
import { Banknote, Coins, LayoutDashboard } from "lucide-react";
import type { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
	title: "Order Details - Pizza Galleria",
	description:
		"View the details of your recent Pizza Galleria order, including status updates, items ordered, and estimated delivery time.",
};

const fetchOrder = async (orderId: string) => {
	const cookieStore = await cookies();
	const accessToken = cookieStore.get("accessToken")?.value;
	const response = await fetch(
		`${api}/api/order/orders/${orderId}?fields=address,paymentStatus,paymentMode,orderStatus`,
		{
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		},
	);

	if (!response.ok) {
		throw new Error("An error occurred while fetching the order.");
	}

	const data: Order = await response.json();

	return data;
};

const OrderDetailPage = async ({
	params,
}: {
	params: Promise<{ orderId: string }>;
}) => {
	const { orderId } = await params;

	const order = await fetchOrder(orderId);

	return (
		<section className="flex flex-col space-y-6">
			<Card>
				<CardHeader>
					<CardTitle>Order</CardTitle>
					<CardDescription>Track the order status</CardDescription>
				</CardHeader>
				<CardContent>
					<OrderStep orderId={order._id} />
				</CardContent>
			</Card>
			<div className="flex items-start justify-center gap-6">
				<Card className="w-1/3">
					<CardHeader>
						<CardTitle>Delivery Address</CardTitle>
					</CardHeader>
					<CardContent>
						<h2 className="text-lg font-semibold capitalize">
							{`${order.customer.firstName} ${order.customer.lastName}`}
						</h2>
						<p className="leading-7">{order.address}</p>
					</CardContent>
				</Card>
				<Card className="w-2/3">
					<CardHeader>
						<CardTitle>Your Order Information</CardTitle>
					</CardHeader>
					<CardContent className="space-y-2">
						<div className="flex items-center gap-6">
							<LayoutDashboard />
							<h2 className="text-base font-medium">Order Reference</h2>
							<span>{order._id}</span>
						</div>
						<div className="flex items-center gap-6">
							<Banknote />
							<h2 className="text-base font-medium">Payment Status</h2>
							<span className="uppercase">{order.paymentStatus}</span>
						</div>
						<div className="flex items-center gap-6">
							<Coins />
							<h2 className="text-base font-medium">Payment Method</h2>
							<span className="uppercase">{order.paymentMode}</span>
						</div>
					</CardContent>
					<CardFooter>
						{order.orderStatus !== OrderStatus.DELIVERED && (
							<Button variant="destructive">Cancel Order</Button>
						)}
					</CardFooter>
				</Card>
			</div>
		</section>
	);
};

export default OrderDetailPage;
