import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CompanyDashboard = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get('/api/company/jobs');
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs', error);
    }
  };

  return (
    <div>
      <h1>Company Dashboard</h1>
      <ul>
        {jobs.map(job => (
          <li key={job.id}>
            <h2>{job.title}</h2>
            <p>{job.description}</p>
            {/* Link to view applications for this job */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompanyDashboard;
