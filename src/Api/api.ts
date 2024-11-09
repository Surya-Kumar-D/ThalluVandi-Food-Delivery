// api.js
import axios from "axios";
import { type Dish } from "../../backend/types/types";
const api = axios.create({
  baseURL: "http://localhost:3000", // Your API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

export const getAlldishes = async (): Promise<Dish[] | undefined> => {
  try {
    const res = await api.get("/api/v1/items");
    return res.data.data;
  } catch (err) {
    console.log(err);
  }
};

export const getDish = async (
  slug: string | undefined
): Promise<Dish[] | undefined> => {
  try {
    const res = await api.get(`/api/v1/items/${slug}`);
    return res.data.data;
  } catch (err) {
    console.log(err);
  }
};
