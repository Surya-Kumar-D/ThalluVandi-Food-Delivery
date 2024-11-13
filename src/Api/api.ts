// api.js
import axios from "axios";
import { type Iuser } from "../../backend/types/types";
import toast from "react-hot-toast";

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

export const userSignUp = async (formData: FormData) => {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const passwordConfirm = formData.get("passwordConfirm") as string;

  try {
    const res = await api.post("/api/v1/users/signup", {
      name,
      email,
      password,
      passwordConfirm,
    });

    toast.success("Your account is successfully created");
    await userLogin({ email, password });
    setTimeout(() => (window.location.href = "/"), 2000);
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      "There was an error creating your account";
    toast.error(errorMessage);
    console.error(errorMessage);
  }
};

export const userLogin = async ({ email, password }) => {
  try {
    const res = await api.post(
      "/api/v1/users/login",
      { email, password },
      { withCredentials: true }
    );
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};
