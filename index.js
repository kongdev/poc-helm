require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

// PostgreSQL connection
const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
});

app.get('/', (req, res) => {
  res.json({ 
    message: process.env.MY_VALUE || 'Hello World',
    status: 'OK' 
  });
});

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Get table names from database
app.get('/tables', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    res.json({
      tables: result.rows.map(row => row.table_name),
      time: Date.now(),
      utc: new Date().toISOString()
    });
  } catch (error) {
    console.log(error)

    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});