"use client";

import { useState } from "react";
import ToppingCard, { Topping } from "./topping-card";

const toppings: Topping[] = [
  {
    id: "1",
    name: "Pepperoni",
    image: "/pizza-main.png",
    price: 0.5,
    isAvailable: true,
  },
  {
    id: "2",
    name: "Mushrooms",
    image: "/pizza-main.png",
    price: 0.5,
    isAvailable: true,
  },
  {
    id: "3",
    name: "Extra cheese",
    image: "/pizza-main.png",
    price: 0.5,
    isAvailable: true,
  },
];

const ToppingList = () => {
  const [selectedToppings, setSelectedToppings] = useState<Topping[]>([
    toppings[0],
  ]);

  const handleSelectTopping = (topping: Topping) => {
    const isAlreadySelected = selectedToppings.some((t) => t.id === topping.id);

    if (isAlreadySelected) {
      setSelectedToppings((prev) => prev.filter((t) => t.id !== topping.id));
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
            key={topping.id}
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
