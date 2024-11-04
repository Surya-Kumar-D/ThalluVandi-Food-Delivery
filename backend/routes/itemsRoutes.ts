import express from "express";
import { getAllItems } from "../controllers/itemsController.ts";

const router = express.Router();

router.route("/").get(getAllItems);

export default router;
