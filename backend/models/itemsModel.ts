import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  id: Number,
  name: String,
  description: String,
  ingredients: Array,
  price: Number,
  category: String,
  spicyLevel: String,
  availability: Boolean,
  imageUrl: String,
});

export default mongoose.model("Item", itemSchema);
