import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../UserContexts';
import '../styles/CompanyDashboard.css';

const CompanyDashboard = () => {
  const { user } = useContext(UserContext); // Extract user from context
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async (user_id) => {
      try {
        const response = await axios.get(`http://localhost:4000/jobs/getAllPosts/${user_id}`);
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs', error);
      }
    };

    if (user && user.id) {
      fetchJobs(user.id); // Pass user_id to fetchJobs function
    }
  }, [user]);

  return (
    <div>
      <div className="job-cards-container">
        {jobs.map((job) => (
          <div key={job.id} className="job-card">
            <h2>{job.title}</h2>
            <p><strong>Position:</strong> {job.position}</p>
            <p><strong>Field:</strong> {job.field}</p>
            <p><strong>Job Type:</strong> {job.job_type}</p>
            <Link to="#" className="show-applicants-button">
              Show Applicants
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyDashboard;
