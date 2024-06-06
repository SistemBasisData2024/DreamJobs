// src/components/JobList.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const JobList = ({ jobs }) => (
  
  <div className="job-list">
    {jobs.length > 0 ? (
      jobs.map(job => (
        <div key={job.id} className="job-item">
          <h2><strong>{job.title}</strong></h2>
          <p>{job.description}</p>
          <p><strong>Type:</strong> {job.job_type}</p>
          <p><strong>Field:</strong> {job.field}</p>
          <p><strong>Location:</strong> {job.location}</p>
        </div>
      ))
    ) : (
      <p>No jobs available</p>
    )}
  </div>
);


export default JobList;
