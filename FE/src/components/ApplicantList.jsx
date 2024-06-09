import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import '../styles/ApplicantList.css';

const ApplicantList = () => {
    const { job_id, title } = useParams();
    const [applicants, setApplicants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [updateStatusId, setUpdateStatusId] = useState(null);
    const [newStatus, setNewStatus] = useState('');

    useEffect(() => {
        const fetchApplicants = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/application/getApplicants/${job_id}`);
                setApplicants(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.response ? err.response.data.error : 'Error fetching applicants');
                setLoading(false);
            }
        };

        fetchApplicants();
    }, [job_id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    const handleUpdateStatus = async (id) => {
        try {
            const response = await axios.put(`http://localhost:4000/application/status/${id}`, { status: newStatus });
            setApplicants(applicants.map(applicant => applicant.id === id ? { ...applicant, status: response.data.status } : applicant));
            setUpdateStatusId(null);
        } catch (err) {
            console.error("Error updating status: ", err);
        }
    };

    return (
        <div className="applicant-list-container">
            <h1 className="applicant-list-title">Applicants for {title}</h1>
            {applicants.length > 0 ? (
                <ul>
                    {applicants.map((applicant, index) => (
                        <li key={index} className="applicant-item">
                            <p><strong>Name:</strong> {applicant.applicant_name}</p>
                            <div className="applicant-status">
                                <p><strong>Status:</strong> {applicant.status}</p>
                                {(applicant.status === 'Screening' || applicant.status === 'Interview') && (
                                    <div className="applicant-status-select">
                                        <Link to="#" className="applicant-status-link" onClick={() => setUpdateStatusId(applicant.id)}>
                                            Update Status
                                        </Link>
                                        {updateStatusId === applicant.id && (
                                            <div className="applicant-status-dropdown">
                                                <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
                                                    <option value="">Select status</option>
                                                    {applicant.status === 'Screening' && (
                                                        <>
                                                            <option value="Interview">Interview</option>
                                                            <option value="Offer">Offer</option>
                                                            <option value="Reject">Reject</option>
                                                        </>
                                                    )}
                                                    {applicant.status === 'Interview' && (
                                                        <>
                                                            <option value="Offer">Offer</option>
                                                            <option value="Reject">Reject</option>
                                                        </>
                                                    )}
                                                </select>
                                                <button className="applicant-status-button" onClick={() => handleUpdateStatus(applicant.id)}>Submit</button>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                            <p>
                                <Link to={`/viewResume/${applicant.user_id}`} className="applicant-status-link">
                                    Show resume
                                </Link>
                            </p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No applicants found.</p>
            )}
        </div>
    );
};

export default ApplicantList;
