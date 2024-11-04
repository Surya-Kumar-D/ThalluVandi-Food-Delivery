// import mongoose from "mongoose";
// import fs from "fs";
// import dotenv from "dotenv";
// import Item from "../models/itemsModel.ts";
// import path from "path";

// dotenv.config();

// if (!process.env.DATABASE || !process.env.DATABASE_PASSWORD) {
//   throw new Error("DATABASE and DATABASE_PASSWORD are required");
// }

// const DB = process.env.DATABASE?.replace(
//   "<PASSWORD>",
//   process.env.DATABASE_PASSWORD
// ) as string;

// mongoose.connect(DB).then((con) => {
//   console.log("Connected to MongoDB");
// });

// const itemsPath = path.join(process.cwd(), "/backend/dev-data/food-items.json");

// const items = JSON.parse(fs.readFileSync(itemsPath, "utf-8"));

// export const importData = async () => {
//   try {
//     await Item.create(items);
//     cl
//   } catch (err) {
//     console.log(err);
//   }
// };
