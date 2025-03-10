"use client";

import { v4 as uuidv4 } from "uuid";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { createOrder, getCustomer } from "@/lib/http/api";
import { clearCart } from "@/lib/store/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import type { Address, Customer, OrderData, PaymentMode } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Coins, CreditCard } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AddressModal } from "./address-modal";
import OrderSummary from "./order-summary";

const customerSchema = z.object({
	address: z.string({ required_error: "Address is required." }),
	paymentMode: z.enum(["card", "cash"], {
		required_error: "You must select a payment mode.",
	}),
	comment: z.string().max(200, {
		message: "Comment must be less than 200 characters.",
	}),
});

const CustomerDetail = () => {
	const searchParams = useSearchParams();

	const restaurantId = searchParams.get("restaurantId");

	const { data: customer } = useQuery<Customer>({
		queryKey: ["customer"],
		queryFn: async () => {
			const { data } = await getCustomer();
			return data;
		},
	});

	const form = useForm<z.infer<typeof customerSchema>>({
		resolver: zodResolver(customerSchema),
		defaultValues: {
			address: "",
			paymentMode: "card",
			comment: "",
		},
	});

	const appliedCouponCode = useRef<string>("");
	const idempotencyKeyRef = useRef<string>("");

	const cart = useAppSelector((state) => state.cart);
	const dispatch = useAppDispatch();

	useEffect(() => {
		idempotencyKeyRef.current = uuidv4() + (customer?._id || "");
	}, [customer?._id]);

	const { mutate: createOrderMutate, isPending: isPlaceOrderPending } =
		useMutation({
			mutationKey: ["createNewOrder"],
			mutationFn: async (orderData: OrderData) => {
				// const idempotencyKey = idempotencyKeyRef.current
				//   ? idempotencyKeyRef.current
				//   : (idempotencyKeyRef.current = uuidv4() + customer?._id);

				const { data } = await createOrder(
					orderData,
					idempotencyKeyRef.current,
				);
				return data;
			},
			retry: 3,
			onSuccess: (data: { paymentUrl: string | null }) => {
				if (data.paymentUrl) {
					window.location.href = data.paymentUrl;
				}

				alert("Order placed successfully");
				dispatch(clearCart());

				// TODO: THIS WILL HAPPEN WHEN PAYMENT MODE IS CASH
				// clear cart, redirect user to order status page
				// Reset idempotency key only after a successful order
				idempotencyKeyRef.current = "";
			},
		});

	function handlePlaceOrder(values: z.infer<typeof customerSchema>) {
		if (!restaurantId) {
			alert("Please choose a restaurant");
			return;
		}

		if (!customer) {
			alert("Please login to continue");
			return;
		}

		const orderData: OrderData = {
			cart: cart.cartItems,
			couponCode: appliedCouponCode.current ? appliedCouponCode.current : "",
			tenantId: restaurantId,
			customerId: customer?._id,
			comment: values.comment,
			address: values.address,
			paymentMode: values.paymentMode as PaymentMode,
		};

		createOrderMutate(orderData);
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handlePlaceOrder)}
				className="flex w-full items-start justify-between"
			>
				<Card className="w-full max-w-2xl">
					<CardHeader>
						<CardTitle>Customer Details</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							<Label>First Name</Label>
							<Input
								placeholder="first name"
								defaultValue={customer?.firstName}
								disabled
							/>
						</div>
						<div className="space-y-2">
							<Label>Last Name</Label>
							<Input
								placeholder="last name"
								defaultValue={customer?.lastName}
								disabled
							/>
						</div>
						<div className="space-y-2">
							<Label>Email</Label>
							<Input
								type="email"
								placeholder="email"
								defaultValue={customer?.email}
								disabled
							/>
						</div>
						<FormField
							control={form.control}
							name="address"
							render={({ field }) => (
								<FormItem className="space-y-3">
									<div className="flex items-center justify-between">
										<FormLabel>Address</FormLabel>
										<AddressModal customerId={customer?._id ?? ""} />
									</div>
									<FormControl>
										<RadioGroup
											onValueChange={field.onChange}
											defaultValue={field.value}
											className="grid grid-cols-2 gap-4"
										>
											{customer?.addresses.map((address: Address) => (
												<FormItem
													key={address.text}
													className="flex items-center space-x-3 space-y-0"
												>
													<Card>
														<CardContent className="flex items-center space-x-2 p-4">
															<FormControl>
																<RadioGroupItem value={address.text} />
															</FormControl>
															<FormLabel>{address.text}</FormLabel>
														</CardContent>
													</Card>
												</FormItem>
											))}
										</RadioGroup>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="paymentMode"
							render={({ field }) => (
								<FormItem className="space-y-3">
									<FormLabel>Payment Mode</FormLabel>
									<FormControl>
										<RadioGroup
											onValueChange={field.onChange}
											defaultValue={field.value}
											className="flex space-x-1"
										>
											<FormItem className="flex items-center space-x-3 space-y-0">
												<FormControl>
													<RadioGroupItem
														id="card"
														value="card"
														className="peer sr-only"
														aria-label="Card"
													/>
												</FormControl>
												<FormLabel
													id="card"
													className="flex items-center justify-between gap-4 rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
												>
													<CreditCard />
													Card
												</FormLabel>
											</FormItem>
											<FormItem className="flex items-center space-x-3 space-y-0">
												<FormControl>
													<RadioGroupItem
														id="cash"
														value="cash"
														className="peer sr-only"
														aria-label="Cash"
													/>
												</FormControl>
												<FormLabel
													id="cash"
													className="flex items-center justify-between gap-4 rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
												>
													<Coins />
													Cash
												</FormLabel>
											</FormItem>
										</RadioGroup>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="comment"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Comment</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Any comments related to your order or delivery"
											className="resize-none"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</CardContent>
				</Card>
				<OrderSummary
					handleCouponCodeChange={(code) => {
						appliedCouponCode.current = code;
					}}
					isPlaceOrderPending={isPlaceOrderPending}
				/>
			</form>
		</Form>
	);
};

export default CustomerDetail;
