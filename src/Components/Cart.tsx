import { Minus, Plus, ShoppingCart } from "lucide-react";
import React from "react";
import useStore from "../store/store";
import { Dish } from "../types/Dish";

export const EmptyCart = ({ dish }: { dish: Dish }) => {
  const addToCart = useStore((state) => state.addToCart);
  return (
    <div className="dish-cart" onClick={() => addToCart(dish)}>
      <button>
        <ShoppingCart />
      </button>
      <p>Add to Cart</p>
    </div>
  );
};

type CartProps = {
  itemId: number;
  total: number;
};

export const AddAndRemoveCart = ({ itemId, total }: CartProps) => {
  const addItem = useStore((state) => state.addItem);
  const removeItem = useStore((state) => state.removeItem);
  return (
    <div className="dish-cart group">
      <button>
        <Plus onClick={() => addItem(itemId)} />
      </button>
      <p className="group-hover:scale-125  mx-6 text-[.9rem] group-hover:text-[#faf6e3] group-hover:text-[1.1rem] font-bold duration-[.6s] ease-in-out transition-transform ">
        {total}
      </p>
      <button>
        <Minus
          // className="border border-white rounded-full"
          onClick={() => removeItem(itemId)}
        />
      </button>
    </div>
  );
};
