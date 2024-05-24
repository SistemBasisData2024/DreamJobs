import React, { useState, useEffect } from 'react';
import axios from 'axios';

const JobDetail = ({ match }) => {
    const [job, setJob] = useState({});

    useEffect(() => {
        const fetchJob = async () => {
            const res = await axios.get(`/api/jobs/${match.params.id}`);
            setJob(res.data);
        };

        fetchJob();
    }, [match.params.id]);

    return (
        <div>
            <h1>{job.title}</h1>
            <p>{job.description}</p>
            <p>{job.location}</p>
            <p>{job.salary}</p>
            <p>{job.company}</p>
        </div>
    );
};

export default JobDetail;
