import CustomerDetail from "./customer-detail";
import OrderSummary from "./order-summary";

const CheckoutPage = () => {
  return (
    <section className="flex w-full items-start justify-between">
      <CustomerDetail />
      <OrderSummary />
    </section>
  );
};

export default CheckoutPage;
