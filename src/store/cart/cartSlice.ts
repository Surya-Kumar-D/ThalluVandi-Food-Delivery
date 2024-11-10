import { StateCreator } from "zustand";
import { Dish } from "../../types/Dish";

type InitialState = {
  Dish: Dish[];
  totalAmount: number;
  totalItems: number;
};

type CartActions = {
  addToCart: (dish: Dish) => void;
  removeFromCart: (dishId: number) => void;
  addItem: (dishId: number) => void;
  removeItem: (dishId: number) => void;
  clearCart: () => void;
};

const initialState: InitialState = {
  Dish: [],
  totalAmount: 0,
  totalItems: 0,
};

export type CartSlice = InitialState & CartActions;

export const cartSlice: StateCreator<
  CartSlice,
  [["zustand/immer", never]],
  [],
  CartSlice
> = (set) => ({
  ...initialState,
  addToCart: (dish: Dish) =>
    set((state) => {
      state.Dish.push({ ...dish, total: 1 });
      state.totalAmount += dish.price;
      state.totalItems += 1;
    }),
  removeFromCart: (dishId: number) =>
    set((state) => {
      const dish = state.Dish.find((dish) => dish.id === dishId);
      if (dish) {
        state.Dish = state.Dish.filter((dish) => dish.id !== dishId);
      }
    }),
  addItem: (dishId: number) =>
    set((state) => {
      const item = state.Dish.find((dish) => dish.id === dishId);
      if (item) {
        item.total += 1;
        state.totalAmount += item.price;
        state.totalItems += 1;
      }
    }),
  removeItem: (dishId: number) =>
    set((state) => {
      const item = state.Dish.find((dish) => dish.id === dishId);

      if (item && item.total > 1) {
        item.total -= 1;
        state.totalAmount -= item.price;
        state.totalItems -= 1;
      } else if (item && item.total === 1) {
        state.Dish = state.Dish.filter((dish) => dish.id !== dishId);
        state.totalAmount -= item.price;
        state.totalItems -= 1;
      }
    }),
  clearCart: () => set({ ...initialState }),
});
