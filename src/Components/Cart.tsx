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
    <div className="dish-cart group">
      <Plus onClick={() => addItem(itemId)} />
      <p className="group-hover:scale-125 group-hover:mx-5 group-hover:text-[#faf6e3] group-hover:text-[1.1rem] font-bold duration-[.6s] ease-in-out transition-transform ">
        {name}
      </p>
      <Minus
        // className="border border-white rounded-full"
        onClick={() => removeItem(itemId)}
      />
    </div>
  );
};
