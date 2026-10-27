const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a movie or series title'],
      trim: true,
      maxlength: [120, 'Title cannot exceed 120 characters']
    },
    type: {
      type: String,
      required: [true, 'Please select a type (Movie, Series, or Anime)'],
      enum: {
        values: ['Movie', 'Series', 'Anime'],
        message: '{VALUE} is not a valid type'
      },
      default: 'Movie'
    },
    platform: {
      type: String,
      required: [true, 'Please select a streaming platform'],
      enum: {
        values: ['Netflix', 'Prime', 'Hotstar', 'YouTube', 'Other'],
        message: '{VALUE} is not a valid platform'
      },
      default: 'Netflix'
    },
    rating: {
      type: Number,
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot be more than 5'],
      default: 3
    },
    status: {
      type: String,
      enum: {
        values: ['Plan to Watch', 'Watching', 'Completed'],
        message: '{VALUE} is not a valid status'
      },
      default: 'Plan to Watch'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Movie', movieSchema);

