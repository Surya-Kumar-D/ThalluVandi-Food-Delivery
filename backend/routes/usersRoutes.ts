import express from "express";
import {
  checkAuth,
  createUsers,
  getAllUsers,
  loginUser,
} from "../controllers/usersController.ts";

const router = express.Router();

router.route("/").get(getAllUsers);
router.route("/signup").post(createUsers);
router.route("/login").post(loginUser);
// @ts-ignore
router.route("/check").get(checkAuth);
export default router;
