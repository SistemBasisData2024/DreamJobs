import express from "express";
import jobController from "../controllers/jobController.js";

const router = express.Router();

/* Supaya bisa memilih jenis dan bidang pekerjaan sesuai dengan enum di database
   atau untuk menampilkan dropdown saat filtering */
router.get("/jobType", jobController.jobType);
router.get("/field", jobController.field);

// Posting pekerjaan dan mendapatkan detail pekerjaan
router.post("/:company_id", jobController.addJob);
router.get("/:id", jobController.getJob);

// Untuk menampilkan hasil berdasarkan filter yang disediakan
router.get("/type/:job_type", jobController.getJobsByType);
router.get("/location/:location", jobController.getJobsByLocation);
router.get("/field/:field", jobController.getJobsByField);

export default router;
