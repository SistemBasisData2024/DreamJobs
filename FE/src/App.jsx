import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Logout from './components/Logout';
import Navbar from './components/Navbar';
import UserContext from './UserContext';
import Dashboard from './components/Dashboard';
import CompanyDashboard from './components/CompanyDashboard';
import Resume from './components/Resume';

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/add-resume" element={<Resume />} />
          <Route path="/dashboard" element={user ? (user.role === 'Company' ? <CompanyDashboard /> : <Dashboard />) : <Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
