# Sigil | Wedding Invitation Automation Platform

> **Simple. Elegant. Stress-Free.**

## App Summary

Sigil is a modern web application designed to automate and simplify the traditionally painful process of printing, organizing, and mailing wedding invitations. The primary users are engaged couples—students, professionals, and everyone in between—who need a stress-free solution to manage their wedding logistics efficiently. Sigil allows users to create and manage their guest list, track invitation delivery logistics, organize mailing addresses, and ensure no guest is forgotten, providing peace of mind during the wedding planning process.

---

## Tech Stack

This project is built using a modern, scalable technology stack:

| Layer | Technology | Description |
|-------|-------------|-------------|
| **Frontend** | [Next.js 16](https://nextjs.org/) (React 19) | App Router, Server Components, TypeScript |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | Utility-first CSS framework |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) | Production-ready animation library |
| **Icons** | [Lucide React](https://lucide.dev/) | Consistent icon set |
| **Backend** | [Express.js](https://expressjs.com/) | Minimalist web framework for Node.js |
| **Database** | [PostgreSQL](https://www.postgresql.org/) | Open Source Relational Database |
| **Driver** | [node-postgres (pg)](https://node-postgres.com/) | PostgreSQL client for Node.js |

---

## Architecture Diagram

The system follows a standard client-server architecture with a PostgreSQL database.


graph LR
    User((User))
    Frontend[Frontend (Next.js)]
    Backend[Backend (Express)]
    Database[(PostgreSQL)]

    User -- Browser / HTTP --> Frontend
    Frontend -- REST API / JSON --> Backend
    Backend -- SQL Query --> Database
    Database -- Result Set --> Backend
    Backend -- JSON Response --> Frontend
---

## Prerequisites

Before running the project, ensure you have the following installed on your machine:

1.  **Node.js** (v18 or higher)
    -   [Download Node.js](https://nodejs.org/)
    -   Verify: `node -v`
2.  **npm** (comes with Node.js)
    -   Verify: `npm -v`
3.  **PostgreSQL** (v14 or higher recommended)
    -   [Download PostgreSQL](https://www.postgresql.org/download/)
    -   Ensure `psql` is in your system PATH.
    -   Verify: `psql --version`

---

## Installation and Setup

Follow these steps to set up the project locally.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/sigil.git
    cd sigil
    ```

2.  **Install dependencies:**
    This will install dependencies for both the root, frontend, and backend workspaces.
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Copy the example environment file to create your local configuration.
    ```bash
    cp .env.example .env
    ```
    Open the `.env` file and update the `DATABASE_URL` with your PostgreSQL credentials (replace `password` with your actual password):
    ```env
    DATABASE_URL=postgresql://postgres:your_password@localhost:5432/weddingapp
    BACKEND_PORT=5000
    ```

4.  **Database Setup:**
    Create the database and run the initialization scripts.

    *Create the database:*
    ```bash
    psql -U postgres -c "CREATE DATABASE weddingapp;"
    ```

    *Run the schema (creates tables):*
    ```bash
    psql -U postgres -d weddingapp -f db/schema.sql
    ```

    *Seed the database (inserts initial data):*
    ```bash
    psql -U postgres -d weddingapp -f db/seed.sql
    ```

---

## Running the Application

Start the development server from the root directory. This command uses `concurrently` to run both the frontend (Next.js) and backend (Express) servers simultaneously.

```bash
npm run dev
```

-   **Frontend:** Open [http://localhost:3000](http://localhost:3000) in your browser.
-   **Backend:** The API is running at [http://localhost:5000](http://localhost:5000).

---

## Verifying the Vertical Slice

To verify the core functionality of the Guest List management:

1.  **Start the Application:**
    Ensure the app is running via `npm run dev`.

2.  **Navigate to the Guest List:**
    Open your browser to [http://localhost:3000/dashboard/guests](http://localhost:3000/dashboard/guests).
    You should see a list of guests with statuses like "Confirmed", "Pending Approval", etc.

3.  **Trigger the Feature (Approve Guest):**
    -   Locate a guest with the status **"Pending Approval"** (e.g., "Michael Chen").
    -   Click the **Checkmark (✔)** icon in the specific row.

4.  **Confirm UI Update:**
    -   Observe that the status immediately changes to **"Confirmed"** on the screen.
    -   The guest's row styling updates to reflect the verified status.

> **Note:** The current version utilizes mock data on the frontend for demonstration purposes. The robust backend integration (connecting the API endpoints to the PostgreSQL database for persistence) is configured and ready for the next implementation phase.

