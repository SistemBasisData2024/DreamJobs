import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const JobDetail = () => {
    const { job_id } = useParams();
    const [job, setJob] = useState(null);

    useEffect(() => {
        const fetchJob = async () => {
            const res = await axios.get(`http://localhost:4000/jobs/${job_id}`);
            setJob(res.data);
        };
        fetchJob();
    }, [job_id]);

    if (!job) return <div>Loading...</div>;

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', border: '1px solid #ccc', borderRadius: '10px', marginTop: '20px' }}>
            <h1 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '20px' }}>{job.title}</h1>
            <h2 style={{ marginBottom: '20px', textAlign: 'center', fontSize: '15px' }}>
                <Link to={`/companyDetail/${job.user_id}`} style={{ textDecoration: 'underline' }}>
                    {job.company_name}
                </Link></h2>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <p><strong>Type:</strong> {job.job_type}</p>
                <p><strong>Field:</strong> {job.field}</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <p><strong>Position:</strong> {job.position}</p>
                <p><strong>Location:</strong> {job.location}</p>
            </div>
            <p style={{ marginBottom: '20px' }}>{job.description}</p>
            <button style={{ display: 'block', width: '100%', padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                Apply
            </button>
        </div>
    );
};

export default JobDetail;
