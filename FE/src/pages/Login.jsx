import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContexts';
import '../styles/Login.css';
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
            const { id, photo, role } = user;

            localStorage.setItem('token', token);
            localStorage.setItem('user_id', id);
            localStorage.setItem('role', role);
            localStorage.setItem('user_photo', `http://localhost:4000${photo}`);

            setUser({ id, role, profileImageUrl: `http://localhost:4000${photo}` });
            
            if (role === 'Job Seeker') {
                navigate('/dashboard'); // Navigate to the dashboard for Job Seeker
            } else if (role === 'Company') {
                navigate('/companyDashboard'); // Navigate to the dashboard for Company
            }
        } catch (err) {
            console.error(err);
            setError('Login failed. Please check your email and password.');
        }
    };

    return (
        <div className="login">
            <img className="side-right-icon" alt="" src="images/bg login.png" />
            <div className="dreamjobs-all-rights">
                © 2024 DreamJobs. All Rights Reserved
            </div>
            <img className="component-3-1-1" alt="" src="images/Logo.png" />
            <div className="sign-in-parent">
                <div className="sign-in">
                    <div className="log-in-parent">
                        <div className="log-in">Log in</div>
                        <form onSubmit={handleSubmit}>
                            <div className="email-parent">
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
                                <div className="button-parent">
                                    <button className="button" type="submit">
                                        <div className="icons-parent">
                                            <img className="icons" alt="" src="/icons.svg" />
                                            <div className="sign-up">Log in</div>
                                        </div>
                                    </button>
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
                <div className="divider">
                    <div className="divider1" />
                    <div className="by-creating-an-container-1">New to our community</div>
                    <div className="divider1" />
                </div>
                <Link to="/signup">
                    <button className="button1">
                        <div className="icons-group">
                            <img className="icons" alt="" src="/icons1.svg" />
                            <div className="sign-up1">Create an account</div>
                        </div>
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Login;