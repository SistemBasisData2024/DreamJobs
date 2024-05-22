import express from "express";

import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";

import { db } from "./config/db.js";

import userRoutes from "./routes/user.routes.js";
import produkRoutes from "./routes/produk.routes.js";
import adminRoutes from "./routes/admin.routes.js";

dotenv.config();

const app = express();

/* === Server PORT === */
const PORT = process.env.PORT || 5000;

/* ===================================== */
/* ===========  Middlewares  =========== */
/* ===================================== */
/* Allow Cross Origin Request */
app.use(cors());
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
app.use("/produk", produkRoutes);
app.use("/admin", adminRoutes);

/* ======================================
 ** ========= Server connection =========
 ** ===================================== */
app.listen(PORT, async () => {
  try {
    /* === Connect to Database === */
    const connection = await db.connect();

    /* === Connection information === */
    process.stdout.write("\x1Bc");
    console.log("=== Welcome to Greenhaul Server Development ===");
    console.log(`\nServer\t : \x1b[4m%s\x1b[0m`, `http://localhost:${PORT}`);
    console.log(`Database : \x1b[32m%s\x1b[0m`, connection.database);
    console.log("\nRead README.MD if you have any confusion!");
  } catch (error) {
    throw new Error(error);
  }
});
