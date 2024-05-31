import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Style.css';

const Signup = () => {
    const [username, setUsername] = useState(''); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const navigate = useNavigate(); // Note the correct case: useNavigate instead of Navigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:4000/user/signup', { // Update the URL
                name: username, // Match the expected keys from the backend
                email,
                password,
                role
            });
            localStorage.setItem('token', res.data.token); // Assuming your backend sends a token in the response
            navigate('/'); // Correct usage of navigate
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
            >
                <option value="" disabled>Select Role</option>
                <option value="job seeker">Job Seeker</option>
                <option value="company">Company</option>
            </select>
            <button type="submit">Sign Up</button>
        </form>
    );
};

export default Signup;
