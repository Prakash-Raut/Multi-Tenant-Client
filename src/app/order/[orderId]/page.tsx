import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { api } from "@/lib/config";
import { Order } from "@/types";
import { Banknote, Coins, LayoutDashboard } from "lucide-react";
import { cookies } from "next/headers";
import OrderStep from "./components/order-step";

const fetchOrder = async (orderId: string) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const response = await fetch(
    `${api}/api/order/orders/${orderId}?fields=address,paymentStatus,paymentMode`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("An error occurred while fetching the order.");
  }

  const data: Order = await response.json();

  return data;
};

const OrderDetailPage = async ({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) => {
  const { orderId } = await params;

  const order = await fetchOrder(orderId);

  return (
    <section className="flex flex-col space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Order</CardTitle>
          <CardDescription>Track the order status</CardDescription>
        </CardHeader>
        <CardContent>
          <OrderStep orderId={order._id} />
        </CardContent>
      </Card>
      <div className="flex items-start justify-center gap-6">
        <Card className="w-1/3">
          <CardHeader>
            <CardTitle>Delivery Address</CardTitle>
          </CardHeader>
          <CardContent>
            <h2 className="text-lg font-semibold capitalize">
              {order.customerId.firstName + " " + order.customerId.lastName}
            </h2>
            <p className="leading-7">{order.address}</p>
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
              <span>{order._id}</span>
            </div>
            <div className="flex items-center gap-6">
              <Banknote />
              <h2 className="text-base font-medium">Payment Status</h2>
              <span className="uppercase">{order.paymentStatus}</span>
            </div>
            <div className="flex items-center gap-6">
              <Coins />
              <h2 className="text-base font-medium">Payment Method</h2>
              <span className="uppercase">{order.paymentMode}</span>
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
