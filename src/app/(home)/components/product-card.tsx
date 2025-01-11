import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";

export type Product = {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
};

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
          objectFit="contain"
        />
      </CardHeader>
      <CardContent>
        <h2 className="text-xl font-bold">{product.name}</h2>
        <p className="mt-2 text-sm">{product.description}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <p className="">
          <span>From </span>
          <span className="font-bold">₹{product.price}</span>
        </p>
        <Button className="rounded-full bg-orange-200 px-6 py-2 text-orange-500 shadow outline-none transition-all duration-150 ease-linear hover:bg-orange-300 hover:shadow-lg focus:outline-none">
          Choose
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
