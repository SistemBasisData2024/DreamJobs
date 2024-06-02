import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Profile.css';

const Profile = () => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            const res = await axios.get('http://localhost:4000/user/profile', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setProfile(res.data);
        };
        fetchProfile();
    }, []);
    console.log(profile);
    console.log(setProfile);
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
