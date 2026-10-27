const express = require('express');
const router = express.Router();
const {
  getMovies,
  addMovie,
  updateMovie,
  deleteMovie
} = require('../controllers/movieController');

// /api/movies
router.route('/')
  .get(getMovies)
  .post(addMovie);

// /api/movies/:id
router.route('/:id')
  .put(updateMovie)
  .delete(deleteMovie);

module.exports = router;

