// src/components/JobFilters.jsx
import React from 'react';

const JobFilters = ({ onFilter }) => {
  return (
    <div className="job-filters">
      <select onChange={(e) => onFilter('type', e.target.value)}>
        <option value="">Filter by Type</option>
        <option value="">Full Time</option>
        <option value="Part Time">Part Time</option>
        <option value="Contract">Contract</option>
        <option value="Internship">Internship</option>
        <option value="Freelance">Freelance</option>
      </select>
      <select onChange={(e) => onFilter('field', e.target.value)}>
        <option value="">Filter by Field</option>
        <option value="Technology">Technology</option>
        <option value="Finance">Finance</option>
        <option value="Healthcare">Healthcare</option>
        <option value="Education">Education</option>
        <option value="Marketing">Marketing</option>
        <option value="Sales">Sales</option>
      </select>
      <select onChange={(e) => onFilter('location', e.target.value)}>
        <option value="">Filter by Location</option>
        {/* Add more locations as needed */}
      </select>
    </div>
  );
};

export default JobFilters;