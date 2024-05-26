import express from "express";

import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import db from "./config/db.js";

import userRoutes from "./routes/user.routes.js";
//import jobRoutes from "./routes/job.routes.js"; -> buat isi job.routes dulu
//import resumeRoutes from "./routes/resume.routes.js";
//import applicationRoutes from "./routes/application.routes.js";
//import companyRoutes from "./routes/company.routes.js";

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
/*app.use("/jobs", jobRoutes);
app.use("/resume", resumeRoutes);
app.use("/application", applicationRoutes);
app.use("/company", companyRoutes);*/

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
