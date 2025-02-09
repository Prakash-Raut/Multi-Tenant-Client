import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api } from "@/lib/config";
import { Category, Product } from "@/types";
import ProductCard from "./product-card";

const ProductList = async () => {
  // TODO: Add Concurrent Req -> Promise.all

  const categoryResponse = await fetch(
    `${api}/api/catalog/categories?perPage=100&currentPage=1`,
    {
      next: {
        revalidate: 3600, // 1 hour
      },
    }
  );

  if (!categoryResponse.ok) {
    throw new Error("Failed to fetch categories");
  }

  const categories: Category[] = await categoryResponse.json();

  console.log(categories);

  //TODO: ADD DYNAMIC TenantId
  const productResponse = await fetch(
    `${api}/api/catalog/products?perPage=100&currentPage=1&tenantId=10`,
    {
      next: {
        revalidate: 3600, // 1 hour
      },
    }
  );

  if (!productResponse.ok) {
    throw new Error("Failed to fetch products");
  }

  const products: { data: Product[] } = await productResponse.json();

  console.log(products);

  return (
    <section className="container mx-auto flex items-center justify-between px-24 py-4">
      <Tabs defaultValue={categories[0]._id}>
        <TabsList>
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
        {categories.map((category: Category) => (
          <TabsContent key={category._id} value={category._id}>
            <div className="mt-6 grid grid-cols-4 gap-6">
              {products.data
                .filter((product) => product.categoryId === category._id)
                .map((product: Product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
};

export default ProductList;
