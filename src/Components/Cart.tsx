import { Minus, Plus, ShoppingCart } from "lucide-react";
import React from "react";
import useStore from "../store/store";
import { Dish } from "../types/Dish";

export const EmptyCart = ({ dish }: { dish: Dish }) => {
  const addToCart = useStore((state) => state.addToCart);
  return (
    <div className="dish-cart" onClick={() => addToCart(dish)}>
      <ShoppingCart />
      <p>Add to Cart</p>
    </div>
  );
};

type CartProps = {
  name: string;
  itemId: number;
};

export const AddAndRemoveCart = ({ name, itemId }: CartProps) => {
  const addItem = useStore((state) => state.addItem);
  const removeItem = useStore((state) => state.removeItem);
  return (
    <div className="dish-cart">
      <Plus onClick={() => addItem(itemId)} />
      <p>{name}</p>
      <Minus onClick={() => removeItem(itemId)} />
    </div>
  );
};
