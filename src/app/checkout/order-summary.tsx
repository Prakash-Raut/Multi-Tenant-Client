import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAppSelector } from "@/lib/store/hooks";
import { getItemTotal } from "@/lib/utils";
import { useMemo, useState } from "react";

const OrderSummary = () => {
  const cart = useAppSelector((state) => state.cart.cartItems);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [discountPercentage, setDiscountPercentage] = useState(10);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [taxesPercentage, setTaxesPercentage] = useState(18);

  const subTotal = useMemo(() => {
    return cart.reduce((acc, curr) => {
      return acc + curr.qty * getItemTotal(curr);
    }, 0);
  }, [cart]);

  const discountTotal = useMemo(() => {
    return Math.round(subTotal * discountPercentage) / 100;
  }, [subTotal, discountPercentage]);

  const taxesTotal = useMemo(() => {
    const amountAfterDiscount = subTotal - discountTotal;

    return Math.round((amountAfterDiscount * taxesPercentage) / 100);
  }, [subTotal, discountTotal, taxesPercentage]);

  const deliveryCharges = useMemo(() => {
    return 100;
  }, []);

  const grandTotal = useMemo(() => {
    return subTotal - discountTotal + taxesTotal + deliveryCharges;
  }, [subTotal, discountTotal, taxesTotal, deliveryCharges]);

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between">
          <span>Sub Total</span>
          <strong>&#8377;{subTotal}</strong>
        </div>
        <div className="flex justify-between">
          <span>Discount</span>
          <strong>&#8377;{discountTotal}</strong>
        </div>
        <div className="flex justify-between">
          <span>Taxes</span>
          <strong>&#8377;{taxesTotal}</strong>
        </div>
        <div className="flex justify-between">
          <span>Delivery Charges</span>
          <strong>&#8377;{deliveryCharges}</strong>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <div className="flex w-full items-center justify-between">
          <span className="font-bold">Order Total</span>
          <span className="font-bold">&#8377;{grandTotal}</span>
        </div>
        <div className="flex w-full items-center justify-between space-x-2">
          <Input type="text" placeholder="Coupon Code" />
          <Button variant="secondary">Apply</Button>
        </div>
        <div className="flex w-full items-center justify-end">
          <Button>Place Order</Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default OrderSummary;
