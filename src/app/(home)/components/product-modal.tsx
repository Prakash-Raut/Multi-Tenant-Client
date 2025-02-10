"use client";

import { Button } from "@/components/ui/button";
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
import { Product, Topping } from "@/types";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { startTransition, Suspense, useState } from "react";
import FallBackSkeleton from "./fallback-skeleton";
import ToppingList from "./topping-list";

type SelectedOption = {
  [key: string]: string;
};

const ProductModal = ({ product }: { product: Product }) => {
  const [selectedOption, setSelectedOption] = useState<SelectedOption>();
  const [selectedToppings, setSelectedToppings] = useState<Topping[]>([]);

  const handleRadioChange = (key: string, value: string) => {
    startTransition(() => {
      setSelectedOption((prev) => {
        return {
          ...prev,
          [key]: value,
        };
      });
    });
    console.log(selectedOption);
  };

  const handleSelectTopping = (topping: Topping) => {
    const isAlreadySelected = selectedToppings.some(
      (t) => t._id === topping._id
    );

    startTransition(() => {
      if (isAlreadySelected) {
        setSelectedToppings((prev) =>
          prev.filter((t) => t._id !== topping._id)
        );
        return;
      }

      setSelectedToppings((prev) => [...prev, topping]);
    });
  };

  const handleAddToCart = () => {
    console.log("Add to cart clicked");
  };

  return (
    <Dialog>
      <DialogTrigger className="rounded-full bg-orange-200 px-6 py-2 text-orange-500 shadow outline-none transition-all duration-150 ease-linear hover:bg-orange-300 hover:shadow-lg focus:outline-none">
        Choose
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <div className="flex items-center justify-between gap-4">
          <div className="w-1/3">
            <Image
              // src={product.image}
              src={"/pizza-main.png"}
              alt={product.name}
              width={450}
              height={450}
            />
          </div>
          <div className="w-2/3">
            <DialogHeader>
              <DialogTitle>{product.name}</DialogTitle>
              <DialogDescription>{product.description}</DialogDescription>
            </DialogHeader>
            {Object.entries(product.category.priceConfiguration).map(
              ([key, value]) => (
                <div key={key}>
                  <h4 className="mt-6">{key}</h4>
                  <RadioGroup
                    defaultValue={value.availableOptions[0]}
                    onValueChange={(value) => {
                      handleRadioChange(key, value);
                    }}
                    className="mt-2 grid grid-cols-3 gap-4"
                  >
                    {value.availableOptions.map((option) => (
                      <div key={option}>
                        <RadioGroupItem
                          id={option}
                          value={option}
                          className="peer sr-only"
                          aria-label={option}
                        />
                        <Label
                          htmlFor={option}
                          className="flex flex-col items-center justify-between rounded-md border-2 bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              )
            )}
            <Suspense fallback={<FallBackSkeleton />}>
              <ToppingList
                selectedToppings={selectedToppings}
                handleSelectTopping={handleSelectTopping}
              />
            </Suspense>
            <div className="mt-12 flex items-center justify-between">
              <span className="text-lg font-bold">
                &#8377;
                {100}
              </span>
              <Button onClick={handleAddToCart}>
                <ShoppingCart size={20} />
                <span>Add to cart</span>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
