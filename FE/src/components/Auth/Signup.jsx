import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Style.css';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
<<<<<<< HEAD
    const [roleOptions, setRoleOptions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await axios.get('http://localhost:4000/user/roles');
                setRoleOptions(response.data);
=======
    const [roleOptions, setRoleOptions] = useState([]); // State untuk menyimpan opsi role
    const navigate = useNavigate();

    useEffect(() => {
        // Memuat opsi role dari API saat komponen dimuat
        const fetchRoles = async () => {
            try {
                const response = await axios.get('http://localhost:4000/user/roles');
                setRoleOptions(response.data); // Menyimpan opsi role ke dalam state
>>>>>>> 0d4a826a537dab92112a992ac0b9f632a8aaf5c9
            } catch (error) {
                console.error('Error fetching roles:', error);
            }
        };

        fetchRoles();
    }, []); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:4000/user/signup', {
                name: username,
                email,
                password,
                role 
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
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
            />
            <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
            >
                <option value="" disabled>Select Role</option>
<<<<<<< HEAD
                <option value="Job Seeker">Job Seeker</option>
                <option value="Company">Company</option>
=======
                {roleOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                ))}
>>>>>>> 0d4a826a537dab92112a992ac0b9f632a8aaf5c9
            </select>
            <button type="submit">Sign Up</button>
        </form>
    );
};

export default Signup;
