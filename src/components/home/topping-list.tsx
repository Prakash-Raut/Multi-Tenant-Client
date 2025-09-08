"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "@/lib/config";
import type { Topping } from "@/types";
import ToppingCard from "./topping-card";

type ToppingListProps = {
	selectedToppings: Topping[];
	handleSelectTopping: (topping: Topping) => void;
};

const ToppingList = ({
	selectedToppings,
	handleSelectTopping,
}: ToppingListProps) => {
	const searchParams = useSearchParams();
	const tenantId = searchParams.get("restaurantId") ?? 1;
	const [toppings, setToppings] = useState<Topping[]>([]);

	useEffect(() => {
		const fetchToppings = async () => {
			const toppingResponse = await fetch(
				`${api}/api/catalog/toppings?tenantId=${tenantId}`,
			);
			const toppingsData = await toppingResponse.json();
			setToppings(toppingsData);
		};
		fetchToppings();
	}, [tenantId]);

	return (
		<section className="mt-6">
			<h4>Extra Toppings</h4>
			<div className="mt-2 flex flex-wrap gap-4 w-full bg-red-50">
				{toppings.map((topping) => (
					<ToppingCard
						key={topping._id}
						topping={topping}
						selectedToppings={selectedToppings}
						handleSelectTopping={handleSelectTopping}
					/>
				))}
			</div>
		</section>
	);
};

export default ToppingList;
