// Application.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../UserContexts';
import '../styles/Application.css';

const Application = () => {
    const { user } = useContext(UserContext);
    const { job_id } = useParams();
    const [statusList, setStatusList] = useState([]);
    const [applications, setApplications] = useState([]);
    const [applicants, setApplicants] = useState([]);
    const [formData, setFormData] = useState({
        job_id: '',
        status: 'Screening'
    });
    const [statusUpdate, setStatusUpdate] = useState({
        id: '',
        status: ''
    });

    useEffect(() => {
        fetchStatusList();
        if (job_id) {
            fetchApplicants(job_id);
        }
    }, [job_id]);

    const fetchStatusList = async () => {
        try {
            const response = await axios.get('http://localhost:4000/applications/status');
            setStatusList(response.data);
        } catch (error) {
            console.error('Error fetching status list', error);
        }
    };

    const fetchApplicants = async (jobId) => {
        try {
            const response = await axios.get(`http://localhost:4000/applications/applicants/${jobId}`);
            setApplicants(response.data);
        } catch (error) {
            console.error('Error fetching applicants', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleStatusChange = (e) => {
        const { name, value } = e.target;
        setStatusUpdate({
            ...statusUpdate,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/applications/apply', { ...formData, user_id: user.id });
            alert('Application submitted successfully');
            setFormData({ job_id: '', status: 'Screening' });
            fetchApplications();
        } catch (error) {
            console.error('Error submitting application', error);
            alert('Error submitting application');
        }
    };

    const handleStatusUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:4000/applications/status/${statusUpdate.id}`, { status: statusUpdate.status });
            alert('Status updated successfully');
            setStatusUpdate({ id: '', status: '' });
            fetchApplications();
        } catch (error) {
            console.error('Error updating status', error);
            alert('Error updating status');
        }
    };

    useEffect(() => {
        if (user && user.id) {
            fetchApplications();
        }
    }, [user]);

    const fetchApplications = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/applications/user/${user.id}`);
            setApplications(response.data);
        } catch (error) {
            console.error('Error fetching applications', error);
        }
    };

    return (
        <div className="application-container">
            <h1>Job Application System</h1>

            <section>
                <h2>Apply for a Job</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="job_id"
                        value={formData.job_id}
                        onChange={handleChange}
                        placeholder="Job ID"
                        required
                    />
                    <select name="status" value={formData.status} onChange={handleChange} required>
                        {statusList.map((status, index) => (
                            <option key={index} value={status}>{status}</option>
                        ))}
                    </select>
                    <button type="submit">Submit Application</button>
                </form>
            </section>

            <section>
                <h2>Update Application Status</h2>
                <form onSubmit={handleStatusUpdate}>
                    <input
                        type="text"
                        name="id"
                        value={statusUpdate.id}
                        onChange={handleStatusChange}
                        placeholder="Application ID"
                        required
                    />
                    <select name="status" value={statusUpdate.status} onChange={handleStatusChange} required>
                        {statusList.map((status, index) => (
                            <option key={index} value={status}>{status}</option>
                        ))}
                    </select>
                    <button type="submit">Update Status</button>
                </form>
            </section>

            <section>
                <h2>Your Applications</h2>
                <ul>
                    {applications.map((app, index) => (
                        <li key={index}>{app.job_title} - {app.company_name} - {app.status}</li>
                    ))}
                </ul>
            </section>

            <section>
                <h2>View Applicants by Job</h2>
                <input
                    type="text"
                    placeholder="Job ID"
                    onBlur={(e) => fetchApplicants(e.target.value)}
                />
                <ul>
                    {applicants.map((app, index) => (
                        <li key={index}>{app.applicant_name} - {app.status}</li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default Application;
