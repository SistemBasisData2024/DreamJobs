import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../../UserContexts';

const JobDetail = () => {
    const { job_id } = useParams();
    const [job, setJob] = useState(null);
    const { user } = useContext(UserContext);
    const [applyError, setApplyError] = useState(null);
    const [hasApplied, setHasApplied] = useState(false);
    const [hasResume, setHasResume] = useState(false);

    useEffect(() => {
        const fetchJob = async () => {
            try {
                if (job_id) { // Add a check for job_id
                    const res = await axios.get(`http://localhost:4000/jobs/${job_id}`);
                    setJob(res.data);
                }
            } catch (err) {
                console.error('Error fetching job details:', err);
            }
        };

        const checkApplicationStatus = async () => {
            try {
                if (user && user.id && job_id) { // Add checks for user, user.id, and job_id
                    const res = await axios.get(`http://localhost:4000/application/checkApplication/${job_id}/${user.id}`);
                    setHasApplied(res.data.applied);
                }
            } catch (err) {
                console.error('Error checking application status:', err);
            }
        };

        const checkResumeExists = async () => {
            try {
                if (user && user.id) { // Add a check for user and user.id
                    const res = await axios.get(`http://localhost:4000/resume/checkResume/${user.id}`);
                    setHasResume(res.data.hasResume);
                }
            } catch (err) {
                console.error('Error checking resume existence:', err);
            }
        };

        fetchJob();
        checkApplicationStatus();
        if (user && user.id) {
            checkResumeExists();
        }
    }, [job_id, user]);

    const handleApply = async () => {
        try {
            setApplyError(null);
            const response = await axios.post('http://localhost:4000/application', {
                job_id,
                user_id: user.id,
                status: 'Screening'
            });
            setHasApplied(true);
            alert('Application submitted successfully!');
        } catch (err) {
            setApplyError(err.response ? err.response.data.error : 'Error submitting application');
        }
    };

    if (!job) return <div>Loading...</div>;

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', border: '1px solid #ccc', borderRadius: '10px', marginTop: '20px' }}>
            <h1 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '20px' }}>{job.title}</h1>
            <h2 style={{ marginBottom: '20px', textAlign: 'center', fontSize: '15px' }}>
                <Link to={`/companyDetail/${job.user_id}`} style={{ textDecoration: 'underline' }}>
                    {job.company_name}
                </Link>
            </h2>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <p><strong>Type:</strong> {job.job_type}</p>
                <p><strong>Field:</strong> {job.field}</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <p><strong>Position:</strong> {job.position}</p>
                <p><strong>Location:</strong> {job.location}</p>
            </div>
            <p style={{ marginBottom: '20px' }}>{job.description}</p>
            {applyError && <p style={{ color: 'red' }}>{applyError}</p>}
            {!hasApplied && hasResume && ( // Only show the Apply button if user has a resume
                <button
                    onClick={handleApply}
                    style={{
                        display: 'block',
                        width: '100%',
                        padding: '10px',
                        backgroundColor: '#007bff',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}
                >
                    Apply
                </button>
            )}
            {!hasApplied && !hasResume && ( // Show message if user does not have a resume
                <p style={{ color: 'red', textAlign: 'center' }}>You need to create a resume before applying.</p>
            )}
            {hasApplied && <p style={{ color: 'blue', textAlign: 'center' }}>You have already applied for this job.</p>} 
        </div>
    );
};

export default JobDetail;
