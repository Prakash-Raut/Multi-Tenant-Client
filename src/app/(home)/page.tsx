import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

export default function Home() {
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
          <Image
            src="/pizza-hero.jpg"
            alt="pizza"
            width={400}
            height={400}
            objectFit="contain"
          />
        </div>
      </section>
      <section className="container mx-auto flex items-center justify-between px-24 py-4">
        <div>
          <Tabs defaultValue="pizza" className="w-[400px]">
            <TabsList>
              <TabsTrigger value="pizza" className="text-base">
                Pizza
              </TabsTrigger>
              <TabsTrigger value="beverages" className="text-base">
                Beverages
              </TabsTrigger>
            </TabsList>
            <TabsContent value="pizza">
              Make changes to your pizza here.
            </TabsContent>
            <TabsContent value="beverages">
              Change your beverages here.
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  );
}
