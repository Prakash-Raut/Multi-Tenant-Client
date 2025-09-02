import { format } from "date-fns";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { api } from "@/lib/config";
import type { Order } from "@/types";

export const metadata: Metadata = {
	title: "Your Orders - Pizza Galleria	",
	description:
		"Access your past Pizza Galleria orders, reorder your favorites, and track current deliveries from your order history.",
};

const fetchOrders = async () => {
	const cookieStore = await cookies();
	const accessToken = cookieStore.get("accessToken")?.value;
	const response = await fetch(`${api}/api/order/orders/me`, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});

	if (!response.ok) {
		throw new Error("Failed to fetch orders");
	}

	const orders: Order[] = (await response.json()) || [];

	return orders;
};

const OrderPage = async ({
	searchParams,
}: {
	searchParams: Promise<{ restaurantId: string }>;
}) => {
	// const { restaurantId } = await searchParams;

	const orders = await fetchOrders();

	return (
		<section>
			<Card>
				<CardHeader>
					<CardTitle>Orders</CardTitle>
					<CardDescription className="capitalize">
						My complete order history
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Table>
						<TableCaption>A list of your recent invoices.</TableCaption>
						<TableHeader>
							<TableRow className="bg-muted">
								<TableHead className="w-[100px]">Invoice</TableHead>
								<TableHead>Payment Status</TableHead>
								<TableHead>Payment Method</TableHead>
								<TableHead>Date Time</TableHead>
								<TableHead>Order Status</TableHead>
								<TableHead>Amount</TableHead>
								<TableHead className="text-right">Details</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{orders.length === 0
								? "No orders found"
								: orders.map((order) => (
										<TableRow key={order._id}>
											<TableCell className="font-medium">{order._id}</TableCell>
											<TableCell className="uppercase">
												<Badge variant="secondary">{order.paymentStatus}</Badge>
											</TableCell>
											<TableCell className="capitalize">
												{order.paymentMode}
											</TableCell>
											<TableCell>
												{format(
													new Date(order.createdAt),
													"dd-MM-yyyy HH:mm:ss",
												)}
											</TableCell>
											<TableCell className="uppercase">
												<Badge variant="secondary">{order.orderStatus}</Badge>
											</TableCell>
											<TableCell>&#8377;{order.total}</TableCell>
											<TableCell className="text-right">
												<Link
													href={`/order/${order._id}`}
													className="text-primary underline"
												>
													More Details
												</Link>
											</TableCell>
										</TableRow>
									))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</section>
	);
};

export default OrderPage;
