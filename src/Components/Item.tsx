import { useParams } from "react-router-dom";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getDish } from "../Api/api";
import { ShoppingCart } from "lucide-react";
import { TbCategory } from "react-icons/tb";
import { MdFoodBank } from "react-icons/md";
import { CgDetailsMore } from "react-icons/cg";
import { GiOpenedFoodCan } from "react-icons/gi";
import { SiLevelsdotfyi } from "react-icons/si";
import { IoMdPricetags } from "react-icons/io";
import { HashLoader } from "react-spinners";

function Item() {
  const { slug } = useParams();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["item", slug],
    queryFn: () => getDish(slug),
  });
  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <HashLoader />
      </div>
    );
  console.log(data);
  const {
    availability,
    category,
    description,
    id,
    imageUrl,
    ingredients,
    name,
    price,
    spicyLevel,
  } = data[0];

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="item-container">
        <div className="item-image">
          <img src={`/img/dishes/${imageUrl}`} alt={name} />
        </div>
        <p className="item-flex">
          <MdFoodBank />
          Name: {name}
        </p>
        <p className="item-flex">
          <TbCategory />
          Category: {category}
        </p>
        <p className="item-flex">
          <CgDetailsMore />
          Descriptiion: {description}
        </p>
        <p className="item-flex">
          <GiOpenedFoodCan /> Ingredients:
          {ingredients.map((ing) => `${" "}${ing},`)}
        </p>
        <p className="item-flex">
          <SiLevelsdotfyi /> Spicy Level:{" "}
          {spicyLevel === "Hot"
            ? "🌶️🌶️🌶️🌶️🌶️"
            : spicyLevel === "Medium"
            ? "🌶️🌶️🌶️"
            : "🌶️"}
        </p>
        <p className="item-flex">
          <IoMdPricetags /> Price: ₹{`${price}`}
        </p>
        <div className="dish-cart">
          <ShoppingCart />
          <p>Add to Cart</p>
        </div>
      </div>
    </div>
  );
}

export default Item;
