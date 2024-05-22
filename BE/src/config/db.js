import dotenv from "dotenv";

import pg from "pg";

const { Pool } = pg;

dotenv.config();

const { DBPORT, DBHOST, DBDATABASE, DBUSER, DBPASSWORD } = process.env;

export const db = new Pool({
  host: DBHOST,
  database: DBDATABASE,
  user: DBUSER,
  password: DBPASSWORD,
  port: DBPORT,
  ssl: true,
});
