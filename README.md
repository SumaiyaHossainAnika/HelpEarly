# At Your Service

A web platform connecting households with trusted local helpers for home services.

## Features

- **User Registration & Login** - JWT-based auth with role-based access (Household, Helper, Admin)
- **Helper Profiles** - Detailed profiles with services, skills, availability, and ratings
- **Search & Filter** - Find helpers by category, location, rating, and price
- **Online Booking** - Schedule services with date, time, and address
- **Real-time Chat** - Socket.io-powered messaging between users and helpers
- **Job Board** - Households post jobs, helpers apply with proposals
- **Ratings & Reviews** - Rate completed services with star ratings and comments
- **Admin Dashboard** - Platform stats, user management, activity monitoring
- **Payment Tracking** - Track earnings and payment history

## Tech Stack

| Layer      | Technology                     |
|------------|-------------------------------|
| Frontend   | React.js, Vite, React Router |
| Backend    | Node.js, Express.js          |
| Database   | PostgreSQL                    |
| Real-time  | Socket.io                     |
| Auth       | JWT + bcrypt                  |
| Styling    | Vanilla CSS (Dark Theme)     |

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL 14+

### 1. Setup Database

For a shared online database, create one hosted PostgreSQL database and put the same `DATABASE_URL` in `server/.env` on every PC:

```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE?sslmode=require
```

When `DATABASE_URL` is set, every account, ban, booking, complaint, and chat is stored in that same online database.

This repository does not include the real `server/.env` file. If you clone it and want the same shared database, create `server/.env` from `server/.env.example` and paste the same private `DATABASE_URL` there.

For local-only development:

```bash
# Create database
createdb helpearly

# Initialize schema & seed data
cd server
cp .env.example .env  # edit with your DB credentials
npm run db:init
```

### 2. Start Server

```bash
cd server
npm install
node server.js
```

Server runs on `http://localhost:5000`

### 3. Start Client

```bash
cd client
npm install
npm run dev
```

Client runs on `http://localhost:5173`

## Demo Accounts

| Role      | Email              | Password |
|-----------|-------------------|----------|
| Household | fatima@example.com | test123  |
| Helper    | rahim@example.com  | test123  |
| Admin     | admin@helpearly.com| admin123 |

## Project Structure

```
sdpproject/
├── client/          # React Frontend (Vite)
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page views
│   │   ├── context/     # Auth context
│   │   └── utils/       # API helpers
│   └── ...
├── server/          # Express Backend
│   ├── controllers/   # Route handlers
│   ├── routes/        # API routes
│   ├── middleware/     # Auth & upload middleware
│   ├── db/           # Schema & seed data
│   ├── socket/       # Real-time chat
│   └── ...
└── README.md
```
