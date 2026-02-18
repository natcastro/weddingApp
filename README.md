# Sigil – Wedding Invitation & Guest Management

## Quick Start

From the project root (`weddingApp/`):

```bash
npm install
cp .env.example .env
# Edit .env and set your Postgres password in DATABASE_URL

psql -U postgres -c "CREATE DATABASE weddingapp;"
psql -U postgres -d weddingapp -f db/schema.sql
psql -U postgres -d weddingapp -f db/seed.sql

npm run dev
# If ports in use: npm run dev:fresh
```

Open **http://localhost:3002** in your browser. The backend runs on **http://localhost:5002**. All config lives in the root `.env` only.

---

## App Summary

Sigil helps couples design, manage, and send wedding invitations. The primary users are engaged couples who want a simple way to track guests, manage invitations across multiple events (ceremony, reception, etc.), and handle payments. The app provides a dashboard for guest lists, invitation status (draft, approved, mailed), and payment tracking. Couples can create save-the-date pages, send invitations, and monitor RSVPs—all in one place.

## Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | Next.js 16 (React 19), TypeScript, Tailwind CSS, Framer Motion |
| **Backend** | Node.js, Express.js |
| **Database** | PostgreSQL (via `pg` driver) |
| **Auth** | Not yet implemented |
| **External** | None |

## Architecture Diagram

```
┌──────┐     HTTP/JSON      ┌─────────────┐     REST API      ┌─────────────┐     SQL       ┌──────────┐
│ User │ ─────────────────▶ │  Frontend   │ ─────────────────▶ │   Backend   │ ───────────▶ │ Postgres │
│      │                    │  (Next.js)  │                    │  (Express)  │              │          │
│      │                    │  :3000      │                    │   :5000     │              │  :5432   │
└──────┘                    └─────────────┘                    └─────────────┘              └──────────┘
       │                              │                                  │
       │    Browser requests          │    /api/* proxied to backend     │    pg Pool
       │    localhost:3000            │                                  │
       └──────────────────────────────┴──────────────────────────────────┘
```

## Prerequisites

- **Node.js** (v18+) – [Install](https://nodejs.org/)
- **npm** – comes with Node.js
- **PostgreSQL** – [Install](https://www.postgresql.org/download/)
- **psql** – included with PostgreSQL, must be in your system PATH

Verify installation:

```bash
node --version   # v18.x or higher
npm --version
psql --version
```

## Installation and Setup

1. **Clone the repo and enter the project root** (e.g. `weddingApp/`):

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create the database:**
   ```bash
   psql -U postgres -c "CREATE DATABASE weddingapp;"
   ```

4. **Run the schema:**
   ```bash
   psql -U postgres -d weddingapp -f db/schema.sql
   ```

5. **Run the seed:**
   ```bash
   psql -U postgres -d weddingapp -f db/seed.sql
   ```

6. **Configure environment variables** (root `.env` only):
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and set your Postgres password:
   ```
   DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/weddingapp
   PORT=5002
   FRONTEND_PORT=3002
   API_TARGET=http://localhost:5002
   ```

## Running the Application

From the project root:

```bash
npm run dev
```

This starts both the frontend and backend:

- **Frontend:** http://localhost:3002  
- **Backend:** http://localhost:5002  

To run them separately:

- `npm run dev:frontend` – Next.js only  
- `npm run dev:backend` – Express only  

## Verifying the Vertical Slice

The **Approve** button on the Guest List page updates the database and persists after refresh.

1. **Start the app** (if not already running):
   ```bash
   npm run dev
   ```

2. **Open the Guest List:**
   - Go to http://localhost:3002/dashboard/guests  
   - Or: Home → Dashboard (sidebar) → Guests  

3. **Trigger the feature:**
   - Find a guest with status **"Pending Approval"** (e.g., Sarah Brown, Robert Wilson)  
   - Click the green **checkmark** (✓) button  

4. **Confirm the UI updates:**
   - The status should change to **"Confirmed"** immediately  

5. **Verify persistence:**
   - Refresh the page (F5 or Cmd+R)  
   - The guest should still show **"Confirmed"**  

6. **Optional – confirm in the database:**
   ```bash
   psql -U postgres -d weddingapp -c "SELECT g.first_name, g.last_name, i.status FROM guests g JOIN invitations i ON i.guest_id = g.id WHERE g.id = 3 ORDER BY i.id;"
   ```
   After approving guest 3 (Sarah Brown), their invitation statuses should show `APPROVED` instead of `DRAFT`.

## Troubleshooting

- **EADDRINUSE (port in use)** – Run `npm run dev:fresh` to kill processes on 3002/5002 and restart. Or change `FRONTEND_PORT` and `PORT` in `.env`.
- **"Failed to fetch" or 403** – Run `npm run dev` from the root (starts both). Ensure root `.env` has `PORT`, `API_TARGET`, and `DATABASE_URL` set.
- **"Database not configured"** – Set `DATABASE_URL` in root `.env` and ensure PostgreSQL is running. Create the database and run `schema.sql` and `seed.sql`.
