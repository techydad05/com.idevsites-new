// src/lib/db.js
import { Pool } from 'pg';
import { env } from '$env/dynamic/private';

const pool = new Pool({
  connectionString: env.DATABASE_URL
});

export const query = (text, params) => pool.query(text, params);
