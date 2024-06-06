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
    fetch('http://localhost:4000/jobs')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched jobs:', data);  // Debug: log fetched jobs
        setJobs(data);
        setFilteredJobs(data);
      })
      .catch(error => {
        console.error('Error fetching jobs:', error);
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

  // Debug: log the filtered jobs state
  useEffect(() => {
    console.log('Filtered jobs:', filteredJobs);
  }, [filteredJobs]);

  return (
    <div className="dashboard">
      <SearchBar onSearch={handleSearch} />
      <JobFilters onFilter={handleFilter} />
      <JobList jobs={filteredJobs} />
    </div>
  );
};

export default Dashboard;