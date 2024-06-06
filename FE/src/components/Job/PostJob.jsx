import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../UserContexts';
import '../../styles/PostJob.css';

const PostJob = () => {
    const { user } = useContext(UserContext); // Mengambil user dari UserContext
    const [jobTypes, setJobTypes] = useState([]);
    const [fields, setFields] = useState([]);
    const [formData, setFormData] = useState({
        job_type: '',
        field: '',
        title: '',
        position: '',
        description: '',
        location: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchJobTypes();
        fetchFields();
    }, []);

    const fetchJobTypes = async () => {
        try {
            const response = await axios.get('http://localhost:4000/jobs/jobType');
            setJobTypes(response.data);
        } catch (error) {
            console.error('Error fetching job types:', error);
            setError('Failed to fetch job types. Please try again.');
        }
    };

    const fetchFields = async () => {
        try {
            const response = await axios.get('http://localhost:4000/jobs/field');
            setFields(response.data);
        } catch (error) {
            console.error('Error fetching fields:', error);
            setError('Failed to fetch fields. Please try again.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!user || !user.id) {
                throw new Error('User ID not available');
            }

            const response = await axios.post(`http://localhost:4000/jobs/${user.id}`, formData);
            console.log('Job added successfully:', response.data);
            // Clear form fields after successful submission
            setFormData({
                job_type: '',
                field: '',
                title: '',
                position: '',
                description: '',
                location: ''
            });
            setError('');
            navigate('/companyDashboard');
        } catch (error) {
            console.error('Error adding job:', error);
            setError('Failed to add job. Please try again.');
        }
    };

    return (
        <div className="post-container">
            <form onSubmit={handleSubmit} className="job-form">
                {error && <p className="error">{error}</p>}
                <div className="form-group">
                    <label>
                        Job Type:
                        <select name="job_type" value={formData.job_type} onChange={handleChange} required>
                            <option value="">Select Job Type</option>
                            {jobTypes.map((type, index) => (
                                <option key={index} value={type}>{type}</option>
                            ))}
                        </select>
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Field:
                        <select name="field" value={formData.field} onChange={handleChange} required>
                            <option value="">Select Field</option>
                            {fields.map((field, index) => (
                                <option key={index} value={field}>{field}</option>
                            ))}
                        </select>
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Title:
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Position:
                        <input
                            type="text"
                            name="position"
                            value={formData.position}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Description:
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Location:
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div className="form-group">
                    <button className="button" type="submit">Add Job</button>
                </div>
            </form>
        </div>
    );
    
};

export default PostJob;
