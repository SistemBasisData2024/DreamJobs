import express from "express";
import applicationController from "../controllers/applicationController.js";

const router = express.Router();

// Untuk menampilkan enum status dari application
router.get("", applicationController.jobStatus);

// Untuk melamar ke perjaan tertentu
router.post("", applicationController.addApplication);

// Untuk melihat pekerjaan apa saja yang dilamar user -> di sisi job seeker
router.get("/:user_id", applicationController.getAllApplication);

// Untuk memperbarui status dari sebuah lamaran pekerjaan -> di sisi company
router.put("/status/:id", applicationController.updateStatus);

// Untuk Mengambil data dari semua pelamar kerja untuk satu postingan job -> di sisi company
router.get("/getApplicants/:job_id", applicationController.getAllApplicant);

export default router;
