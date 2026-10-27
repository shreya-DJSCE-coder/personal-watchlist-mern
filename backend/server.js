const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');
const movieRoutes = require('./routes/movieRoutes');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Connect to MongoDB
connectDB();

// Core Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check / welcome route
app.get('/', (req, res) => {
  res.status(200).json({
    message: '🎬 Personal Movie & Web Series Watchlist API is running!',
    endpoints: {
      getAllMovies: 'GET /api/movies',
      addMovie: 'POST /api/movies',
      updateMovie: 'PUT /api/movies/:id',
      deleteMovie: 'DELETE /api/movies/:id'
    }
  });
});

// Mount Routes
app.use('/api/movies', movieRoutes);

// 404 Route Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `API Route not found: ${req.originalUrl}`
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Watchlist Server running on http://localhost:${PORT}`);
});

