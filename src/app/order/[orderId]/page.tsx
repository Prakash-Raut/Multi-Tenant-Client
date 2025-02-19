import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Banknote, Coins, LayoutDashboard } from "lucide-react";
import OrderStep from "./components/order-step";

const OrderDetailPage = () => {
  return (
    <section className="flex flex-col space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Order</CardTitle>
          <CardDescription>Track the order status</CardDescription>
        </CardHeader>
        <CardContent>
          <OrderStep />
        </CardContent>
      </Card>
      <div className="flex items-start justify-center gap-6">
        <Card className="w-1/3">
          <CardHeader>
            <CardTitle>Delivery Address</CardTitle>
          </CardHeader>
          <CardContent>
            <h2 className="text-lg font-semibold">Prakash R</h2>
            <p className="leading-7">Address</p>
          </CardContent>
        </Card>
        <Card className="w-2/3">
          <CardHeader>
            <CardTitle>Your Order Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center gap-6">
              <LayoutDashboard />
              <h2 className="text-base font-medium">Order Reference</h2>
              <span>123456789</span>
            </div>
            <div className="flex items-center gap-6">
              <Banknote />
              <h2 className="text-base font-medium">Payment Status</h2>
              <span>Paid</span>
            </div>
            <div className="flex items-center gap-6">
              <Coins />
              <h2 className="text-base font-medium">Payment Method</h2>
              <span>Card</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="destructive">Cancel Order</Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
};

export default OrderDetailPage;
