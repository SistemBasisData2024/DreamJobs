import express from "express";
import resumeController from "../controllers/resumeController.js";

const router = express.Router();

router.get("/:user_id", resumeController.getResume);
router.get("/checkResume/:user_id", resumeController.checkResume);
router.post("/:user_id", resumeController.addResume);
router.put("/:id", resumeController.updateResume);

export default router;
