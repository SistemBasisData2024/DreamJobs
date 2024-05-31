import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Job from './pages/Job';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <header>
          <nav className="navbar">
            <img src="images/Logo.png" alt="logo" className="navbar-logo" />
            <ul className="navbar-menu">
              <li className="navbar-menu-item">
                <Link to="/" className="navbar-link">Home</Link>
              </li>
              <li className="navbar-menu-item">
                <Link to="/profile" className="navbar-link">
                  <img src="images/ProfilePic.png" alt="profile" className="profile-pic" />
                </Link>
              </li>
            </ul>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/job/:id" element={<Job />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
