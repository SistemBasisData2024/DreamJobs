import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const ApplicantList = () => {
    const { job_id, title } = useParams();
    const [applicants, setApplicants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', border: '1px solid #ccc', borderRadius: '10px', marginTop: '20px' }}>
            <h1 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '20px' }}>Applicants for {title}</h1>
            {applicants.length > 0 ? (
                <ul>
                    {applicants.map((applicant, index) => (
                        <li key={index} style={{ marginBottom: '10px' }}>
                            <p><strong>Name:</strong> {applicant.applicant_name}</p>
                            <p>
                                <strong>Status:</strong> {applicant.status}
                                {applicant.status === 'Screening' || applicant.status === 'Interview' ? (
                                    <Link to="#" style={{ marginLeft: '10px', textDecoration: 'underline', color: 'blue' }}>
                                        Update Status
                                    </Link>
                                ) : null}
                            </p>
                            <p>
                                <Link to="#" style={{ textDecoration: 'underline', color: 'blue' }}>
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
