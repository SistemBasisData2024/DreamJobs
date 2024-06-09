import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Profile.css';

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false)
    const navigate = useNavigate();

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

    const handleDeleteAccount = async () => {
        try {
            const token = localStorage.getItem('token');
            const user_id = localStorage.getItem('user_id');

            if (!token || !user_id) {
                throw new Error('Token or user_id not found in localStorage');
            }

            await axios.delete(`http://localhost:4000/user/${user_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });


            console.log('Account deleted successfully');

            navigate('/login');
        } catch (error) {
            console.error('Error deleting account:', error);
        }
    };

    if (!profile) return <div>Loading...</div>;

    return (
        <div className="profile-container">
            <h1 className="profile-title">{profile.name}'s Profile</h1>
            <div className="profile-info">
                <img className="profile-photo" src={`http://localhost:4000${profile.photo}`} alt='Profile' />
                <p>Email: {profile.email}</p>
                <p>Username: {profile.name}</p>
                <p>Role: {profile.role}</p>
            </div>
            <button className="delete-button" onClick={() => setShowConfirm(true)}>Delete Account</button>
            
            {showConfirm && (
                <div className="confirm-popup">
                    <div className="confirm-popup-content">
                        <p>Are you sure you want to delete your account?</p>
                        <button className="confirm-button" onClick={handleDeleteAccount}>Yes, delete my account</button>
                        <button className="cancel-button" onClick={() => setShowConfirm(false)}>No, keep my account</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
