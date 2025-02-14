import { getSession } from "@/lib/session";
import { sanitizeParams } from "@/lib/utils";
import { redirect } from "next/navigation";
import CustomerDetail from "./customer-detail";

const CheckoutPage = async ({
  searchParams,
}: {
  searchParams: { restaurantId: string };
}) => {
  const session = await getSession();

  const sanitized = sanitizeParams(searchParams);
  const sParams = new URLSearchParams(sanitized);
  const existingQueryString = sParams.toString();

  sParams.append("return-to", `/checkout?${existingQueryString}`);

  if (!session) {
    return redirect(`/login?${sParams}`);
  }

  return (
    <section className="container mx-auto w-full px-24 py-6">
      <CustomerDetail />
    </section>
  );
};

export default CheckoutPage;
