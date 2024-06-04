import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [role, setRole] = useState('');
    const [photo, setPhoto] = useState(null);
    const [roleOptions, setRoleOptions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await axios.get('http://localhost:4000/user/roles');
                setRoleOptions(response.data);
            } catch (error) {
                console.error('Error fetching roles:', error);
            }
        };

        fetchRoles();
    }, []);

    const handleFileChange = (e) => {
        setPhoto(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', username);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('role', role);
        if (photo) {
            formData.append('photo', photo);
        }

        try {
            const res = await axios.post('http://localhost:4000/user/signup', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            localStorage.setItem('token', res.data.token);
            navigate('/');
        } catch (err) {
            console.error('Error signing up:', err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="login-container login-form signup-form">
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
            />
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
            <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
            >
                <option value="" disabled>Select Role</option>
                {roleOptions.map((roleOption, index) => (
                    <option key={index} value={roleOption}>{roleOption}</option>
                ))}
            </select>
            <input
                type="file"
                onChange={handleFileChange}
                accept="image/*"
            />
            <button type="submit">Sign Up</button>
        </form>
    );
};

export default Signup;
