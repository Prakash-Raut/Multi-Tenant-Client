import FAQ from "@/components/custom/faq";
import Footer from "@/components/custom/footer";
import Testimonial from "@/components/custom/testimonials";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Suspense } from "react";
import FallBackSkeleton from "./components/fallback-skeleton";
import ProductList from "./components/product-list";

export default function Home({
  searchParams,
}: {
  searchParams: Promise<{ restaurantId: string }>;
}) {
  return (
    <>
      <section className="flex w-full items-center justify-between px-24 py-6">
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
      <Suspense fallback={<FallBackSkeleton />}>
        <ProductList searchParams={searchParams} />
      </Suspense>
      <div className="container flex flex-col items-center justify-center overflow-hidden">
        <Testimonial />
        <FAQ />
      </div>
      <Footer />
    </>
  );
}
