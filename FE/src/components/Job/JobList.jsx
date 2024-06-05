// src/components/JobList.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const JobList = ({ jobs }) => (
  <div className="job-list">
    {jobs.map(job => (
      <div key={job.id} className="job-item">
        <h3>{job.title}</h3>
        <p>{job.company_name}</p>
        <p>{job.position}</p>
        <p>{job.field}</p>
        <p>{job.job_type}</p>
        <Link to={`/job/${job.id}`}>View Details</Link>
      </div>
    ))}
  </div>
);

export default JobList;
