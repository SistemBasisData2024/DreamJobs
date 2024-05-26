import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1 className="navbar-title">DreamJobs</h1>
            <ul className="navbar-menu">
                <li className="navbar-menu-item">
                    <Link to="/" className="navbar-link">Home</Link>
                </li>
                <li className="navbar-menu-item">
                    <Link to="/profile" className="navbar-link">Profile</Link>
                </li>
                <li className="navbar-menu-item">
                    <Link to="/login" className="navbar-link">Login</Link>
                </li>
                <li className="navbar-menu-item">
                    <Link to="/signup" className="navbar-link">Sign Up</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
