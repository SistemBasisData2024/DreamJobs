import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import '../styles/Signup.css';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
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
            setError(err.response.data.message || 'An error occurred while signing up.');
        }
    };

    return (
        <div className="login">
            <img className="side-right-icon" alt="" src="images/bg signup.png" />
            <div className="dreamjobs-all-rights">
                © 2024 DreamJobs. All Rights Reserved
            </div>
            <img className="component-3-1-1" alt="" src="images/Logo.png" />
            <div className="sign-in-parent">
                <div className="sign-in">
                    <div className="log-in-parent">
                        <div className="log-in">Create your account</div>
                        <form onSubmit={handleSubmit}>
                            <div className="email-parent">
                                <div className="email">
                                    <div className="label-parent">
                                        <div className="label">Username </div>
                                    </div>
                                    <input
                                        className="text-field"
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="email">
                                    <div className="label-parent">
                                        <div className="label">Email </div>
                                    </div>
                                    <input
                                        className="text-field"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="email">
                                    <div className="label-parent">
                                        <div className="label">Password</div>
                                    </div>
                                    <div className="text-field">
                                        <input
                                            className="text-field-pass"
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                        <span onClick={() => setShowPassword(!showPassword)} className="eye-icon">
                                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                        </span>
                                    </div>
                                    {error && <div className="error-message">{error}</div>}
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

                                <div className="button-parent">
                                    <button className="button" type="submit">Sign Up</button>
                                    <div className="link-text">
                                        <div className="by-creating-an-container">
                                            <span>{`By continuing, you agree to the `}</span>
                                            <span className="terms-of-use">Terms of use</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;