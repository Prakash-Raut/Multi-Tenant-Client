import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Link from "next/link";

const OrderPage = async ({
  searchParams,
}: {
  searchParams: { restaurantId: string };
}) => {
  const { restaurantId } = await searchParams;
  console.log(restaurantId);
  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle>Orders</CardTitle>
          <CardDescription className="capitalize">
            My complete order history
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow className="bg-muted">
                <TableHead className="w-[100px]">Invoice</TableHead>
                <TableHead>Payment Status</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>Date Time</TableHead>
                <TableHead>Order Status</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead className="text-right">Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">INV001</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>Credit Card</TableCell>
                <TableCell>
                  {new Date().toLocaleDateString()}{" "}
                  {new Date().toLocaleTimeString()}
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">Completed</Badge>
                </TableCell>
                <TableCell>$250.00</TableCell>
                <TableCell className="text-right">
                  <Link href={`/`} className="text-primary underline">
                    More Details
                  </Link>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </section>
  );
};

export default OrderPage;
