import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            const res = await axios.get('/api/users/profile', {
                headers: {
                    'x-auth-token': token,
                },
            });
            setUser(res.data);
        };

        fetchProfile();
    }, []);

    return (
        <div>
            <h1>Profile</h1>
            <p>Name: {user.username}</p>
            <p>Email: {user.email}</p>
        </div>
    );
};

export default Profile;
