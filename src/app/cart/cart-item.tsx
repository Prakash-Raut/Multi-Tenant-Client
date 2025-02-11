import { Button } from "@/components/ui/button";
import { CartItem as Item } from "@/lib/store/features/cart/cartSlice";
import { X } from "lucide-react";
import Image from "next/image";
import QtyChanger from "./qty-changer";

const CartItem = ({ item }: { item: Item }) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div className="flex w-3/4 items-center">
        <Image
          src={"/pizza-main.png"}
          alt={item.name}
          width={100}
          height={100}
        />
        <div className="ml-6 flex w-full gap-12">
          <div className="flex-1">
            <h2 className="font-bold">{item.name}</h2>
            <h3 className="text-xs text-gray-500">
              {Object.values(item.chosenConfiguration.priceConfiguration)
                .map((value) => value)
                .join(", ")}
            </h3>
            <h3 className="text-xs text-gray-500">
              {item.chosenConfiguration.selectedToppings
                .map((topping) => topping.name)
                .join(", ")}
            </h3>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <QtyChanger handleQtyChange={() => {}}>{item.qty}</QtyChanger>
        </div>
        <div className="flex items-center">
          <div className="w-12 font-bold">&#8377;{300}</div>
          <Button variant="outline" size="icon" onClick={() => {}}>
            <X size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
