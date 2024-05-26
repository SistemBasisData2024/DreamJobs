import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 

const Navbar = () => {
    return (
        <nav className="navbar">
            <img src="images/Logo.png" alt="logo" className="navbar-logo" />
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
                    <Link to="/signup" className="signup-button">Sign Up</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
