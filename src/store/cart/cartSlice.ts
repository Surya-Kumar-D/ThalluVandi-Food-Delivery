import { StateCreator } from "zustand";
import { Dish } from "../../../backend/types/types";

type InitialState = {
  Dish: Dish[];
  total: number;
};

type CartActions = {
  addToCart: (dish: Dish) => void;
  removeFromCart: (dish: Dish) => void;
  clearCart: () => void;
  setTotal: (total: number) => void;
};

const initialState: InitialState = {
  Dish: [],
  total: 0,
};

export type CartSlice = InitialState & CartActions;

export const cartSlice: StateCreator<CartSlice, [], [], CartSlice> = (set) => ({
  ...initialState,
});
