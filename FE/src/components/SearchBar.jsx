import React, { useState } from 'react';
import '../styles/Dashboard.css';

const SearchBar = ({ onSearch, onToggleFilters }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="search-bar">
      <div className="adbance-filter">
        <div className="input-field">
          <input
            className="search-by-job"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by: Job title, Position, Keyword..."
          />
          <img className="fisearch-icon" alt="" src="images/fi_search.png" />
        </div>
        <div className="devider" />
        <div className="button-container">
          <button className="button4" onClick={onToggleFilters}>
            <img className="sliders-icon" alt="" src="images/Sliders.png" />
            <div className="primary">Filters</div>
          </button>
          <button className="button5" onClick={handleSearch}>Search</button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
