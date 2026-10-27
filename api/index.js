const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');
const movieRoutes = require('./routes/movieRoutes');

// Load environment variables
dotenv.config();

const app = express();

// Core Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ensure Database connection for every incoming request (essential for serverless cold starts)
app.use(async (req, res, next) => {
  try {
    await connectDB();
  } catch (err) {
    console.error('Database connection warning in request middleware:', err.message);
  }
  next();
});

// Health check / welcome route
app.get(['/', '/api'], (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: '🎬 Personal Movie & Web Series Watchlist API is running on Vercel!',
    database: 'MongoDB Atlas Connected',
    endpoints: {
      getAllMovies: 'GET /api/movies',
      addMovie: 'POST /api/movies',
      updateMovie: 'PUT /api/movies/:id',
      deleteMovie: 'DELETE /api/movies/:id'
    }
  });
});

// Mount Routes - both with and without /api prefix for maximum serverless compatibility
app.use('/api/movies', movieRoutes);
app.use('/movies', movieRoutes);

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

// Start local HTTP server only if executed directly (e.g. node api/index.js)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Watchlist Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
