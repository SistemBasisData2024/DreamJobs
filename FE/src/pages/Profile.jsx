import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Profile.css';

const Profile = () => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                const user_id = localStorage.getItem('user_id');

                if (!token || !user_id) {
                    throw new Error('Token or user_id not found in localStorage');
                }

                const res = await axios.get(`http://localhost:4000/user/${user_id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setProfile(res.data);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        fetchProfile();
    }, []);

    if (!profile) return <div>Loading...</div>;

    return (
        <div className="profile-container">
            <h1 className="profile-title">{profile.name}'s Profile</h1>
            <div className="profile-info">
            <img className="profile-photo" src={`http://localhost:4000${profile.photo}`} alt='Profile'/>
                <p>Email: {profile.email}</p>
                <p>Username: {profile.name}</p>
                <p>Role: {profile.role}</p>
            </div>
        </div>
    );
};

export default Profile;
