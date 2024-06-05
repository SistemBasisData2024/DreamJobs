// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import JobFilters from '../components/Job/JobFilters';
import JobList from '../components/Job/JobList';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    // Fetch jobs from the backend
    fetch('/api/jobs')
      .then(response => response.json())
      .then(data => {
        setJobs(data);
        setFilteredJobs(data);
      });
  }, []);

  const handleSearch = (term) => {
    const filtered = jobs.filter(job => job.title.includes(term) || job.description.includes(term));
    setFilteredJobs(filtered);
  };

  const handleFilter = (type, value) => {
    let filtered = jobs;
    if (type === 'type') {
      filtered = jobs.filter(job => job.job_type === value);
    } else if (type === 'field') {
      filtered = jobs.filter(job => job.field === value);
    } else if (type === 'location') {
      filtered = jobs.filter(job => job.location === value);
    }
    setFilteredJobs(filtered);
  };

  return (
    <div className="dashboard">
      <SearchBar onSearch={handleSearch} />
      <JobFilters onFilter={handleFilter} />
      <JobList jobs={filteredJobs} />
    </div>
  );
};

export default Dashboard;