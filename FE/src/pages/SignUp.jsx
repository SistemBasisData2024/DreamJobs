import React, { useState } from 'react';
import axios from 'axios';

const SignUp = ({ history }) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'jobseeker',
    });

    const { username, email, password, role } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();

        try {
            const res = await axios.post('/api/auth/register', formData);
            localStorage.setItem('token', res.data.token);
            history.push('/profile');
        } catch (err) {
            console.error(err.response.data);
        }
    };

    return (
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={onChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={onChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={onChange}
                    required
                />
                <select name="role" value={role} onChange={onChange}>
                    <option value="jobseeker">Job Seeker</option>
                    <option value="employer">Employer</option>
                </select>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default SignUp;
