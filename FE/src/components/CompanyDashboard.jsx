import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../UserContexts';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../styles/CompanyDashboard.css';

const CompanyDashboard = () => {
  const { user } = useContext(UserContext);
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

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
      fetchJobs(user.id);
    }
  }, [user]);

  // Event handler for showing applicants
  const handleShowApplicants = (jobId) => {
    navigate(`/applications/${jobId}`); // Navigate to Application.jsx
  };

  return (
    <div>
      <div className="job-cards-container">
        {jobs.map((job) => (
          <div key={job.id} className="job-card">
            <h2>{job.title}</h2>
            <p><strong>Position:</strong> {job.position}</p>
            <p><strong>Field:</strong> {job.field}</p>
            <p><strong>Job Type:</strong> {job.job_type}</p>
            {/* Add onClick event handler to call handleShowApplicants */}
            <button 
              className="show-applicants-button" 
              onClick={() => handleShowApplicants(job.id)}
            >
              Show Applicants
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyDashboard;
