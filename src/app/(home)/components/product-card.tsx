import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
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
        <Dialog>
          <DialogTrigger className="rounded-full bg-orange-200 px-6 py-2 text-orange-500 shadow outline-none transition-all duration-150 ease-linear hover:bg-orange-300 hover:shadow-lg focus:outline-none">
            Choose
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription>
              <div className="flex justify-between">
                <div className="w-1/3">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={450}
                    height={450}
                  />
                </div>
                <div className="w-2/3">
                  <div>
                    <h3 className="text-xl font-bold">{product.name}</h3>
                    <p className="mt-1">{product.description}</p>
                  </div>
                  <div>
                    <h4 className="mt-6">Choose the size</h4>
                    <RadioGroup
                      defaultValue="small"
                      className="mt-2 grid grid-cols-3 gap-4"
                    >
                      <div>
                        <RadioGroupItem
                          id="small"
                          value="small"
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor="small"
                          className="flex flex-col items-center justify-between rounded-md border-2 bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          Small
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem
                          id="medium"
                          value="medium"
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor="medium"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          Medium
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem
                          id="large"
                          value="large"
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor="large"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          Large
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div>
                    <h4 className="mt-6">Choose the crust</h4>
                    <RadioGroup
                      defaultValue="thin"
                      className="mt-2 grid grid-cols-3 gap-4"
                    >
                      <div>
                        <RadioGroupItem
                          id="thin"
                          value="thin"
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor="thin"
                          className="flex flex-col items-center justify-between rounded-md border-2 bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          Thin
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem
                          id="thick"
                          value="thick"
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor="thick"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          Thick
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
