import React, { useState } from 'react';

const MovieCard = ({ movie, onUpdateStatus, onUpdateRating, onDelete }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Status progression cycle
  const statusCycle = {
    'Plan to Watch': 'Watching',
    'Watching': 'Completed',
    'Completed': 'Plan to Watch'
  };

  const statusIcons = {
    'Plan to Watch': '📌',
    'Watching': '⏳',
    'Completed': '✅'
  };

  const typeIcons = {
    Movie: '🎬',
    Series: '📺',
    Anime: '⛩️'
  };

  const handleStatusCycle = async () => {
    const nextStatus = statusCycle[movie.status] || 'Plan to Watch';
    try {
      setIsUpdating(true);
      await onUpdateStatus(movie._id, nextStatus);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRatingChange = async (newRating) => {
    if (newRating === movie.rating) return;
    try {
      setIsUpdating(true);
      await onUpdateRating(movie._id, newRating);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to remove "${movie.title}" from your watchlist?`)) {
      try {
        setIsDeleting(true);
        await onDelete(movie._id);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  // Safe platform class name
  const platformClass = `platform-${movie.platform ? movie.platform.toLowerCase() : 'other'}`;
  const statusClass = `status-${movie.status ? movie.status.toLowerCase().replace(/\s+/g, '-') : 'plan'}`;

  return (
    <div className={`movie-card ${statusClass}`}>
      <div className="card-top">
        <div className="card-badges">
          <span className="type-badge">
            {typeIcons[movie.type] || '🎬'} {movie.type}
          </span>
          <span className={`platform-badge ${platformClass}`}>
            {movie.platform}
          </span>
        </div>
        <button
          className="delete-btn"
          onClick={handleDelete}
          disabled={isDeleting || isUpdating}
          title="Delete entry"
          aria-label="Delete entry"
        >
          🗑️
        </button>
      </div>

      <div className="card-body">
        <h3 className="movie-title" title={movie.title}>
          {movie.title}
        </h3>

        {/* Rating row with interactive stars */}
        <div className="rating-row">
          <span className="rating-label">Rating:</span>
          <div className="star-rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className={`star-btn ${star <= (movie.rating || 0) ? 'filled' : 'empty'}`}
                onClick={() => handleRatingChange(star)}
                disabled={isUpdating}
                title={`Rate ${star} out of 5`}
              >
                ★
              </button>
            ))}
            <span className="rating-number">({movie.rating || 0}/5)</span>
          </div>
        </div>
      </div>

      <div className="card-footer">
        {/* Status Toggle Button */}
        <button
          className={`status-toggle-btn ${statusClass}`}
          onClick={handleStatusCycle}
          disabled={isUpdating}
          title="Click to cycle status: Plan to Watch → Watching → Completed"
        >
          <span className="status-indicator-dot"></span>
          <span className="status-icon">{statusIcons[movie.status] || '📌'}</span>
          <span className="status-text">{movie.status}</span>
          <span className="status-cycle-hint">↻</span>
        </button>
      </div>
    </div>
  );
};

export default MovieCard;

