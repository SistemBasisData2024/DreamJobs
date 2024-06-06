import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Logout from './components/Logout';
import Navbar from './components/Navbar';
import { UserProvider } from './UserContexts';
import Dashboard from './components/Dashboard';
import CompanyDashboard from './components/CompanyDashboard';
import Resume from './components/Resume';
import PostJob from './components/Job/PostJob';

const App = () => {
  return (
    <UserProvider>
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
          <Route path="/post-job" element={<PostJob />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/companyDashboard" element={<CompanyDashboard />} />
          </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
