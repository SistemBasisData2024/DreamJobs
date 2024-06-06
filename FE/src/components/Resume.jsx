import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Resume.css';

const Resume = ({ user_id, resumeId }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        education: '',
        experience: '',
        skill: '',
        achievement: ''
    });

    const [resume, setResume] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:4000/resume/${user_id}`, formData);
            console.log('Resume added:', response.data);
            setResume(response.data);
        } catch (error) {
            console.error('Error adding resume:', error);
        }
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:4000/resume/${resumeId}`, formData);
            console.log('Resume updated:', response.data);
            setResume(response.data);
            setIsEditMode(false);
        } catch (error) {
            console.error('Error updating resume:', error);
        }
    };

    const fetchResume = async () => {
        if (!user_id) {
            console.error('user_id is undefined');
            return;
        }
        try {
            const response = await axios.get(`http://localhost:4000/resume/${user_id}`);
            setResume(response.data);
            setFormData({
                description: response.data.description,
                education: response.data.education,
                experience: response.data.experience,
                skill: response.data.skill,
                achievement: response.data.achievement
            });
        } catch (error) {
            console.error('Error fetching resume:', error);
        }
    };

    useEffect(() => {
        if (user_id) {
            fetchResume();
        } else {
            console.error('user_id is undefined or null');
        }
    }, [user_id]);

    return (
        <div className="resume-container">
            {resume ? (
                <div className="resume-header">
                    <h1>{resume.name}</h1>
                    <p>{resume.description}</p>
                    <p>{resume.education}</p>
                    <p>{resume.experience}</p>
                    <p>{resume.skill}</p>
                    <p>{resume.achievement}</p>
                    <button className="resume-edit-button" onClick={() => setIsEditMode(true)}>Edit Resume</button>
                </div>
            ) : (
                <p>Loading...</p>
            )}
            <form className="resume-form" onSubmit={isEditMode ? handleUpdateSubmit : handleAddSubmit}>
                {!isEditMode && (
                    <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Name"
                        required
                    />
                )}
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description"
                    required
                />
                <input
                    name="education"
                    value={formData.education}
                    onChange={handleChange}
                    placeholder="Education"
                    required
                />
                <input
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    placeholder="Experience"
                    required
                />
                <input
                    name="skill"
                    value={formData.skill}
                    onChange={handleChange}
                    placeholder="Skill"
                    required
                />
                <input
                    name="achievement"
                    value={formData.achievement}
                    onChange={handleChange}
                    placeholder="Achievement"
                    required
                />
                <button type="submit">{isEditMode ? 'Update Resume' : 'Add Resume'}</button>
            </form>
        </div>
    );
};

export default Resume;
