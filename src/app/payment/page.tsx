import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { ArrowLeft, CheckCircle2, LayoutDashboard, Store } from "lucide-react";
import Link from "next/link";

const PaymentPage = () => {
  return (
    <div className="mt-32 flex w-full flex-col items-center gap-4">
      <CheckCircle2 size={80} className="text-green-500" />
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Order Placed Successfully
      </h1>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        Thank you for shopping with us. Your order has been placed successfully.
      </p>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-start justify-between gap-12">
            <div className="flex items-center gap-3">
              <Store className="text-primary" />
              <span>Your Order Information</span>
            </div>
            <Badge variant="secondary" className="px-4 text-base">
              Confirmed
            </Badge>
          </CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="space-y-2 p-4">
          <div className="flex items-center gap-4">
            <LayoutDashboard size={20} />
            <h2 className="text-base font-medium tracking-tight first:mt-0">
              Order Refrence:
            </h2>
            <Link href={`/`} className="underline" passHref>
              1234
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <LayoutDashboard size={20} />
            <h2 className="text-base font-medium tracking-tight first:mt-0">
              Payment Status
            </h2>
            <span>Paid</span>
          </div>
        </CardContent>
      </Card>
      <Button asChild>
        <Link href={`/`} passHref>
          <ArrowLeft size={20} />
          Place Another Order
        </Link>
      </Button>
    </div>
  );
};

export default PaymentPage;
