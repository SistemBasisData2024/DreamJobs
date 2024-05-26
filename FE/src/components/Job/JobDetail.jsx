import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const JobDetail = () => {
    const { id } = useParams();
    const [job, setJob] = useState(null);

    useEffect(() => {
        const fetchJob = async () => {
            const res = await axios.get(`/api/jobs/${id}`);
            setJob(res.data);
        };
        fetchJob();
    }, [id]);

    if (!job) return <div>Loading...</div>;

    return (
        <div>
            <h1>{job.title}</h1>
            <p>{job.description}</p>
            <button>Apply</button>
        </div>
    );
};

export default JobDetail;
