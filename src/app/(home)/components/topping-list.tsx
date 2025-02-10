import { api } from "@/lib/config";
import { Topping } from "@/types";
import { useEffect, useState } from "react";
import ToppingCard from "./topping-card";

const ToppingList = () => {
  const [toppings, setToppings] = useState<Topping[]>([]);

  useEffect(() => {
    const fetchToppings = async () => {
      const toppingResponse = await fetch(`${api}/api/catalog/toppings`);
      const toppingsData = await toppingResponse.json();
      setToppings(toppingsData);
    };
    fetchToppings();
  }, []);

  const [selectedToppings, setSelectedToppings] = useState<Topping[]>([]);

  const handleSelectTopping = (topping: Topping) => {
    const isAlreadySelected = selectedToppings.some(
      (t) => t._id === topping._id
    );

    if (isAlreadySelected) {
      setSelectedToppings((prev) => prev.filter((t) => t._id !== topping._id));
      return;
    }

    setSelectedToppings((prev) => [...prev, topping]);
  };

  return (
    <section className="mt-6">
      <h4>Extra Toppings</h4>
      <div className="mt-2 grid grid-cols-3 gap-4">
        {toppings.map((topping) => (
          <ToppingCard
            key={topping._id}
            topping={topping}
            selectedToppings={selectedToppings}
            handleSelectTopping={handleSelectTopping}
          />
        ))}
      </div>
    </section>
  );
};

export default ToppingList;
