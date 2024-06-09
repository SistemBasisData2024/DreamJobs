import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ViewResume = () => {
    const { user_id } = useParams();
    const [resume, setResume] = useState(null);
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchResumeAndUser = async () => {
            try {
                const resumeResponse = await axios.get(`http://localhost:4000/resume/${user_id}`);
                setResume(resumeResponse.data);

                const userResponse = await axios.get(`http://localhost:4000/user/${user_id}`);
                setUser(userResponse.data);
            } catch (err) {
                if (err.response) {
                    setError(err.response.data.error);
                } else {
                    setError('Error fetching data');
                }
            }
        };

        fetchResumeAndUser();
    }, [user_id]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!resume || !user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Resume of {resume.name}</h1>
            {user.photo && (
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                    <img src={`http://localhost:4000${user.photo}`} alt="User Photo" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
                </div>
            )}
            <p><strong>Description:</strong> {resume.description}</p>
            <p><strong>Education:</strong> {resume.education}</p>
            <p><strong>Experience:</strong> {resume.experience}</p>
            <p><strong>Skill:</strong> {resume.skill}</p>
            <p><strong>Achievement:</strong> {resume.achievement}</p>
        </div>
    );
};

export default ViewResume;
