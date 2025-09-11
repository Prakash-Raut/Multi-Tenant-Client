import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { getFromPrice } from "@/lib/utils";
import type { Product } from "@/types";
import ProductModal from "./product-modal";

type PropTypes = { product: Product };

const ProductCard = ({ product }: PropTypes) => {
	return (
		<Card className="overflow-hidden">
			<CardContent className="p-0">
				<div className="relative h-48 w-full">
					<Image
						src={product.image}
						alt={product.name}
						sizes="200px"
						fill
						className="object-cover"
					/>
				</div>
				<div className="p-4">
					<h3 className="text-xl font-bold">{product.name}</h3>
					<p className="text-sm text-gray-500 mt-1 mb-4">
						{product.description}
					</p>
					<div className="flex items-center justify-between">
						<span className="text-lg font-bold text-primary">
							₹{getFromPrice(product)}
						</span>
						<ProductModal product={product} />
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default ProductCard;
