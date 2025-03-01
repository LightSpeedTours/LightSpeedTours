import { useState } from "react";

export const useOrder = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      tourName: "Tour en la Montaña",
      date: "2025-03-10",
      guests: 2,
      price: 120.0,
    },
    {
      id: 2,
      tourName: "Aventura en la Selva",
      date: "2025-04-05",
      guests: 4,
      price: 200.0,
    },
  ]);

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  return { cartItems, removeItem };
};
