import mongoose from "mongoose";
import slugify from "slugify";
import { Dish } from "../types/types.ts";
const itemSchema = new mongoose.Schema<Dish>({
  id: Number,
  name: String,
  slug: String,
  description: String,
  ingredients: Array,
  price: Number,
  category: String,
  spicyLevel: String,
  availability: Boolean,
  imageUrl: String,
});

itemSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

export default mongoose.model("Item", itemSchema);
