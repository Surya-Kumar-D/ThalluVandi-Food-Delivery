import React from "react";
import Dish from "./Components/Dish";
import { useQuery } from "@tanstack/react-query";
import { getAlldishes } from "./Api/api";

function App() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["items"],
    queryFn: getAlldishes,
  });
  return (
    <div className="flex gap-5 flex-wrap  h-screen w-full">
      {data && data.map((item) => <Dish key={item.id} dish={item} />)}
    </div>
  );
}

export default App;
