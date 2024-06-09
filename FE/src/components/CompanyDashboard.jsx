import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../UserContexts';
import SearchBar from '../components/SearchBar';
import JobFilters from '../components/Job/JobFilters';
import Modal from '../components/Modal';
import '../styles/Dashboard.css';

const CompanyDashboard = () => {
  const { user } = useContext(UserContext);
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchJobs = async (user_id) => {
      try {
        const response = await axios.get(`http://localhost:4000/jobs/getAllPosts/${user_id}`);
        if (response.data.length === 0) {
          console.log("No job vacancies posted");
          setJobs([]);
          setFilteredJobs([]);
        } else {
          setJobs(response.data);
          setFilteredJobs(response.data);
        }
      } catch (error) {
        console.error('Error fetching jobs', error);
      }
    };

    if (user && user.id) {
      fetchJobs(user.id);
    }
  }, [user]);

  const handleSearch = (term) => {
    if (term === '') {
      setFilteredJobs(jobs);
      return;
    }

    axios.get(`http://localhost:4000/jobs/search/${term}`)
      .then(response => {
        setFilteredJobs(response.data);
      })
      .catch(error => {
        console.error('Error searching jobs:', error);
        setFilteredJobs([]);
      });
  };

  const handleFilter = (type, value) => {
    let url = 'http://localhost:4000/jobs';

    if (type && value) {
      url += `/${type}/${value}`;
    }

    axios.get(url)
      .then(response => {
        setFilteredJobs(response.data);
      })
      .catch(error => {
        console.error(`Error fetching jobs by ${type}:`, error);
        setFilteredJobs([]);
      });
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/jobs/${id}`);
      setJobs(jobs.filter(job => job.id !== id));
      setFilteredJobs(filteredJobs.filter(job => job.id !== id));
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} onToggleFilters={toggleFilters} />
      <Modal isOpen={showFilters} onClose={toggleFilters}>
        <JobFilters onFilter={handleFilter} />
      </Modal>
      <div className="job-lists">
        {filteredJobs.length > 0 ? (
          filteredJobs.map(job => (
            <div key={job.id} className="job-item">
                <div className="job-list">
                  <img className="company-logo-icon" alt="" src="/company-logo@2x.png" />
                  <div className="job-title">
                  <Link to={`/applicants/${job.id}/${job.title}`}>
                    <div className="social-media-assistant">{job.title}</div>
                    <div className="company-name-location-job">
                    </div>
                    <div className="label3">
                      <div className="label4">
                        <div className="caption">{job.job_type}</div>
                      </div>
                      <div className="label-child" />
                      <div className="label5">
                        <div className="label-item" />
                        <div className="caption">{job.field}</div>
                      </div>
                    </div>
                    </Link>
                  </div>
                  <button onClick={() => handleDelete(job.id)}><img className="icon-trash" alt="" src="images/trash.png" /></button>
                </div>
            </div>
          ))
        ) : (
          <p>No job vacancies posted</p>
        )}
      </div>
    </div>
  );
};

export default CompanyDashboard;
