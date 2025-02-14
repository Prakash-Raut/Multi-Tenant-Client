import { getSession } from "@/lib/session";
import { sanitizeParams } from "@/lib/utils";
import { redirect } from "next/navigation";
import CustomerDetail from "./customer-detail";
import OrderSummary from "./order-summary";

const CheckoutPage = async ({
  searchParams,
}: {
  searchParams: { restaurantId: string };
}) => {
  const session = await getSession();

  const sanitized = sanitizeParams(searchParams);
  const queryString = new URLSearchParams(sanitized).toString();

  if (!session) {
    return redirect(`/login?${queryString}`);
  }

  return (
    <section className="container mx-auto flex w-full items-start justify-between px-24 py-6">
      <CustomerDetail />
      <OrderSummary />
    </section>
  );
};

export default CheckoutPage;
