import React from 'react';

const StatsSummary = ({ movies = [] }) => {
  const total = movies.length;
  const planToWatch = movies.filter((m) => m.status === 'Plan to Watch').length;
  const watching = movies.filter((m) => m.status === 'Watching').length;
  const completed = movies.filter((m) => m.status === 'Completed').length;

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <span className="stat-label">Total Watchlist</span>
        <span className="stat-value">{total}</span>
      </div>
      <div className="stat-card stat-plan">
        <span className="stat-label">📌 Plan to Watch</span>
        <span className="stat-value">{planToWatch}</span>
      </div>
      <div className="stat-card stat-watching">
        <span className="stat-label">⏳ Watching</span>
        <span className="stat-value">{watching}</span>
      </div>
      <div className="stat-card stat-completed">
        <span className="stat-label">✅ Completed</span>
        <span className="stat-value">{completed}</span>
      </div>
    </div>
  );
};

export default StatsSummary;

