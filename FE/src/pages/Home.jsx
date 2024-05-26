import React from 'react';
import './Home.css';

const Home = () => {
    return (
        <div className="home">
            <h1>Freelance Jobs and Talents at Your Fingertips</h1>
            <p>Connect with top freelancers and clients on our platform! Find your perfect match for your next project.</p>
            <div className="search-container">
                <input type="text" placeholder="Search" className="search-input" />
                <button className="search-button">Search</button>
            </div>
        </div>
    );
};

export default Home;
