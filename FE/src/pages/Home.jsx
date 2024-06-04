import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
    return (
        <div className="home">
            <header className="home-header">
                <img src="/images/Logo.png" alt="Dream Jobs Logo" className="logo" />
            </header>
            <main className="home-main">
                <h1>Freelance Jobs and Talents at Your Fingertips</h1>
                <p>Connect with top freelancers and clients on our platform! Find your perfect match for your next project.</p>
                <div className="search-container">
                    <input type="text" placeholder="Search" className="search-input" />
                    <button className="search-button">Search</button>
                </div>
                <div className="auth-buttons">
                    <Link to="/login" className="login-button">Login</Link>
                    <Link to="/signup" className="signup-button">Sign Up</Link>
                </div>
            </main>
        </div>
    );
};

export default Home;
