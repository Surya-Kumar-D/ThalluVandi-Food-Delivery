import { immer } from "zustand/middleware/immer";
import { StoreSlice } from "../types/store";
import { cartSlice } from "./cart/cartSlice";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

const useStore = create<StoreSlice>()(
  devtools(
    immer((...a) => ({
      ...cartSlice(...a),
    }))
  )
);

export default useStore;
