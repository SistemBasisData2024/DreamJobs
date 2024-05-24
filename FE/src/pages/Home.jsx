import React, { useState, useEffect } from 'react';
import JobCard from '../components/JobCard';
import axios from 'axios';

const Home = () => {
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
            <h1>Job Listings</h1>
            {jobs.map(job => (
                <JobCard key={job._id} job={job} />
            ))}
        </div>
    );
};

export default Home;
