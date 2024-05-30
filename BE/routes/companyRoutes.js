import express from "express";
import companyController from "../controllers/companyController.js";

const router = express.Router();

router.get("/:user_id", companyController.getDetail);
router.post("/:user_id", companyController.addDetail);
router.put("/:id", companyController.updateDetail);

export default router;
