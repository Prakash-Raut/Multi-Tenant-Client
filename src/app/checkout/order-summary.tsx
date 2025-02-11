import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const OrderSummary = () => {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between">
          <p>Sub Total</p>
          <span>{100}</span>
        </div>
        <div className="flex justify-between">
          <p>Taxes</p>
          <span>{100}</span>
        </div>
        <div className="flex justify-between">
          <p>Delivery Charges</p>
          <span>{100}</span>
        </div>
        <div className="flex justify-between">
          <p>Discount</p>
          <span>{100}</span>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <div className="flex w-full items-center justify-between">
          <p>Order Total</p>
          <span>{100}</span>
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
