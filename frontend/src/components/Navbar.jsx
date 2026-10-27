import React from 'react';

const Navbar = ({ totalCount }) => {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="brand">
          <div className="logo-icon">🍿</div>
          <div>
            <h1 className="brand-title">BingeWatch</h1>
            <p className="brand-subtitle">Personal Movie & Web Series Tracker</p>
          </div>
        </div>
        <div className="navbar-stats">
          <span className="stats-badge">
            <span className="stats-dot"></span>
            {totalCount} {totalCount === 1 ? 'Title' : 'Titles'} Saved
          </span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

