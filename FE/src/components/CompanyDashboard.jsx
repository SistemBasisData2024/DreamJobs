import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../UserContexts';
import '../styles/CompanyDashboard.css'

const CompanyDashboard = () => {
  const { user } = useContext(UserContext);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async (user_id) => {
      try {
        const response = await axios.get(`http://localhost:4000/jobs/getAllPosts/${user_id}`);
        
        if (response.data.length === 0) {
          console.log("No job Vacancies Posted");
          setJobs([]);
        } else {
          setJobs(response.data);
        }

      } catch (error) {
        console.error('Error fetching jobs', error);
      }
    };

    if (user && user.id) {
      fetchJobs(user.id);
    }
  }, [user]);

  return (
    <div>
      <div className="job-cards-container">
        {jobs.length === 0 ? (
          <p>No job Vacancies Posted</p>
        ) : (
          jobs.map((job) => (
            <div key={job.id} className="job-card">
              <h2 className='title'>{job.title}</h2>
              <p><strong>Position:</strong> {job.position}</p>
              <p><strong>Field:</strong> {job.field}</p>
              <p><strong>Job Type:</strong> {job.job_type}</p>
              <button className="button"><Link to={`/applicants/${job.id}/${job.title}`} >
                Show Applicants
              </Link></button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CompanyDashboard;
