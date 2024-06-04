import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Style.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const res = await axios.post('http://localhost:4000/user/login', { // Update the URL
                email,
                password
            });
            const { token, user } = res.data;
            const { id } = user;

            localStorage.setItem('token', token);
            localStorage.setItem('user_id', id);
            
            navigate('/profile'); // Navigate to the profile page
        } catch (err) {
            console.error(err);
            setError('Login failed. Please check your email and password.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="login-form">
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
            />
            {error && <p className="error">{error}</p>}
            <button type="submit">Login</button>
            <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
        </form>
    );
};

export default Login;
