import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../UserContexts';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/ViewApplications.css';

const ViewApplications = () => {
    const { user } = useContext(UserContext);
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                if (user && user.id) {
                    const res = await axios.get(`http://localhost:4000/application/${user.id}`);
                    setApplications(res.data);
                }
            } catch (err) {
                console.error('Error fetching applications:', err);
            }
        };

        fetchApplications();
    }, [user]);

    if (!applications.length) return <div>No applications found.</div>;

    return (
        <div className="view-applications-container">
            <h1>List of your applications</h1>
            <ul>
                {applications.map((app) => (
                    <li key={app.job_id} className="application-item">
                        <Link to={`/jobDetail/${app.job_id}`} className="application-link">
                            {app.job_title} - {app.company_name}
                        </Link>
                        <p>Status: {app.status}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ViewApplications;
