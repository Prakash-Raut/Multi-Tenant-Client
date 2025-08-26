"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { verifyCoupon } from "@/lib/http/api";
import { useAppSelector } from "@/lib/store/hooks";
import { getItemTotal } from "@/lib/utils";
import type { CouponCodeData } from "@/types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useMemo, useRef, useState } from "react";

const OrderSummary = ({
	handleCouponCodeChange,
	isPlaceOrderPending,
}: {
	handleCouponCodeChange: (code: string) => void;
	isPlaceOrderPending: boolean;
}) => {
	const searchParams = useSearchParams();
	const restaurantId = searchParams.get("restaurantId");

	const cart = useAppSelector((state) => state.cart.cartItems);

	const [discountPercentage, setDiscountPercentage] = useState(0);

	const [discountError, setDiscountError] = useState<string | null>(null);

	const [taxesPercentage, setTaxesPercentage] = useState(18);

	const couponCodeRef = useRef<HTMLInputElement>(null);

	const subTotal = useMemo(() => {
		return cart.reduce((acc, curr) => {
			return acc + curr.qty * getItemTotal(curr);
		}, 0);
	}, [cart]);

	const discountTotal = useMemo(() => {
		return Math.round(subTotal * discountPercentage) / 100;
	}, [subTotal, discountPercentage]);

	const taxesTotal = useMemo(() => {
		const amountAfterDiscount = subTotal - discountTotal;

		return Math.round((amountAfterDiscount * taxesPercentage) / 100);
	}, [subTotal, discountTotal, taxesPercentage]);

	const deliveryCharges = useMemo(() => {
		return 100;
	}, []);

	const grandTotalWithDiscount = useMemo(() => {
		return subTotal - discountTotal + taxesTotal + deliveryCharges;
	}, [subTotal, discountTotal, taxesTotal, deliveryCharges]);

	const grandTotalWithoutDiscount = useMemo(() => {
		return subTotal + taxesTotal + deliveryCharges;
	}, [subTotal, taxesTotal, deliveryCharges]);

	const { mutate: couponMutate, isPending } = useMutation({
		mutationKey: ["couponCode"],
		mutationFn: async () => {
			if (!couponCodeRef.current) {
				return;
			}

			if (!restaurantId) {
				return;
			}

			const couponCodeData: CouponCodeData = {
				code: couponCodeRef.current.value,
				tenantId: +restaurantId,
			};
			const { data } = await verifyCoupon(couponCodeData);
			return data;
		},
		onSuccess: (data) => {
			if (data.valid) {
				setDiscountError("");
				handleCouponCodeChange(
					couponCodeRef.current ? couponCodeRef.current.value : "",
				);
				setDiscountPercentage(data.discount);
				return;
			}

			setDiscountError("Invalid coupon code");
			handleCouponCodeChange("");
			setDiscountPercentage(0);
		},
		onError: (error) => {
			if (axios.isAxiosError(error) && error.response) {
				const errorMsg = error.response.data.errors[0].msg;
				setDiscountError(errorMsg);
			} else {
				setDiscountError("An unexpected error occurred");
			}
			setDiscountPercentage(0);
		},
	});

	const handleCouponValidation = (e: React.MouseEvent) => {
		e.preventDefault();
		couponMutate();
	};

	return (
		<Card className="w-full max-w-md">
			<CardHeader>
				<CardTitle>Order Summary</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="flex justify-between">
					<span>Sub Total</span>
					<strong>&#8377;{subTotal}</strong>
				</div>
				<div className="flex justify-between">
					<span>Discount</span>
					<strong>&#8377;{discountTotal}</strong>
				</div>
				<div className="flex justify-between">
					<span>Taxes</span>
					<strong>&#8377;{taxesTotal}</strong>
				</div>
				<div className="flex justify-between">
					<span>Delivery Charges</span>
					<strong>&#8377;{deliveryCharges}</strong>
				</div>
			</CardContent>
			<CardFooter className="flex flex-col space-y-2">
				<div className="flex w-full items-center justify-between">
					<span className="font-bold">Order Total</span>
					<span className="flex flex-col items-center font-bold">
						<span
							className={discountPercentage ? "text-gray-500 line-through" : ""}
						>
							{" "}
							&#8377;{grandTotalWithoutDiscount}
						</span>
						{discountPercentage ? (
							<span className="text-green-500">
								&#8377;{grandTotalWithDiscount}
							</span>
						) : null}
					</span>
				</div>
				{discountError && (
					<span className="text-sm text-red-500">{discountError}</span>
				)}
				<div className="flex w-full items-center justify-between space-x-2">
					<Input
						id="coupon"
						name="code"
						type="text"
						placeholder="Coupon Code"
						ref={couponCodeRef}
					/>
					<Button
						variant="secondary"
						onClick={handleCouponValidation}
						disabled={isPending}
					>
						{isPending ? (
							<>
								<Loader2 className="animate-spin" />
								<span>Validating</span>
							</>
						) : (
							"Apply"
						)}
					</Button>
				</div>
				<div className="flex w-full items-center justify-end">
					<Button disabled={isPlaceOrderPending}>
						{isPlaceOrderPending ? (
							<>
								<Loader2 className="animate-spin" />
								<span>Placing Order</span>
							</>
						) : (
							"Place Order"
						)}
					</Button>
				</div>
			</CardFooter>
		</Card>
	);
};

export default OrderSummary;
