import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import FallBackSkeleton from "@/components/home/fallback-skeleton";
import ProductList from "@/components/home/product-list";
import Footer from "@/components/navigation/footer";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
	title: "Pizza Galleria - Order Pizza Online",
	description:
		"Welcome to Pizza Galleria! Explore our menu, discover exclusive deals, and order your favorite pizzas online with ease.",
};

export default async function Home({
	searchParams,
}: {
	searchParams: Promise<{ restaurantId: string }>;
}) {
	return (
		<>
			<section className="flex w-full items-center justify-between px-24 py-6">
				<div className="space-y-2">
					<h1 className="leading-tight text-7xl font-black">
						Delicious Pizza in <br />
						<span className="text-primary">Only 45 Minutes!</span>
					</h1>
					<p className="mt-8 max-w-lg text-2xl leading-snug">
						Enjoy a Free Meal if Your Order Takes More Than 45 Minutes!
					</p>
					<Button className="px6 mt-8 rounded-2xl py-7 text-lg font-bold">
						Get your pizza now
					</Button>
				</div>
				<div>
					<Image src="/pizza.jpg" alt="pizza" width={400} height={400} />
				</div>
			</section>
			<Suspense fallback={<FallBackSkeleton />}>
				<ProductList searchParams={searchParams} />
			</Suspense>
			<Footer />
		</>
	);
}
