import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Change useHistory to useNavigate

const Logout = () => {
    const navigate = useNavigate(); // Change history to navigate

    useEffect(() => {
        // Remove user data from localStorage
        localStorage.removeItem('user');

        // Redirect to login page
        navigate('/login'); // Change history.push to navigate
    }, [navigate]);

    return null;
};

export default Logout;