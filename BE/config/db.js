import dotenv from "dotenv";
import pg from "pg";

const { Pool } = pg;
dotenv.config();

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;

const db = new Pool({
  host: DB_HOST,
  database: DB_NAME,
  user: DB_USER,
  password: DB_PASSWORD,
  port: DB_PORT
});

db.on("connect", () => {
  console.log("Connected to PostgreSQL database");
});

db.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1); 
});

export default db;
