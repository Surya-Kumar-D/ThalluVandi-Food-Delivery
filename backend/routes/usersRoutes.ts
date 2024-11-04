import express from "express";
import { getAllUsers } from "../controllers/usersController.ts";

const router = express.Router();

router.route("/").get(getAllUsers);

export default router;
