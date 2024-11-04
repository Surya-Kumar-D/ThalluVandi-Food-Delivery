import app from "./app.ts";
import dotenv from "dotenv";
import mongoose from "mongoose";
// import { importData } from "./dev-data/import-dev-data.ts";

dotenv.config();
console.log(process.env.DATABASE);
if (!process.env.DATABASE || !process.env.DATABASE_PASSWORD) {
  throw new Error("DATABASE and DATABASE_PASSWORD are required");
}

const DB = process.env.DATABASE?.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
) as string;

mongoose.connect(DB).then(() => {
  console.log("Connected to MongoDB");
});

// importData();

const server = app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
