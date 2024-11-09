import { immer } from "zustand/middleware/immer";
import { StoreSlice } from "../types/store";
import { cartSlice } from "./cart/cartSlice";
import { create } from "zustand";

const useStore = create<StoreSlice>()(
  immer((...a) => ({
    ...cartSlice(...a),
  }))
);

export default useStore;
