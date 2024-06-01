import express from "express";
import userController from "../controllers/userController.js";
import upload from "../config/upload_config.js";

const router = express.Router();

// Supaya user bisa memilih role yang telah ditetapkan
router.get("/roles", userController.userRoles); 

router.post("/signup", upload.single("photo"), userController.userSignup);
router.post("/login", userController.userLogin);
router.get("/:user_id", userController.getUserById);

export default router;
