"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { type CartItem, addToCart } from "@/lib/store/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { cn, hashTheItem } from "@/lib/utils";
import type { Product, Topping } from "@/types";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { Suspense, startTransition, useMemo, useState } from "react";
import { toast } from "sonner";
import FallBackSkeleton from "./fallback-skeleton";
import ToppingList from "./topping-list";

type ChosenConfig = {
	[key: string]: string;
};

const ProductModal = ({ product }: { product: Product }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const dispatch = useAppDispatch();
	const cartItems = useAppSelector((state) => state.cart.cartItems);
	// const defaultConfig = Object.entries(product.category.priceConfiguration)
	//   .map(([key, value]) => {
	//     return {
	//       [key]: value.availableOptions[0],
	//     };
	//   })
	//   .reduce((acc, curr) => {
	//     return {
	//       ...acc,
	//       ...curr,
	//     };
	//   }, {});
	const defaultConfig = Object.entries(product.category.priceConfiguration)
		.map(([key, value]) => ({ [key]: value.availableOptions[0] }))
		.reduce((acc, curr) => Object.assign(acc, curr), {});

	const [chosenConfig, setChosenConfig] = useState<ChosenConfig>(
		defaultConfig as unknown as ChosenConfig,
	);
	const [selectedToppings, setSelectedToppings] = useState<Topping[]>([]);

	const totalPrice = useMemo(() => {
		const toppingsTotal = selectedToppings.reduce(
			(acc, curr) => acc + curr.price,
			0,
		);
		const configTotal = Object.entries(chosenConfig).reduce(
			(acc, [key, value]) => {
				const price = product.priceConfiguration[key].availableOptions[value];
				return acc + price;
			},
			0,
		);

		return toppingsTotal + configTotal;
	}, [chosenConfig, selectedToppings, product]);

	const alreadyHasInCart = useMemo(() => {
		const currentConfiguration = {
			_id: product._id,
			name: product.name,
			image: product.image,
			priceConfiguration: product.priceConfiguration,
			chosenConfiguration: {
				priceConfiguration: { ...chosenConfig },
				selectedToppings: selectedToppings,
			},
			qty: 1,
		};

		const hash = hashTheItem(currentConfiguration);

		return cartItems.some((item) => item.hash === hash);
	}, [product, chosenConfig, selectedToppings, cartItems]);

	const handleRadioChange = (key: string, value: string) => {
		startTransition(() => {
			setChosenConfig((prev) => {
				return {
					...prev,
					[key]: value,
				};
			});
		});
	};

	const handleSelectTopping = (topping: Topping) => {
		const isAlreadySelected = selectedToppings.some(
			(t) => t._id === topping._id,
		);

		startTransition(() => {
			if (isAlreadySelected) {
				setSelectedToppings((prev) =>
					prev.filter((t) => t._id !== topping._id),
				);
				return;
			}

			setSelectedToppings((prev) => [...prev, topping]);
		});
	};

	const handleAddToCart = (product: Product) => {
		const itemToAdd: CartItem = {
			_id: product._id,
			name: product.name,
			image: product.image,
			priceConfiguration: product.priceConfiguration,
			chosenConfiguration: {
				priceConfiguration: chosenConfig,
				selectedToppings: selectedToppings,
			},
			qty: 1,
		};
		dispatch(addToCart(itemToAdd));
		setIsModalOpen(false);
		setSelectedToppings([]);
		toast.success("Item added to cart");
	};

	return (
		<Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
			<DialogTrigger className="rounded-full bg-orange-200 px-6 py-2 text-orange-500 shadow outline-none transition-all duration-150 ease-linear hover:bg-orange-300 hover:shadow-lg focus:outline-none">
				Choose
			</DialogTrigger>
			<DialogContent className="max-w-3xl">
				<div className="flex items-center justify-between gap-4">
					<div className="w-1/3">
						<Image
							src={product.image}
							alt={product.name}
							width={450}
							height={450}
						/>
					</div>
					<div className="w-2/3">
						<DialogHeader>
							<DialogTitle>{product.name}</DialogTitle>
							<DialogDescription>{product.description}</DialogDescription>
						</DialogHeader>
						{Object.entries(product.category.priceConfiguration).map(
							([key, value]) => (
								<div key={key}>
									<h4 className="mt-6">{key}</h4>
									<RadioGroup
										defaultValue={value.availableOptions[0]}
										onValueChange={(value) => {
											handleRadioChange(key, value);
										}}
										className="mt-2 grid grid-cols-3 gap-4"
									>
										{value.availableOptions.map((option) => (
											<div key={option}>
												<RadioGroupItem
													id={option}
													value={option}
													className="peer sr-only"
													aria-label={option}
												/>
												<Label
													htmlFor={option}
													className="flex flex-col items-center justify-between rounded-md border-2 bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
												>
													{option}
												</Label>
											</div>
										))}
									</RadioGroup>
								</div>
							),
						)}
						{/* TODO: Make this condition dynamic (add hasTopping in Backend Category Route) */}
						{product.category.name === "Pizza" && (
							<Suspense fallback={<FallBackSkeleton />}>
								<ToppingList
									selectedToppings={selectedToppings}
									handleSelectTopping={handleSelectTopping}
								/>
							</Suspense>
						)}
						<div className="mt-12 flex items-center justify-between">
							<span className="text-lg font-bold">
								&#8377;
								{totalPrice}
							</span>
							<Button
								className={cn(alreadyHasInCart ? "bg-gray-700" : "bg-primary")}
								onClick={() => handleAddToCart(product)}
								disabled={alreadyHasInCart}
							>
								<ShoppingCart size={20} />
								<span>
									{alreadyHasInCart ? "Already in cart" : "Add to cart"}
								</span>
							</Button>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default ProductModal;
