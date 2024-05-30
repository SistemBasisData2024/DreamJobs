import express from "express";
import userController from "../controllers/userController.js";

const router = express.Router();

router.post("/signup", userController.userSignup);
router.post("/login", userController.userLogin);

export default router;
