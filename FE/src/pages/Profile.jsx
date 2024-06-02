import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Profile.css';

const Profile = () => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
<<<<<<< HEAD
        const token = localStorage.getItem('token');
        const userId = 'user_id'; 
        const fetchUserProfile = async () => {
            try {
                const res = await axios.get(`http://localhost:4000/user/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setProfile(res.data);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
=======
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            const res = await axios.get('http://localhost:4000/user/profile', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setProfile(res.data);
>>>>>>> 0d4a826a537dab92112a992ac0b9f632a8aaf5c9
        };

        fetchUserProfile();
    }, []);

    if (!profile) return <div>Loading...</div>;

    return (
        <div className="profile-container">
            <h1 className="profile-title">{profile.name}'s Profile</h1>
            <div className="profile-info">
                <p>Email: {profile.email}</p>
                <p>Username: {profile.name}</p>
                <p>Role: {profile.role}</p>
                {profile.photo && <img src={profile.photo} alt="Profile" />}
            </div>
        </div>
    );
};

export default Profile;
