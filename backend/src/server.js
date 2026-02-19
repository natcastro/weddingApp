require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT ?? 5002;

const pool = process.env.DATABASE_URL
  ? new Pool({ connectionString: process.env.DATABASE_URL })
  : null;

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

// GET /api/guests - returns guests with aggregated invitation status
app.get('/api/guests', async (req, res) => {
  if (!pool) {
    return res.status(503).json({ error: 'Database not configured' });
  }
  try {
    const result = await pool.query(`
      SELECT g.id, g.first_name, g.last_name, g.email, g.phone,
        CASE
          WHEN bool_or(i.status = 'DRAFT') THEN 'Pending Approval'
          ELSE 'Confirmed'
        END AS status
      FROM guests g
      LEFT JOIN invitations i ON i.guest_id = g.id
      WHERE g.wedding_id = 1
      GROUP BY g.id, g.first_name, g.last_name, g.email, g.phone
      ORDER BY g.last_name, g.first_name
    `);
    const guests = result.rows.map((r) => ({
      id: Number(r.id),
      name: `${r.first_name} ${r.last_name}`,
      email: r.email || '',
      phone: r.phone || '',
      status: r.status,
    }));
    res.json(guests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch guests' });
  }
});

// PATCH /api/guests/:id/approve - updates DRAFT invitations to APPROVED for guest
app.patch('/api/guests/:id/approve', async (req, res) => {
  if (!pool) {
    return res.status(503).json({ error: 'Database not configured' });
  }
  const guestId = parseInt(req.params.id, 10);
  if (isNaN(guestId)) {
    return res.status(400).json({ error: 'Invalid guest ID' });
  }
  try {
    const updateResult = await pool.query(
      `UPDATE invitations SET status = 'APPROVED' WHERE guest_id = $1 AND status = 'DRAFT' RETURNING id, guest_id, status`,
      [guestId]
    );
    if (updateResult.rowCount === 0) {
      return res.status(404).json({ error: 'No pending invitations to approve' });
    }
    const guestResult = await pool.query(
      `SELECT g.id, g.first_name, g.last_name, g.email, g.phone,
        CASE WHEN bool_or(i.status = 'DRAFT') THEN 'Pending Approval' ELSE 'Confirmed' END AS status
       FROM guests g
       LEFT JOIN invitations i ON i.guest_id = g.id
       WHERE g.id = $1
       GROUP BY g.id, g.first_name, g.last_name, g.email, g.phone`,
      [guestId]
    );
    const g = guestResult.rows[0];
    res.json({
      id: Number(g.id),
      name: `${g.first_name} ${g.last_name}`,
      email: g.email || '',
      phone: g.phone || '',
      status: g.status,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to approve guest' });
  }
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
    console.error(`Error: Port ${port} is already in use. Set PORT to a different value in .env`);
  } else {
    console.error(err);
  }
  process.exit(1);
});
