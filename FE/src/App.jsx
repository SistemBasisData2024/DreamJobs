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
<<<<<<< HEAD
import Resume from './components/Resume';
=======
>>>>>>> 411fc8f9113e4135f67d8f1f4ce9f0f3e6449be8

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
<<<<<<< HEAD
          <Route path="/add-resume" element={<Resume />} />
=======
>>>>>>> 411fc8f9113e4135f67d8f1f4ce9f0f3e6449be8
          <Route path="/dashboard" element={user ? (user.role === 'Company' ? <CompanyDashboard /> : <Dashboard />) : <Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
