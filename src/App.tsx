import React, { useEffect, useState } from "react";
import Dish from "./Components/Dish";
import { type Dish as DishType } from "./types/Dish";
import { useQuery } from "@tanstack/react-query";
import { getAlldishes } from "./Api/api";
import { HashLoader } from "react-spinners";

function App() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["items"],
    queryFn: getAlldishes,
  });
  const [filter, setFilter] = useState<
    "All" | "Main Course" | "Starter" | "Bread" | "Gravy"
  >("All");
  const [filterItems, setFilterItems] = useState<DishType[]>(
    data as DishType[]
  );
  useEffect(() => {
    if (data) {
      setFilterItems(
        filter === "All"
          ? data
          : data.filter((item) => item.category === filter)
      );
    }
  }, [filter, data]);
  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <HashLoader />
      </div>
    );
  return (
    <>
      <div className="flex justify-between items-center  px-[5.5rem]">
        <p className="text-[1.2rem] font-bold">{filter}</p>
        <div className="flex items-center justify-center gap-5">
          <button
            onClick={() => setFilter("All")}
            className="text-[1.2rem] font-bold text-[#968f68] bg-white px-4 py-2 border rounded-2xl"
          >
            All
          </button>
          <button
            onClick={() => setFilter("Starter")}
            className="text-[1.2rem] font-bold text-[#968f68] bg-white px-4 py-2 border rounded-2xl"
          >
            Starter
          </button>
          <button
            onClick={() => setFilter("Main Course")}
            className="text-[1.2rem] font-bold text-[#968f68] bg-white px-4 py-2 border rounded-2xl"
          >
            Main Course
          </button>
          <button
            onClick={() => setFilter("Bread")}
            className="text-[1.2rem] font-bold text-[#968f68] bg-white px-4 py-2 border rounded-2xl"
          >
            Bread
          </button>
          <button
            onClick={() => setFilter("Gravy")}
            className="text-[1.2rem] font-bold text-[#968f68] bg-white px-4 py-2 border rounded-2xl"
          >
            Gravy
          </button>
        </div>
      </div>
      <div className="flex flex-wrap w-full h-auto gap-5 px-[3.5rem] items-center justify-center">
        {filterItems &&
          filterItems.map((item) => (
            <Dish key={item.id} dish={item} isLoading={isLoading} />
          ))}
      </div>
    </>
  );
}

export default App;
