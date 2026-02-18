require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = process.env.BACKEND_PORT || process.env.PORT;
if (!port) {
  console.error('Error: BACKEND_PORT or PORT must be set in .env');
  process.exit(1);
}

const pool = process.env.DATABASE_URL
  ? new Pool({ connectionString: process.env.DATABASE_URL })
  : null;

app.use(cors({
  origin: process.env.FRONTEND_ORIGIN || 'http://localhost:3000',
}));
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

const server = app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Error: Port ${port} is already in use. Please free the port or set a different BACKEND_PORT.`);
  } else {
    console.error(err);
  }
  process.exit(1);
});
