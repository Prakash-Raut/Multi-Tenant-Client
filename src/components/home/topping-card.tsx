"use client";

import { CircleCheck } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Topping } from "@/types";

type ToppingCardProps = {
	topping: Topping;
	selectedToppings: Topping[];
	handleSelectTopping: (topping: Topping) => void;
};

const ToppingCard = ({
	topping,
	selectedToppings,
	handleSelectTopping,
}: ToppingCardProps) => {
	const isCurrentSelected = selectedToppings.some((t) => t._id === topping._id);
	return (
		<Button
			variant="outline"
			className={cn(
				"relative flex h-52 flex-col items-center",
				isCurrentSelected && "border-2 border-primary",
			)}
			onClick={() => handleSelectTopping(topping)}
		>
			<Image src={topping.image} alt={topping.name} width={80} height={80} />
			<h5>{topping.name}</h5>
			<p>&#8377;{topping.price}</p>
			<CircleCheck
				size={24}
				className={cn(
					"absolute right-2 top-2",
					isCurrentSelected && "text-primary",
				)}
			/>
		</Button>
	);
};

export default ToppingCard;
