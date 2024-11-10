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
import { AddAndRemoveCart, EmptyCart } from "./Cart";
import useStore from "../store/store";

function Item() {
  const { slug: searchParam } = useParams();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["item", searchParam],
    queryFn: () => getDish(searchParam),
  });
  const items = useStore((state) => state.Dish);
  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <HashLoader />
      </div>
    );
  const {
    slug,
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

  const dishInCart = items.find((item) => item.id === id);
  const total: number = dishInCart ? dishInCart.total : 0;
  return (
    <div className="flex items-center justify-center w-full h-full ">
      <div className="item-container [&>*]:text-[1.2rem]">
        <div className="item-image">
          <img src={`/img/dishes/${imageUrl}`} alt={name} />
        </div>
        <p className="item-flex ">
          <MdFoodBank />
          Name: {name}
        </p>
        <p className="item-flex">
          <TbCategory />
          Category: {category}
        </p>
        <p className="flex items-start justify-center max-w-[1000px] gap-2">
          <CgDetailsMore />
          <p>Descriptiion: {description}</p>
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
        {items.some((item) => item.id === id) ? (
          <AddAndRemoveCart itemId={id} total={total} />
        ) : (
          <EmptyCart
            dish={{
              id,
              name,
              price,
              category,
              imageUrl,
              total,
              spicyLevel,
              ingredients,
              availability,
              description,
              slug,
            }}
          />
        )}
      </div>
    </div>
  );
}

export default Item;
