"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getSingleOrder } from "@/lib/http/api";
import { cn } from "@/lib/utils";
import { defineStepper } from "@stepperize/react";
import { useQuery } from "@tanstack/react-query";
import {
	CheckCheck,
	FileCheck,
	Microwave,
	Package,
	PackageCheck,
} from "lucide-react";
import { useEffect, useMemo, useRef } from "react";

const { Scoped, useStepper, steps, utils } = defineStepper(
	{
		id: "received",
		title: "Received",
		icon: FileCheck,
		description: "We are confirming your order",
	},
	{
		id: "confirmed",
		title: "Confirmed",
		icon: Package,
		description: "We have started preparing your order",
	},
	{
		id: "prepared",
		title: "Prepared",
		icon: Microwave,
		description: "Ready for pickup",
	},
	{
		id: "out for delivery",
		title: "Out For Delivery",
		icon: PackageCheck,
		description: "Order is out for delivery",
	},
	{
		id: "delivered",
		title: "Delivered",
		icon: CheckCheck,
		description: "Order has been delivered",
	},
);

const OrderStep = ({ orderId }: { orderId: string }) => {
	const stepper = useStepper();

	const { data: orderData, isSuccess } = useQuery({
		queryKey: ["order"],
		queryFn: async () => {
			const { data } = await getSingleOrder(orderId);
			return data;
		},
		refetchInterval: 1000 * 30, // Refetch every 30 seconds
	});

	const currentIndex = useMemo(
		() => utils.getIndex(stepper.current.id),
		[stepper],
	);

	const prevOrderStatus = useRef(orderData?.orderStatus);

	useEffect(() => {
		if (
			isSuccess &&
			orderData?.orderStatus &&
			orderData.orderStatus !== prevOrderStatus.current
		) {
			const currentIndex = utils.getIndex(stepper.current.id);
			const nextStep = stepper.all[currentIndex + 1]?.id;

			if (nextStep) {
				stepper.goTo(nextStep);
				prevOrderStatus.current = orderData.orderStatus; // Update the previous status
			}
		}
	}, [isSuccess, orderData?.orderStatus, stepper]);

	return (
		<nav aria-label="Checkout Steps" className="group my-4">
			<ol className="flex items-baseline justify-between gap-2">
				{stepper.all.map((step, index, array) => {
					// Determine button variant for each step
					const variant =
						index < currentIndex
							? "default" // Completed steps
							: index === currentIndex
								? "outline" // Current step
								: "secondary"; // Pending steps
					return (
						<Scoped key={step.id}>
							<li className="flex flex-col items-center gap-4">
								<Button
									type="button"
									role="tab"
									variant={variant}
									aria-current={
										stepper.current.id === step.id ? "step" : undefined
									}
									aria-posinset={index + 1}
									aria-setsize={steps.length}
									aria-selected={stepper.current.id === step.id}
									className="flex size-10 items-center justify-center rounded-full"
									onClick={() => stepper.goTo(step.id)}
								>
									<step.icon size={20} />
								</Button>
								<span className="text-sm font-medium">{step.title}</span>
							</li>
							{index < array.length - 1 && (
								<Separator
									className={cn(
										"h-0.5 flex-1",
										index < currentIndex ? "bg-primary" : "bg-muted",
									)}
								/>
							)}
						</Scoped>
					);
				})}
			</ol>
		</nav>
	);
};

export default OrderStep;
