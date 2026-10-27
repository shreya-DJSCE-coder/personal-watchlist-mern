# 🍿 BingeWatch - Personal Movie & Web Series Watchlist (MERN Stack)

A production-ready full-stack web application built using the **MERN Stack** (MongoDB Atlas, Express.js, React, Node.js) to manage and track your personal movies, web series, and anime watchlists with real-time status updates and ratings.

---

## 🚀 Live Vercel Deployment Architecture

This project is configured to run **100% on Vercel** as a unified full-stack application:
- **Frontend:** React 18 + Vite compiled to static assets served globally via Vercel Edge CDN.
- **Backend API:** Express serverless function (`/api/index.js`) handling all REST endpoints (`/api/movies`).
- **Database:** MongoDB Atlas cloud cluster (`cluster0.4mm8slo.mongodb.net`).
- **Zero CORS / "Failed to fetch" Issues:** Both frontend and backend share the same domain via `vercel.json` URL rewrites, eliminating cross-origin errors and mixed-content issues.

---

## 📁 Project Structure

```text
WP/
├── api/
│   └── index.js                          # Vercel Serverless Function entry point
├── backend/
│   ├── config/
│   │   └── db.js                         # MongoDB connection with serverless connection caching
│   ├── controllers/
│   │   └── movieController.js            # CRUD handlers (GET, POST, PUT, DELETE)
│   ├── models/
│   │   └── Movie.js                      # Mongoose Schema & validation
│   ├── routes/
│   │   └── movieRoutes.js                # Express REST API routes
│   ├── .env                              # Environment variables (MongoDB Atlas URI)
│   ├── .env.example                      # Template for environment variables
│   ├── seed.js                           # Database seeding script for dummy data
│   └── server.js                         # Express server (local & serverless export)
├── frontend/
│   ├── index.html                        # HTML template with Google Fonts
│   ├── vite.config.js                    # Vite configuration with proxy
│   └── src/
│       ├── components/                   # React components (MovieCard, MovieForm, etc.)
│       ├── services/api.js               # Clean REST API client
│       ├── App.css                       # Modern dark-theme responsive UI styles
│       ├── App.jsx                       # Main application state & logic
│       ├── index.css                     # Global reset & CSS variables
│       └── main.jsx                      # React DOM mount point
├── package.json                          # Root runner & Vercel build script
├── vercel.json                           # Vercel routing & serverless rewrites
└── README.md                             # Documentation
```

---

## 🌐 Deploy to Vercel in 1-Click

1. Push this repository to GitHub (or import your repo on [Vercel](https://vercel.com)).
2. On the Vercel **New Project** screen:
   - **Framework Preset:** Vite
   - **Root Directory:** `./` (Leave as default project root)
   - **Build Command:** `npm run build` (auto-detected)
   - **Output Directory:** `frontend/dist` (auto-detected from `vercel.json`)
3. **Environment Variables:**
   - Add `MONGO_URI` = `mongodb+srv://shreyayadav9619573842_db_user:r6hE7x9VfuPPydgC@cluster0.4mm8slo.mongodb.net/watchlist?retryWrites=true&w=majority`
4. Click **Deploy**!

---

## 💻 Local Development

### 1. Install Dependencies
```bash
# Install root, backend, and frontend dependencies
npm run install:all
npm install
```

### 2. Seed Database (Optional)
```bash
npm run seed
```

### 3. Run Locally
- In terminal 1: `npm run server` (Backend starts on `http://localhost:5000`)
- In terminal 2: `npm run client` (Frontend starts on `http://localhost:3000`)

---

## 🔌 REST API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/api/movies` | Fetch all watchlist items from MongoDB Atlas |
| **POST** | `/api/movies` | Add a new entry `{ title, type, platform, rating, status }` |
| **PUT** | `/api/movies/:id` | Update watch status or star rating |
| **DELETE**| `/api/movies/:id` | Delete an entry |
