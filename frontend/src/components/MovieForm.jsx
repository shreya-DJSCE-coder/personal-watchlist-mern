import React, { useState } from 'react';

const MovieForm = ({ onAddMovie }) => {
  const [formData, setFormData] = useState({
    title: '',
    type: 'Movie',
    platform: 'Netflix',
    rating: 3,
    status: 'Plan to Watch'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'rating' ? Number(value) : value
    }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      setError('Please enter a title');
      return;
    }

    try {
      setIsSubmitting(true);
      await onAddMovie({
        ...formData,
        title: formData.title.trim()
      });

      // Reset form to defaults
      setFormData({
        title: '',
        type: 'Movie',
        platform: 'Netflix',
        rating: 3,
        status: 'Plan to Watch'
      });
      setError('');
    } catch (err) {
      setError(err.message || 'Failed to save entry');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="form-section">
      <div className="section-header">
        <h2>Add to Watchlist</h2>
        <span className="section-hint">Keep track of what you want to binge next</span>
      </div>

      <form className="movie-form" onSubmit={handleSubmit}>
        {error && <div className="form-error">{error}</div>}

        <div className="form-grid">
          {/* Title Input */}
          <div className="form-group form-group-full">
            <label htmlFor="title">Title *</label>
            <input
              id="title"
              type="text"
              name="title"
              placeholder="e.g. Breaking Bad, Interstellar, Death Note"
              value={formData.title}
              onChange={handleChange}
              disabled={isSubmitting}
              autoComplete="off"
            />
          </div>

          {/* Type Dropdown */}
          <div className="form-group">
            <label htmlFor="type">Type</label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              disabled={isSubmitting}
            >
              <option value="Movie">🎬 Movie</option>
              <option value="Series">📺 Series</option>
              <option value="Anime">⛩️ Anime</option>
            </select>
          </div>

          {/* Platform Dropdown */}
          <div className="form-group">
            <label htmlFor="platform">Platform</label>
            <select
              id="platform"
              name="platform"
              value={formData.platform}
              onChange={handleChange}
              disabled={isSubmitting}
            >
              <option value="Netflix">Netflix</option>
              <option value="Prime">Prime Video</option>
              <option value="Hotstar">Disney+ Hotstar</option>
              <option value="YouTube">YouTube</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Rating Dropdown (1 to 5) */}
          <div className="form-group">
            <label htmlFor="rating">Rating (1 to 5 ⭐)</label>
            <select
              id="rating"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              disabled={isSubmitting}
            >
              <option value="1">⭐ 1 - Poor</option>
              <option value="2">⭐⭐ 2 - Fair</option>
              <option value="3">⭐⭐⭐ 3 - Good</option>
              <option value="4">⭐⭐⭐⭐ 4 - Great</option>
              <option value="5">⭐⭐⭐⭐⭐ 5 - Masterpiece</option>
            </select>
          </div>

          {/* Status Dropdown */}
          <div className="form-group">
            <label htmlFor="status">Watch Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              disabled={isSubmitting}
            >
              <option value="Plan to Watch">📌 Plan to Watch</option>
              <option value="Watching">⏳ Watching</option>
              <option value="Completed">✅ Completed</option>
            </select>
          </div>
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Adding...' : '+ Add Entry'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default MovieForm;

