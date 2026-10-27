# 🍿 BingeWatch - Personal Movie & Web Series Watchlist (MERN Stack)

A full-stack web application built using the **MERN Stack** (MongoDB, Express.js, React, Node.js) to manage and track your personal movies, web series, and anime watchlists with real-time status updates and ratings.

---

## 📁 Project Folder Structure

```text
WP/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection logic via Mongoose
│   ├── controllers/
│   │   └── movieController.js    # CRUD request handlers for movies
│   ├── models/
│   │   └── Movie.js              # Mongoose Schema & validation
│   ├── routes/
│   │   └── movieRoutes.js        # Express REST API routes
│   ├── .env                      # Local environment variables
│   ├── .env.example              # Example environment template
│   ├── package.json              # Backend dependencies and scripts
│   ├── seed.js                   # Pre-populated dummy movies seed script
│   └── server.js                 # Express server entry point
│
├── frontend/
│   ├── index.html                # Main HTML template with Google Fonts
│   ├── package.json              # Frontend dependencies and Vite scripts
│   ├── vite.config.js            # Vite configuration with /api proxy
│   └── src/
│       ├── components/
│       │   ├── MovieCard.jsx     # Card UI: Title, platform badge, stars, status toggle, delete
│       │   ├── MovieForm.jsx     # Add entry form (title, type, platform, rating, status)
│       │   ├── Navbar.jsx        # App header & active counters
│       │   ├── StatsSummary.jsx  # Watchlist statistics summary tiles
│       │   └── StatusFilter.jsx  # Status filter tabs (All, Plan to Watch, Watching, Completed)
│       ├── services/
│       │   └── api.js            # API client service for backend communication
│       ├── App.css               # Modern dark-theme responsive styling
│       ├── App.jsx               # Main React application component
│       ├── index.css             # Global CSS reset & theme variables
│       └── main.jsx              # React DOM entry point
│
├── package.json                  # Root runner scripts
└── README.md                     # Comprehensive project documentation
```

---

## ⚡ Tech Stack & Technologies

- **Frontend:** React 18, Vite, Modern CSS3 (Dark Theme, Flexbox & CSS Grid)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB & Mongoose ODM
- **API Architecture:** RESTful JSON API with CORS enabled

---

## ⚙️ Installation & Setup Guide

### 1. Prerequisites
- **Node.js** (v18.0 or higher) - [Download Node.js](https://nodejs.org/)
- **MongoDB** running locally on default port `27017` **OR** a free [MongoDB Atlas](https://www.mongodb.com/atlas) connection string.

---

### 2. Backend Setup

Open a terminal in the project root directory:

```bash
cd backend
npm install
```

Configure your `.env` file in the `backend/` directory:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/watchlist_db
NODE_ENV=development
```
*(If using MongoDB Atlas, replace `MONGO_URI` with your Atlas connection string).*

#### Seed Dummy Data (Optional, but recommended for testing):
```bash
npm run seed
```
This populates 8 realistic movies, series, and anime with platforms and ratings.

#### Start Backend Server:
```bash
npm run dev
# Or: npm start
```
The server will start at: `http://localhost:5000`

---

### 3. Frontend Setup

Open a second terminal window:

```bash
cd frontend
npm install
npm run dev
```

The React application will launch at: `http://localhost:3000`

---

## 🔌 REST API Endpoints Reference

| Method | Endpoint | Description | Request Body |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/movies` | Fetch all watchlist entries | None |
| **POST** | `/api/movies` | Create a new movie/series entry | `{ title, type, platform, rating, status }` |
| **PUT** | `/api/movies/:id` | Update watch status or rating | `{ status?, rating?, title?, ... }` |
| **DELETE** | `/api/movies/:id` | Remove an entry from watchlist | None |

---

## 🎯 Key Features Implemented

1. **Movie Schema with Validation:**
   - `title`: String (Required, trimmed)
   - `type`: Enum `['Movie', 'Series', 'Anime']`
   - `platform`: Enum `['Netflix', 'Prime', 'Hotstar', 'YouTube', 'Other']`
   - `rating`: Number from 1 to 5
   - `status`: Enum `['Plan to Watch', 'Watching', 'Completed']`
   - `timestamps`: Automatic `createdAt` & `updatedAt`

2. **Responsive Dark-Themed UI:**
   - Platform-specific badges (Netflix Red, Prime Blue, Hotstar Teal, YouTube Red, Other Purple).
   - Dynamic counter dashboard for Total, Plan to Watch, Watching, and Completed.
   - Real-time search filter and status tabs.
   - Interactive star rating selector directly on cards.
   - One-click status cycle button (`Plan to Watch` ➔ `Watching` ➔ `Completed`).

