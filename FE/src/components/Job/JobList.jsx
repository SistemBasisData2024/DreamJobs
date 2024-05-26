import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const JobList = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const fetchJobs = async () => {
            const res = await axios.get('/api/jobs');
            setJobs(res.data);
        };
        fetchJobs();
    }, []);

    return (
        <div>
            {jobs.map(job => (
                <div key={job.job_id}>
                    <Link to={`/job/${job.job_id}`}>
                        <h3>{job.title}</h3>
                    </Link>
                    <p>{job.description}</p>
                </div>
            ))}
        </div>
    );
};

export default JobList;
