import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../styles/Dashboard.css';

const JobList = ({ jobs }) => {
  const [userPhotos, setUserPhotos] = useState({});

  useEffect(() => {
    const fetchUserPhotos = async () => {
      const photos = {};
      await Promise.all(
        jobs.map(async (job) => {
          try {
            const userResponse = await axios.get(`http://localhost:4000/user/${job.user_id}`);
            photos[job.user_id] = userResponse.data.photo;
          } catch (err) {
            console.error(`Error fetching user photo for user_id: ${job.user_id}`, err);
          }
        })
      );
      setUserPhotos(photos);
    };

    fetchUserPhotos();
  }, [jobs]);

  return (
    <div className="job-lists">
    {jobs.length > 0 ? (
      jobs.map(job => (
        <div key={job.id}>
           <Link to={`/jobDetail/${job.id}`}>
          <div className="job-list">
        <img className="company-logo-icon" alt="" src={`http://localhost:4000${userPhotos[job.user_id]}`} />
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
};

export default JobList;