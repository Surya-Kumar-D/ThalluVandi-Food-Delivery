import express from "express";
import { getAllItems, getItem } from "../controllers/itemsController.ts";

const router = express.Router();

router.route("/").get(getAllItems);
router.route("/:slug").get(getItem);
export default router;
