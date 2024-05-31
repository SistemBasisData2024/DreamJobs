import express from "express";
import userController from "../controllers/userController.js";

const router = express.Router();

// Supaya user bisa memilih role yang telah ditetapkan
router.post("/roles", userController.userRoles); 

router.post("/signup", userController.userSignup);
router.post("/login", userController.userLogin);

export default router;
