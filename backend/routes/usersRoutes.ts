import express from "express";
import { createUsers, getAllUsers } from "../controllers/usersController.ts";

const router = express.Router();

router.route("/").get(getAllUsers);
router.route("/").post(createUsers);

export default router;
