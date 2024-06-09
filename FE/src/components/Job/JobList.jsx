import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Dashboard.css';

const JobList = ({ jobs }) => (
  <div className="job-lists">
    {jobs.length > 0 ? (
      jobs.map(job => (
        <div key={job.id}>
           <Link to={`/jobDetail/${job.id}`}>
          <div className="job-list">
        <img className="company-logo-icon" alt="" src="/company-logo@2x.png" />
        <div className="job-title">
          <div className="social-media-assistant">{job.title}</div>
          <div className="company-name-location-job">
            <div className="nomad">{job.company_name}</div>
            <div className="company-name-location-job-child" />
            <div className="nomad">{job.location}</div>
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
        </div>
      </div>
      </Link>
        </div>
       
      ))
    ) : (
      <p>No jobs available</p>
    )}
  </div>
);

export default JobList;