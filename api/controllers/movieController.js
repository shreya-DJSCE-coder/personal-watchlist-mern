const Movie = require('../models/Movie');
const { getIsConnected } = require('../config/db');

// In-memory store fallback with initial dummy entries if MongoDB is not running locally
let memoryWatchlist = [
  {
    _id: '1',
    title: 'Inception',
    type: 'Movie',
    platform: 'Netflix',
    rating: 5,
    status: 'Completed',
    createdAt: new Date().toISOString()
  },
  {
    _id: '2',
    title: 'Stranger Things',
    type: 'Series',
    platform: 'Netflix',
    rating: 4,
    status: 'Watching',
    createdAt: new Date().toISOString()
  },
  {
    _id: '3',
    title: 'The Boys',
    type: 'Series',
    platform: 'Prime',
    rating: 5,
    status: 'Completed',
    createdAt: new Date().toISOString()
  },
  {
    _id: '4',
    title: 'Attack on Titan',
    type: 'Anime',
    platform: 'Other',
    rating: 5,
    status: 'Completed',
    createdAt: new Date().toISOString()
  },
  {
    _id: '5',
    title: 'Loki',
    type: 'Series',
    platform: 'Hotstar',
    rating: 4,
    status: 'Plan to Watch',
    createdAt: new Date().toISOString()
  },
  {
    _id: '6',
    title: 'Interstellar',
    type: 'Movie',
    platform: 'Prime',
    rating: 5,
    status: 'Completed',
    createdAt: new Date().toISOString()
  },
  {
    _id: '7',
    title: 'Jujutsu Kaisen',
    type: 'Anime',
    platform: 'Netflix',
    rating: 4,
    status: 'Watching',
    createdAt: new Date().toISOString()
  },
  {
    _id: '8',
    title: 'MKBHD Tech Studio',
    type: 'Series',
    platform: 'YouTube',
    rating: 4,
    status: 'Plan to Watch',
    createdAt: new Date().toISOString()
  }
];

// @desc    Get all movie/series entries
// @route   GET /api/movies
const getMovies = async (req, res) => {
  try {
    const { status, type } = req.query;

    if (getIsConnected()) {
      const filter = {};
      if (status && status !== 'All') filter.status = status;
      if (type && type !== 'All') filter.type = type;

      const movies = await Movie.find(filter).sort({ createdAt: -1 });
      return res.status(200).json({
        success: true,
        source: 'MongoDB',
        count: movies.length,
        data: movies
      });
    }

    // Fallback: In-memory store
    let filtered = [...memoryWatchlist];
    if (status && status !== 'All') {
      filtered = filtered.filter((m) => m.status === status);
    }
    if (type && type !== 'All') {
      filtered = filtered.filter((m) => m.type === type);
    }

    res.status(200).json({
      success: true,
      source: 'In-Memory',
      count: filtered.length,
      data: filtered
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error: Unable to fetch watchlist items',
      error: error.message
    });
  }
};

// @desc    Add a new movie/series entry
// @route   POST /api/movies
const addMovie = async (req, res) => {
  try {
    const { title, type, platform, rating, status } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Title is required'
      });
    }

    if (getIsConnected()) {
      const movie = await Movie.create({
        title: title.trim(),
        type: type || 'Movie',
        platform: platform || 'Netflix',
        rating: Number(rating) || 3,
        status: status || 'Plan to Watch'
      });

      return res.status(201).json({
        success: true,
        message: 'Movie added successfully to watchlist',
        data: movie
      });
    }

    // Fallback: In-memory store
    const newMovie = {
      _id: Date.now().toString(),
      title: title.trim(),
      type: type || 'Movie',
      platform: platform || 'Netflix',
      rating: Number(rating) || 3,
      status: status || 'Plan to Watch',
      createdAt: new Date().toISOString()
    };

    memoryWatchlist.unshift(newMovie);

    res.status(201).json({
      success: true,
      message: 'Movie added successfully to watchlist',
      data: newMovie
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || 'Validation Error'
    });
  }
};

// @desc    Update watch status or rating
// @route   PUT /api/movies/:id
const updateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, type, platform, rating, status } = req.body;

    if (getIsConnected()) {
      const movie = await Movie.findById(id);
      if (!movie) {
        return res.status(404).json({
          success: false,
          message: `Watchlist item not found with id: ${id}`
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

      return res.status(200).json({
        success: true,
        message: 'Watchlist item updated successfully',
        data: updatedMovie
      });
    }

    // Fallback: In-memory store
    const index = memoryWatchlist.findIndex((m) => m._id === id);
    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: `Watchlist item not found with id: ${id}`
      });
    }

    const current = memoryWatchlist[index];
    const updated = {
      ...current,
      ...(title !== undefined && { title: title.trim() }),
      ...(type !== undefined && { type }),
      ...(platform !== undefined && { platform }),
      ...(rating !== undefined && { rating: Number(rating) }),
      ...(status !== undefined && { status }),
      updatedAt: new Date().toISOString()
    };

    memoryWatchlist[index] = updated;

    res.status(200).json({
      success: true,
      message: 'Watchlist item updated successfully',
      data: updated
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || 'Error updating movie entry'
    });
  }
};

// @desc    Delete movie/series entry
// @route   DELETE /api/movies/:id
const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;

    if (getIsConnected()) {
      const movie = await Movie.findById(id);
      if (!movie) {
        return res.status(404).json({
          success: false,
          message: `Watchlist item not found with id: ${id}`
        });
      }

      await Movie.findByIdAndDelete(id);

      return res.status(200).json({
        success: true,
        message: 'Watchlist item removed successfully',
        data: { id }
      });
    }

    // Fallback: In-memory store
    const initialLen = memoryWatchlist.length;
    memoryWatchlist = memoryWatchlist.filter((m) => m._id !== id);

    if (memoryWatchlist.length === initialLen) {
      return res.status(404).json({
        success: false,
        message: `Watchlist item not found with id: ${id}`
      });
    }

    res.status(200).json({
      success: true,
      message: 'Watchlist item removed successfully',
      data: { id }
    });
  } catch (error) {
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
