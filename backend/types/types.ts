// User Type

export type Iuser = Document & {
  name: string;
  email: string;
  slug?: string;
  role?: "customer" | "admin";
  password: string;
  passwordConfirm: string;
};

export type Dish = {
  id: number;
  name: string;
  description: string;
  ingredients: string[];
  price: number;
  category: string;
  spicyLevel: string;
  availability: boolean;
  imageUrl: string;
};
