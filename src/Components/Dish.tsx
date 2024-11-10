import { ShoppingCart } from "lucide-react";
import React from "react";
import { getAlldishes } from "../Api/api";

import { Link } from "react-router-dom";
import { HashLoader } from "react-spinners";
import useStore from "../store/store";
import { Dish as DishType } from "../types/Dish";
import { AddAndRemoveCart, EmptyCart } from "./Cart";

interface DishItemProps {
  dish: DishType;
  isLoading: boolean;
}

getAlldishes();
const Dish: React.FC<DishItemProps> = ({ dish, isLoading }) => {
  const addToCart = useStore((state) => state.addToCart);
  const totalAmount = useStore((state) => state.totalAmount);
  const items = useStore((state) => state.Dish);
  console.log(items);
  return (
    <div className="dish-container">
      {isLoading ? (
        <HashLoader />
      ) : (
        <>
          <div className="dish-image">
            <Link to={`/items/${dish.slug}`}>
              <img src={`/img/dishes/${dish.imageUrl}`} alt={`${dish.name}`} />
            </Link>
          </div>
          <p className="dish-category">{dish.category}</p>
          <p className="dish-name">{dish.name}</p>
          <div className="dish-price-spice">
            <p className="dish-price">₹{dish.price}</p>
            <p aria-label="spice-level">
              Spice Level:{" "}
              {dish.spicyLevel === "High"
                ? "🌶️🌶️🌶️🌶️🌶️"
                : dish.spicyLevel === "Medium"
                ? "🌶️🌶️🌶️"
                : "🌶️"}
            </p>
          </div>

          {items.some((item) => item.id === dish.id) ? (
            <AddAndRemoveCart name={dish.name} itemId={dish.id} />
          ) : (
            <EmptyCart dish={dish} />
          )}

          <p>Total Amount: {totalAmount}</p>
        </>
      )}
    </div>
  );
};

export default Dish;
