import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserContext } from '../UserContexts';
import '../styles/Navbar.css';

const Navbar = () => {
    const { user, setUser } = useContext(UserContext);
    const location = useLocation();
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const dropdownRef = useRef(null);

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header>
            <nav className="navbar">
                <img src="images/Logo.png" alt="logo" className="navbar-logo" />
                <ul className="navbar-menu">
                    <li className="navbar-menu-item">
                        <Link to="/home" className="navbar-link">Home</Link>
                    </li>
                    {user ? (
                        <li className="navbar-menu-item" ref={dropdownRef}>
                            <Link to={user.role === 'Job Seeker' ? "/dashboard" : "/companyDashboard"}>Dashboard</Link>
                            <img
                                src={user.profileImageUrl}
                                alt="Profile"
                                className="navbar-profile-image"
                                onClick={() => setDropdownVisible(!isDropdownVisible)}
                            />
                            {isDropdownVisible && (
                                <ul className="navbar-dropdown">
                                    <li><Link to="/profile">Profile</Link></li>
                                    {user.role === 'Job Seeker' && <li><Link to="/add-resume">Add Resume</Link></li>}
                                    {user.role === 'Company' && <li><Link to="/post-job">Post Job</Link></li>}
                                    <li onClick={handleLogout}><Link to="/login">Logout</Link></li>
                                </ul>
                            )}
                        </li>
                    ) : (
                        <>
                            <li className="navbar-menu-item">
                                <Link to="/login" className="navbar-link">Login</Link>
                            </li>
                            <li className="navbar-menu-item">
                                <Link to="/signup" className="navbar-link">Signup</Link>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;