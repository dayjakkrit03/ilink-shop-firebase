import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error('DATABASE_URL is not set in the .env file.');
  process.exit(1);
}

const poolConfig: any = {
  connectionString: connectionString,
};

if (!connectionString.includes('localhost')) {
  poolConfig.ssl = {
    rejectUnauthorized: false,
  };
}

const pool = new Pool(poolConfig);

export const db = pool;
