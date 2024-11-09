import { ShoppingCart } from "lucide-react";
import React from "react";
import { getAlldishes } from "../Api/api";
import { type Dish as DishType } from "../../backend/types/types";
import { Link } from "react-router-dom";
import { HashLoader } from "react-spinners";
import useStore from "../store/store";

interface DishItemProps {
  dish: DishType;
  isLoading: boolean;
}

getAlldishes();
const Dish: React.FC<DishItemProps> = ({ dish, isLoading }) => {
  const addToCart = useStore((state) => state.addToCart);
  const totalAmount = useStore((state) => state.totalAmount);
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
          <div className="dish-cart" onClick={() => addToCart(dish)}>
            <ShoppingCart />
            <p>Add to Cart</p>
          </div>
          <p>Total Amount: {totalAmount}</p>
        </>
      )}
    </div>
  );
};

export default Dish;
