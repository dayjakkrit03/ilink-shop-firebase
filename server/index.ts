
import express from 'express';
import cors, { CorsOptions } from 'cors';
import { db } from '../src/db/index.js';

const app = express();
const port = process.env.PORT || 3001;

// --- START TRULY DYNAMIC CORS CONFIG ---

// This configuration uses Regular Expressions to allow any port for both
// local development and the Cloud Workstation environment.
const allowedOrigins: (string | RegExp)[] = [
  // 1. Allow localhost with ANY port for local development.
  // The /\d+/ part matches one or more digits (the port number).
  /^http:\/\/localhost:\d+$/,

  // 2. Allow the Cloud Workstation preview URL pattern with ANY port.
  /^https:\/\/\d+-.*?\.cloudworkstations\.dev$/
];

const corsOptions: CorsOptions = {
  origin: allowedOrigins,
  optionsSuccessStatus: 200
};

// --- END TRULY DYNAMIC CORS CONFIG ---

app.use(cors(corsOptions));

app.get('/api/test-db', async (req, res) => {
  try {
    const client = await db.connect();
    const result = await client.query('SELECT NOW()');
    res.status(200).json({
        message: 'Database connection successful!',
        time: result.rows[0].now
    });
    client.release();
  } catch (error: any) {
    console.error('Error connecting to the database:', error);
    res.status(500).json({ message: 'Error connecting to the database', error: (error as any).message || 'An unknown error occurred.' });
  }
});

app.get('/api/categories', async (req, res) => {
  try {
    const result = await db.query('SELECT id, name, slug FROM categories ORDER BY parent_id ASC NULLS FIRST');
    res.status(200).json({ data: result.rows });
  } catch (error: any) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Error fetching categories', error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});
