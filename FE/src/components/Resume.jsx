import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import '../styles/Resume.css';
import { UserContext } from '../UserContexts'; // Pastikan jalur yang benar ke UserContext

const Resume = () => {
    const { user } = useContext(UserContext); // Mengambil user dari UserContext
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
            const response = await axios.post(`http://localhost:4000/resume/${user.id}`, formData);
            console.log('Resume ditambahkan:', response.data);
            setResume(response.data);
        } catch (error) {
            console.error('Error menambahkan resume:', error);
        }
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:4000/resume/${resume.id}`, formData);
            console.log('Resume diperbarui:', response.data);
            setResume(response.data);
            setIsEditMode(false);
        } catch (error) {
            console.error('Error memperbarui resume:', error);
        }
    };

    const fetchResume = async () => {
        if (!user || !user.id) {
            console.error('User ID tidak ditemukan atau null');
            return;
        }
        try {
            const response = await axios.get(`http://localhost:4000/resume/${user.id}`);
            setResume(response.data);
            setFormData({
                name: response.data.name,
                description: response.data.description,
                education: response.data.education,
                experience: response.data.experience,
                skill: response.data.skill,
                achievement: response.data.achievement
            });
        } catch (error) {
            console.error('Error mengambil resume:', error);
        }
    };

    useEffect(() => {
        if (user && user.id) {
            fetchResume();
        }
    }, [user]);

    return (
        <div className="resume-container">
            {resume ? (
                <div className="resume-header">
                    <h1>{resume.name}</h1>
                    <div className="resume-details">
                        <p><strong>Description:</strong> {resume.description}</p>
                        <p><strong>Education:</strong> {resume.education}</p>
                        <p><strong>Experience:</strong> {resume.experience}</p>
                        <p><strong>Skill:</strong> {resume.skill}</p>
                        <p><strong>Achievement:</strong> {resume.achievement}</p>
                    </div>
                    <button className="resume-edit-button" onClick={() => setIsEditMode(true)}>Edit Resume</button>
                </div>
            ) : (
                <form className="resume-form" onSubmit={handleAddSubmit}>
                    <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Name"
                        required
                    />
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
                    <button type="submit">Add Resume</button>
                </form>
            )}
            {isEditMode && (
                <form className="resume-form" onSubmit={handleUpdateSubmit}>
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
                    <button type="submit">Update Resume</button>
                    <button type="button" onClick={() => setIsEditMode(false)}>Cancel</button>
                </form>
            )}
        </div>
    );
    
};

export default Resume;
