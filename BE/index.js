import express from "express";

import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import db from "./config/db.js";
import path from "path";
import { fileURLToPath } from "url";

import userRoutes from "./routes/userRoutes.js"
import jobRoutes from "./routes/jobRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
import upload from "./config/upload_config.js"

dotenv.config();

const app = express();

/* === Server PORT === */
const PORT = process.env.PORT || 4000;

/* ===================================== */
/* ===========  Middlewares  =========== */
/* ===================================== */
/* Allow Cross Origin Request */
app.use(
  cors({
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
/* All request is JSON based */
app.use(express.json());
/* All request is encoded with x-www-form-urlencoded */
app.use(express.urlencoded({ extended: true }));
/* Extra protection */
app.use(helmet());

/* ===================================== */
/* ============   Routes    ============ */
/* ===================================== */

app.use("/user", userRoutes);
app.use("/resume", resumeRoutes);
app.use("/company", companyRoutes);
app.use("/jobs", jobRoutes);
app.use("/application", applicationRoutes);

// Static files
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Upload route example
app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    // req.file contains information about the uploaded file
    const file = req.file;

    // Here you can save the file information to the database
    // e.g., await db.query('INSERT INTO files (filename, path) VALUES (?, ?)', [file.filename, file.path]);

    res.status(200).json({ message: "File uploaded successfully", file });
  } catch (error) {
    res.status(500).json({ message: "File upload failed", error });
  }
});

/* ======================================
 ** ========= Server connection =========
 ** ===================================== */
app.listen(PORT, async () => {
  try {
    /* === Connect to Database === */
    const connection = await db.connect();

    /* === Connection information === */
    process.stdout.write("\x1Bc");
    console.log("=== Welcome to DREAMJOBS Server  ===");
    console.log(`\nServer\t : \x1b[4m%s\x1b[0m`, `http://localhost:${PORT}`);
    console.log(`Database : \x1b[32m%s\x1b[0m`, connection.database);
    console.log("\nRead README.MD if you have any confusion!");
  } catch (error) {
    throw new Error(error);
  }
});
