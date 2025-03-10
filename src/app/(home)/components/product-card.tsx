import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import { getFromPrice } from "@/lib/utils";
import type { Product } from "@/types";
import Image from "next/image";
import ProductModal from "./product-modal";

type PropTypes = { product: Product };

const ProductCard = ({ product }: PropTypes) => {
	return (
		<Card className="rounded-2xl border-none">
			<CardHeader className="flex items-center justify-center">
				<Image
					src={product.image}
					alt={product.name}
					width={150}
					height={150}
				/>
			</CardHeader>
			<CardContent>
				<h2 className="text-xl font-bold">{product.name}</h2>
				<p className="mt-2 text-sm">{product.description}</p>
			</CardContent>
			<CardFooter className="flex items-center justify-between">
				<p className="">
					<span>From </span>
					<span className="font-bold">₹{getFromPrice(product)}</span>
				</p>
				<ProductModal product={product} />
			</CardFooter>
		</Card>
	);
};

export default ProductCard;
