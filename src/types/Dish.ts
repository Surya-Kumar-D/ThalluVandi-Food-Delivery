export type Dish = {
  id: number;
  name: string;
  description: string;
  ingredients: string[];
  slug: string;
  price: number;
  category: string;
  spicyLevel: string;
  availability: boolean;
  imageUrl: string;
  total?: number;
};
