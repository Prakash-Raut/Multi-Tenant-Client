import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api } from "@/lib/config";
import { Category } from "@/types";
import Image from "next/image";
import ProductCard, { Product } from "./components/product-card";

const products: Product[] = [
  {
    id: "1",
    name: "Pizza",
    description: "Delicious pizza",
    image: "/pizza-main.png",
    price: 10,
  },
  {
    id: "2",
    name: "Beverages",
    description: "Refreshing beverages",
    image: "/pizza-main.png",
    price: 5,
  },
];

export default async function Home() {
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

  return (
    <>
      <section className="container mx-auto flex items-center justify-between px-24 py-4">
        <div>
          <h1 className="leading-2 text-7xl font-black">
            Delicious Pizza in <br />
            <span className="text-primary">Only 45 Minutes!</span>
          </h1>
          <p className="mt-8 max-w-lg text-2xl leading-snug">
            Enjoy a Free Meal if Your Order Takes More Than 45 Minutes!
          </p>
          <Button className="px6 mt-8 rounded-full py-7 text-lg font-bold">
            Get your pizza now
          </Button>
        </div>
        <div>
          <Image src="/pizza-main.png" alt="pizza" width={400} height={400} />
        </div>
      </section>
      <section className="container mx-auto flex items-center justify-between px-24 py-4">
        <div>
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
            <TabsContent value="pizza">
              <div className="mt-6 grid grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="beverages">
              <div className="mt-6 grid grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  );
}
