import { Button } from "@/components/ui/button";
import { useTotal } from "@/lib/hooks/useTotal";
import {
  changeQty,
  CartItem as Item,
} from "@/lib/store/features/cart/cartSlice";
import { useAppDispatch } from "@/lib/store/hooks";
import { X } from "lucide-react";
import Image from "next/image";
import QtyChanger from "./qty-changer";

const CartItem = ({ item }: { item: Item }) => {
  const dispatch = useAppDispatch();
  const total = useTotal(item);
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div className="flex w-3/4 items-center">
        <Image src={item.image} alt={item.name} width={100} height={100} />
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
          <QtyChanger
            handleQtyChange={(data) =>
              dispatch(changeQty({ hash: item.hash as string, qty: data }))
            }
          >
            {item.qty}
          </QtyChanger>
        </div>
        <div className="flex items-center">
          <div className="w-12 font-bold">&#8377;{total * item.qty}</div>
          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              dispatch(changeQty({ hash: item.hash as string, qty: 0 }))
            }
          >
            <X size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
