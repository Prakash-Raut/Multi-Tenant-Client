import CartItems from "./cart-items";

const CartPage = () => {
  return (
    <section className="container mx-auto space-y-6">
      <h1 className="text-lg font-bold">Shopping Cart</h1>
      <div className="mt-6 rounded-lg bg-white p-6">
        <CartItems />
      </div>
    </section>
  );
};

export default CartPage;
