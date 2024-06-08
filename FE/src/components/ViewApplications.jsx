import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../UserContexts';
import { Link } from 'react-router-dom';
import '../styles/ViewApplications.css';

const ViewApplications = () => {
    const { user, setUser } = useContext(UserContext);
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const storedApplications = JSON.parse(localStorage.getItem('applications')) || [];
                const userApplications = storedApplications.filter(app => app.user_id === user.id);
                setApplications(userApplications);
            } catch (err) {
                console.error('Error fetching applications:', err);
            }
        };

        if (user && user.id) {
            fetchApplications();
        }
    }, [user]);

    // Listener untuk perubahan status pengguna
    useEffect(() => {
        const handleUserChange = () => {
            // Membersihkan data lamaran jika pengguna dihapus atau keluar
            if (!user) {
                localStorage.removeItem('applications');
                setApplications([]);
            }
        };

        const userChangeObserver = new MutationObserver(handleUserChange);
        userChangeObserver.observe(document.getElementById('root'), { childList: true, subtree: true });

        return () => {
            userChangeObserver.disconnect();
        };
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
