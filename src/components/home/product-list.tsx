import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api } from "@/lib/config";
import type { Category, Product } from "@/types";
import ProductCard from "./product-card";

const fetchMenuData = async (restaurantId: string) => {
	try {
		const [categoryResponse, productResponse] = await Promise.all([
			fetch(`${api}/api/catalog/categories?perPage=100&currentPage=1`, {
				next: { revalidate: 3600 },
			}),
			fetch(
				`${api}/api/catalog/products?perPage=100&currentPage=1&tenantId=${restaurantId}`,
				{ next: { revalidate: 3600 } },
			),
		]);

		if (!categoryResponse.ok || !productResponse.ok) {
			return { categories: [], products: [] };
		}

		const categories: Category[] = await categoryResponse.json();
		const products: { data: Product[] } = await productResponse.json();

		return { categories, products: products.data };
	} catch (err) {
		console.error("Error fetching menu:", err);
		return { categories: [], products: [] };
	}
};

const ProductList = async ({
	searchParams,
}: {
	searchParams: Promise<{ restaurantId: string }>;
}) => {
	const { restaurantId } = await searchParams;

	const { categories, products } = await fetchMenuData(restaurantId);

	if (categories.length === 0) {
		return (
			<section className="container mx-auto px-24 py-10 text-center">
				<h2 className="text-2xl font-bold mb-4">Our Menu</h2>
				<p className="text-muted-foreground">No categories available.</p>
			</section>
		);
	}

	return (
		<section className="container mx-auto flex flex-col items-center justify-between px-24 py-4 mt-10">
			<h2 className="text-3xl font-bold text-center mb-10">Our Menu</h2>
			<Tabs defaultValue={categories[1]._id} className="w-full h-screen">
				<TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
					{categories.map((category: Category) => (
						<TabsTrigger
							key={category._id}
							value={category._id}
							className="text-base"
						>
							{category.name}
						</TabsTrigger>
					))}
				</TabsList>
				{categories.map((category) => {
					const filteredProducts = products.filter(
						(p) => p.categoryId === category._id,
					);
					return (
						<TabsContent key={category._id} value={category._id}>
							{filteredProducts.length === 0 ? (
								<p className="text-center text-muted-foreground mt-6">
									No products in this category.
								</p>
							) : (
								<div className="mt-6 grid grid-cols-4 gap-6">
									{filteredProducts.map((product) => (
										<ProductCard key={product._id} product={product} />
									))}
								</div>
							)}
						</TabsContent>
					);
				})}
			</Tabs>
		</section>
	);
};

export default ProductList;
