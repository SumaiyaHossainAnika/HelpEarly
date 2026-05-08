# Connect To The Shared Database

This project supports one shared online PostgreSQL database. The code is public, but the real database connection string is private and is **not** stored in Git.

## What you need

Ask the project owner for the private `DATABASE_URL`.

It looks like this:

```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
```

For this project it will usually be a Supabase session pooler URL.

## Setup after cloning

### 1. Clone the repository

```bash
git clone https://github.com/SumaiyaHossainAnika/HelpEarly.git
cd HelpEarly
```

### 2. Create the server environment file

```bash
cd server
cp .env.example .env
```

### 3. Edit `server/.env`

Open `server/.env` and paste the shared database URL:

```env
DATABASE_URL=your_shared_database_url_here
JWT_SECRET=helpearly_super_secret_jwt_key_2026
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

If `DATABASE_URL` is set, the app will use the shared online database instead of the local PostgreSQL settings.

### 4. Install and run the backend

```bash
npm install
node server.js
```

### 5. Install and run the frontend

Open a new terminal:

```bash
cd client
npm install
npm run dev
```

## What will be shared

If two people use the same `DATABASE_URL`, they will see the same:

- accounts
- passwords
- bans and unbans
- profile updates
- bookings
- job posts
- complaints
- reviews
- chats

## Important

- Do **not** commit the real `server/.env` to GitHub.
- Do **not** post the real `DATABASE_URL` publicly.
- Share the `DATABASE_URL` privately only with people who should access the database.
