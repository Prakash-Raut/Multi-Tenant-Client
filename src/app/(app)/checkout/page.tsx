import { getSession } from "@/lib/session";
import { sanitizeParams } from "@/lib/utils";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import CustomerDetail from "./components/customer-detail";

export const metadata: Metadata = {
	title: "Checkout - Pizza Galleria",
	description:
		"Securely complete your Pizza Galleria order with our fast and easy checkout process. Choose delivery or pickup, and enjoy your meal!",
};

const CheckoutPage = async ({
	searchParams,
}: {
	searchParams: Promise<{ restaurantId: string }>;
}) => {
	const session = await getSession();
	const sp = await searchParams;
	const sanitized = sanitizeParams(sp);
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
