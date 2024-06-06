import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../styles/Style.css';
import UserContext from '../UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const res = await axios.post('http://localhost:4000/user/login', {
                email,
                password
            });
            const { token, user } = res.data;
            const { id, photo } = user;

            localStorage.setItem('token', token);
            localStorage.setItem('user_id', id);
            localStorage.setItem('user_photo', `http://localhost:4000${photo}`);

            setUser({ profileImageUrl: `http://localhost:4000${photo}` });

            navigate('/dashboard');
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
            <div className="password-container">
                <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <span onClick={() => setShowPassword(!showPassword)} className="eye-icon">
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </span>
            </div>
            {error && <p className="error">{error}</p>}
            <button type="submit">Login</button>
            <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
        </form>
    );
};

export default Login;
