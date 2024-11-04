import express from "express";
import itemsRouter from "./routes/itemsRoutes.ts";

const app = express();

app.use("/api/v1/items", itemsRouter);

export default app;
