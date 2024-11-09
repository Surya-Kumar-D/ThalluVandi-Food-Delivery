import React from "react";
import Dish from "./Components/Dish";
import { useQuery } from "@tanstack/react-query";
import { getAlldishes } from "./Api/api";
import { HashLoader } from "react-spinners";

function App() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["items"],
    queryFn: getAlldishes,
  });
  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <HashLoader />
      </div>
    );
  return (
    <div className="flex flex-wrap w-full h-auto gap-5 px-[3.5rem] items-center justify-center">
      {data &&
        data.map((item) => (
          <Dish key={item.id} dish={item} isLoading={isLoading} />
        ))}
    </div>
  );
}

export default App;
