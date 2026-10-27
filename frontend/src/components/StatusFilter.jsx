import React from 'react';

const StatusFilter = ({
  currentFilter,
  onFilterChange,
  counts = {},
  searchQuery,
  onSearchChange,
  typeFilter,
  onTypeFilterChange
}) => {
  const filterOptions = [
    { label: 'All', value: 'All', icon: '🎬' },
    { label: 'Plan to Watch', value: 'Plan to Watch', icon: '📌' },
    { label: 'Watching', value: 'Watching', icon: '⏳' },
    { label: 'Completed', value: 'Completed', icon: '✅' }
  ];

  return (
    <div className="filter-container">
      {/* Search and Type Filter row */}
      <div className="filter-controls-row">
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search by title..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          {searchQuery && (
            <button
              className="clear-search-btn"
              onClick={() => onSearchChange('')}
              title="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        <div className="type-filter-group">
          <label htmlFor="typeFilterSelect" className="filter-label">Filter Type:</label>
          <select
            id="typeFilterSelect"
            value={typeFilter}
            onChange={(e) => onTypeFilterChange(e.target.value)}
            className="filter-select"
          >
            <option value="All">All Types</option>
            <option value="Movie">Movies Only</option>
            <option value="Series">Series Only</option>
            <option value="Anime">Anime Only</option>
          </select>
        </div>
      </div>

      {/* Status Filter Tabs / Buttons */}
      <div className="status-tabs">
        {filterOptions.map((opt) => {
          const isActive = currentFilter === opt.value;
          const count = counts[opt.value] !== undefined ? counts[opt.value] : null;

          return (
            <button
              key={opt.value}
              className={`status-tab ${isActive ? 'active' : ''}`}
              onClick={() => onFilterChange(opt.value)}
            >
              <span className="tab-icon">{opt.icon}</span>
              <span className="tab-label">{opt.label}</span>
              {count !== null && <span className="tab-badge">{count}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default StatusFilter;

