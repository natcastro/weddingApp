# Sigil | Wedding Invitation Automation Platform

> **Simple. Elegant. Stress-Free.**

Sigil is a modern web application designed to automate and simplify the traditionally painful process of printing, organizing, and mailing wedding invitations. Built with **Next.js**, it empowers busy couples—students, professionals, and everyone in between—to manage their wedding logistics efficiently and with peace of mind.

No more spreadsheets, lost addresses, or forgotten guests. Sigil handles the tedious details so you can focus on your big day.

---

## 🚀 Features

- **Smart Guest List Management:** Easily create, organize, and categorize your guest list in one centralized dashboard.
- **Automated Address Organization:** Collect and format mailing addresses effortlessly.
- **Invitation Delivery Tracking:** Monitor the status of sent invitations and track RSVPs in real-time.
- **Logistics Dashboard:** Get a clear overview of your invitation timeline and pending tasks.
- **Error Prevention:** Built-in checks to ensure no guest is left behind.

---

## 🛠 Tech Stack

Built with a focus on performance, scalability, and modern web standards.

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Linting:** ESLint

---
# Sigil – Wedding Invitation & Guest Management

## Quick Start

Follow these steps to set up the project locally on your machine.

### Prerequisites

- Node.js (version 18 or higher recommended)
- npm, yarn, or pnpm

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/sigil.git
    cd sigil
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```

4.  **Open the app:**
    Navigate to [http://localhost:3000](http://localhost:3000) in your browser to see the application running.

---

## 🔮 Future Improvements

We are constantly working to improve Sigil. Here are some features on our roadmap:

- **AI-Powered Design Customization:** Generate custom invitation designs based on wedding themes.
- **QR Code RSVPs:** Scan-to-RSVP functionality on printed invitations.
- **Budget Tracking:** Integrated tools to track invitation and postage costs.
- **Multi-Event Support:** Manage rehearsal dinners and other wedding-related events separately.
- **Vendor Integration:** Connect directly with print shops for seamless fulfillment.

---

## 🚀 Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

---

This project adheres to professional coding standards and best practices to ensure maintainability and scalability.

**Happy Planning! 💍**

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
