import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import UserContext from '../UserContext';
import '../styles/Navbar.css';

const Navbar = () => {
    const { user, setUser } = useContext(UserContext); // get setUser from context
    const location = useLocation();
    const [isDropdownVisible, setDropdownVisible] = useState(false); // state to control dropdown visibility

    const handleLogout = () => {
        setUser(null); // clear user on logout
        localStorage.removeItem('user'); // remove user from local storage
    };

    return (
        <header>
            <nav className="navbar">
                <img src="images/Logo.png" alt="logo" className="navbar-logo" />
                <ul className="navbar-menu">
                    <li className="navbar-menu-item">
                        <Link to="/home" className="navbar-link">Home</Link>
                    </li>
                    {user && (
                        <li className="navbar-menu-item">
                            <img
                                src={user.profileImageUrl}
                                alt="Profile"
                                className="navbar-profile-image"
                                onClick={() => setDropdownVisible(!isDropdownVisible)} // toggle dropdown visibility when clicked
                            />
                            {isDropdownVisible && (
                                <ul className="navbar-dropdown">
                                    <li><Link to="/dashboard">Dashboard</Link></li>
                                    <li><Link to="/profile">Lihat Profile</Link></li>
                                    <li><Link to="/add-resume">Add Resume</Link></li>
                                    <li onClick={handleLogout}><Link to="/login">Logout</Link></li> {/* Change this line */}
                                </ul>
                            )}
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;