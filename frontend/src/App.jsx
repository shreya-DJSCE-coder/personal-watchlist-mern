import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import StatsSummary from './components/StatsSummary';
import MovieForm from './components/MovieForm';
import StatusFilter from './components/StatusFilter';
import MovieCard from './components/MovieCard';
import { getMovies, addMovie, updateMovie, deleteMovie } from './services/api';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);

  // Filters & Search
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Toast auto-clear
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Fetch all movies
  const fetchWatchlist = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getMovies();
      setMovies(data);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message || 'Unable to connect to backend server. Make sure MongoDB and Express are running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWatchlist();
  }, []);

  // Add Movie
  const handleAddMovie = async (movieData) => {
    try {
      const created = await addMovie(movieData);
      setMovies((prev) => [created, ...prev]);
      showToast(`Added "${created.title}" to watchlist!`, 'success');
    } catch (err) {
      showToast(err.message || 'Failed to add entry', 'error');
      throw err;
    }
  };

  // Update Status
  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const updated = await updateMovie(id, { status: newStatus });
      setMovies((prev) =>
        prev.map((item) => (item._id === id ? { ...item, status: updated.status } : item))
      );
      showToast(`Status updated to "${newStatus}"`, 'info');
    } catch (err) {
      showToast(err.message || 'Failed to update status', 'error');
    }
  };

  // Update Rating
  const handleUpdateRating = async (id, newRating) => {
    try {
      const updated = await updateMovie(id, { rating: newRating });
      setMovies((prev) =>
        prev.map((item) => (item._id === id ? { ...item, rating: updated.rating } : item))
      );
      showToast(`Rating updated to ${newRating} ★`, 'info');
    } catch (err) {
      showToast(err.message || 'Failed to update rating', 'error');
    }
  };

  // Delete Movie
  const handleDeleteMovie = async (id) => {
    try {
      await deleteMovie(id);
      setMovies((prev) => prev.filter((item) => item._id !== id));
      showToast('Item removed from watchlist', 'info');
    } catch (err) {
      showToast(err.message || 'Failed to delete item', 'error');
    }
  };

  // Counts for tabs
  const counts = useMemo(() => {
    return {
      All: movies.length,
      'Plan to Watch': movies.filter((m) => m.status === 'Plan to Watch').length,
      'Watching': movies.filter((m) => m.status === 'Watching').length,
      'Completed': movies.filter((m) => m.status === 'Completed').length
    };
  }, [movies]);

  // Filtered & Searched Movies
  const filteredMovies = useMemo(() => {
    return movies.filter((movie) => {
      // Status filter
      if (statusFilter !== 'All' && movie.status !== statusFilter) {
        return false;
      }
      // Type filter
      if (typeFilter !== 'All' && movie.type !== typeFilter) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = movie.title && movie.title.toLowerCase().includes(query);
        const matchesPlatform = movie.platform && movie.platform.toLowerCase().includes(query);
        return matchesTitle || matchesPlatform;
      }
      return true;
    });
  }, [movies, statusFilter, typeFilter, searchQuery]);

  return (
    <div className="app-container">
      <Navbar totalCount={movies.length} />

      {/* Floating Toast Notification */}
      {toast && (
        <div className={`toast toast-${toast.type}`}>
          <span>{toast.message}</span>
        </div>
      )}

      <main className="main-content">
        {/* Statistics Dashboard */}
        <StatsSummary movies={movies} />

        {/* Add Movie Form */}
        <MovieForm onAddMovie={handleAddMovie} />

        {/* Status Filter & Search */}
        <StatusFilter
          currentFilter={statusFilter}
          onFilterChange={setStatusFilter}
          counts={counts}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          typeFilter={typeFilter}
          onTypeFilterChange={setTypeFilter}
        />

        {/* Content Area */}
        <section className="watchlist-section">
          {error && (
            <div className="error-banner">
              <div className="error-banner-icon">⚠️</div>
              <div>
                <h4>Connection Notice</h4>
                <p>{error}</p>
                <button className="btn-retry" onClick={fetchWatchlist}>
                  Retry Connection
                </button>
              </div>
            </div>
          )}

          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Loading your watchlist...</p>
            </div>
          ) : filteredMovies.length > 0 ? (
            <div className="movie-grid">
              {filteredMovies.map((movie) => (
                <MovieCard
                  key={movie._id}
                  movie={movie}
                  onUpdateStatus={handleUpdateStatus}
                  onUpdateRating={handleUpdateRating}
                  onDelete={handleDeleteMovie}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-state-icon">🎬</div>
              <h3>No titles found</h3>
              <p>
                {searchQuery || statusFilter !== 'All' || typeFilter !== 'All'
                  ? 'No entries match your current search or filter criteria.'
                  : 'Your watchlist is empty. Add your first movie, series, or anime above!'}
              </p>
              {(searchQuery || statusFilter !== 'All' || typeFilter !== 'All') && (
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    setStatusFilter('All');
                    setTypeFilter('All');
                    setSearchQuery('');
                  }}
                >
                  Reset Filters
                </button>
              )}
            </div>
          )}
        </section>
      </main>

      <footer className="footer">
        <p>Personal Movie & Web Series Watchlist • Built with MERN Stack</p>
      </footer>
    </div>
  );
}

export default App;

