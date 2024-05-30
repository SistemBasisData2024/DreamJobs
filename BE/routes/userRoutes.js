import express from "express";
import userController from "../controllers/userController.js";


const router = express.Router();

// Define your routes using the imported controller methods
router.post("/company/signup", userController.companySignup);

export default router;
