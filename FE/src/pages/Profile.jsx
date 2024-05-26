import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            const res = await axios.get('/api/profile', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setProfile(res.data);
        };
        fetchProfile();
    }, []);

    if (!profile) return <div>Loading...</div>;

    return (
        <div>
            <h1>{profile.user_name}'s Profile</h1>
            <p>Email: {profile.email}</p>
            <p>Username: {profile.username}</p>
            <p>Interest: {profile.interest}</p>
            <p>Role: {profile.role}</p>
        </div>
    );
};

export default Profile;
