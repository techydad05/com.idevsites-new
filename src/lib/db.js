// src/lib/db.js
import pkg from "pg";
const { Pool } = pkg;
import { DATABASE_URL } from "$env/static/private";
console.log("POOL::", Pool);

const pool = new Pool({
  connectionString: DATABASE_URL,
});

export const query = (text, params) => pool.query(text, params);
