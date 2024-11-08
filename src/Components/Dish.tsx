import { ShoppingCart } from "lucide-react";
import React from "react";
import { getAlldishes } from "../Api/api";
import { type Dish as DishType } from "../../backend/types/types";

interface DishItemProps {
  dish: DishType;
}

getAlldishes();
const Dish: React.FC<DishItemProps> = ({ dish }) => {
  return (
    <div className="dish-container">
      <div className="dish-image">
        <img src={`/img/dishes/${dish.imageUrl}`} alt={`${dish.name}`} />
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
      <div className="dish-cart">
        <ShoppingCart />
        <p>Add to Cart</p>
      </div>
    </div>
  );
};

export default Dish;
