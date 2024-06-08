import React, { useState, useEffect } from 'react';

const JobFilters = ({ onFilter }) => {
  const [jobTypes, setJobTypes] = useState([]);
  const [fields, setFields] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/jobs/jobType')
      .then(response => response.json())
      .then(data => setJobTypes(data))
      .catch(error => console.error('Error fetching job types:', error));

    fetch('http://localhost:4000/jobs/field')
      .then(response => response.json())
      .then(data => setFields(data))
      .catch(error => console.error('Error fetching fields:', error));

    fetch('http://localhost:4000/jobs/location')
      .then(response => response.json())
      .then(data => setLocations(data))
      .catch(error => console.error('Error fetching locations:', error));
  }, []);

  return (
    <div className="job-filters">
      <select onChange={(e) => onFilter('type', e.target.value)}>
        <option value="">All Types</option>
        {jobTypes.map((type) => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>
      <select onChange={(e) => onFilter('field', e.target.value)}>
        <option value="">All Fields</option>
        {fields.map((field) => (
          <option key={field} value={field}>{field}</option>
        ))}
      </select>
      <select onChange={(e) => onFilter('location', e.target.value)}>
        <option value="">All Locations</option>
        {locations.map((location) => (
          <option key={location} value={location}>{location}</option>
        ))}
      </select>
    </div>
  );
};

export default JobFilters;