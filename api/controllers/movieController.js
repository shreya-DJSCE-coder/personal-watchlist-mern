const mongoose = require('mongoose');
const Movie = require('../models/Movie');
const { connectDB } = require('../config/db');

// @desc    Get all movie/series entries from MongoDB Atlas
// @route   GET /api/movies
// @access  Public
const getMovies = async (req, res) => {
  try {
    await connectDB();

    const { status, type } = req.query;
    const filter = {};

    if (status && status !== 'All') {
      filter.status = status;
    }
    if (type && type !== 'All') {
      filter.type = type;
    }

    const movies = await Movie.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: movies.length,
      data: movies
    });
  } catch (error) {
    console.error('Error fetching from MongoDB Atlas:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error: Unable to fetch watchlist items from database',
      error: error.message
    });
  }
};

// @desc    Add a new movie/series entry directly to MongoDB Atlas
// @route   POST /api/movies
// @access  Public
const addMovie = async (req, res) => {
  try {
    await connectDB();

    const { title, type, platform, rating, status } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Title is required'
      });
    }

    const movie = await Movie.create({
      title: title.trim(),
      type: type || 'Movie',
      platform: platform || 'Netflix',
      rating: Number(rating) || 3,
      status: status || 'Plan to Watch'
    });

    console.log(`✅ Saved new movie to MongoDB Atlas: [${movie._id}] ${movie.title}`);

    res.status(201).json({
      success: true,
      message: 'Movie added successfully to MongoDB Atlas',
      data: movie
    });
  } catch (error) {
    console.error('Error adding to MongoDB Atlas:', error);
    res.status(400).json({
      success: false,
      message: error.message || 'Validation Error'
    });
  }
};

// @desc    Update watch status or rating in MongoDB Atlas
// @route   PUT /api/movies/:id
// @access  Public
const updateMovie = async (req, res) => {
  try {
    await connectDB();

    const { id } = req.params;
    const { title, type, platform, rating, status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: `Invalid MongoDB ID format: ${id}`
      });
    }

    const updateFields = {};
    if (title !== undefined) updateFields.title = title.trim();
    if (type !== undefined) updateFields.type = type;
    if (platform !== undefined) updateFields.platform = platform;
    if (rating !== undefined) updateFields.rating = Number(rating);
    if (status !== undefined) updateFields.status = status;

    const updatedMovie = await Movie.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!updatedMovie) {
      return res.status(404).json({
        success: false,
        message: `Watchlist item not found in MongoDB Atlas with id: ${id}`
      });
    }

    console.log(`✅ Updated movie in MongoDB Atlas: [${id}]`);

    res.status(200).json({
      success: true,
      message: 'Watchlist item updated in MongoDB Atlas',
      data: updatedMovie
    });
  } catch (error) {
    console.error('Error updating in MongoDB Atlas:', error);
    res.status(400).json({
      success: false,
      message: error.message || 'Error updating movie entry'
    });
  }
};

// @desc    Delete movie/series entry directly from MongoDB Atlas
// @route   DELETE /api/movies/:id
// @access  Public
const deleteMovie = async (req, res) => {
  try {
    await connectDB();

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: `Invalid MongoDB ID format: ${id}`
      });
    }

    const movie = await Movie.findByIdAndDelete(id);

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: `Watchlist item not found in MongoDB Atlas with id: ${id}`
      });
    }

    console.log(`🗑️ Deleted movie from MongoDB Atlas: [${id}] "${movie.title}"`);

    res.status(200).json({
      success: true,
      message: 'Watchlist item deleted from MongoDB Atlas',
      data: { id }
    });
  } catch (error) {
    console.error('Error deleting from MongoDB Atlas:', error);
    res.status(400).json({
      success: false,
      message: error.message || 'Error deleting movie entry'
    });
  }
};

module.exports = {
  getMovies,
  addMovie,
  updateMovie,
  deleteMovie
};
