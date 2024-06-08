import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import JobFilters from '../components/Job/JobFilters';
import JobList from '../components/Job/JobList';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    // Fetch all jobs from the backend
    fetch('http://localhost:4000/jobs')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setJobs(data);
        setFilteredJobs(data);
      })
      .catch(error => {
        console.error('Error fetching jobs:', error);
      });
  }, []);

  const handleSearch = (term) => {
    fetch(`http://localhost:4000/jobs/search/${term}`)
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          setFilteredJobs([]);
        } else {
          setFilteredJobs(data);
        }
      })
      .catch(error => {
        console.error('Error searching jobs:', error);
      });
  };

  const handleFilter = (type, value) => {
    let url = `http://localhost:4000/jobs`;
    if (type === 'type' && value) {
      url = `http://localhost:4000/jobs/type/${value}`;
    } else if (type === 'field' && value) {
      url = `http://localhost:4000/jobs/field/${value}`;
    } else if (type === 'location') {
      url = `http://localhost:4000/jobs/location/${value}`;
    }
    if (value === '') {
      url = 'http://localhost:4000/jobs';
    }

    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          setFilteredJobs([]);
        } else {
          setFilteredJobs(data);
        }
      })
      .catch(error => {
        console.error(`Error fetching jobs by ${type}:`, error);
      });
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