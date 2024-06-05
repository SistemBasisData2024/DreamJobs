import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Logout from './components/Logout'; // import the Logout component
import Navbar from './components/Navbar';
import UserContext from './UserContext'; // import UserContext

const App = () => {
  const [user, setUser] = useState(null); // create user state

  return (
    <UserContext.Provider value={{ user, setUser }}> {/* provide user state */}
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/logout" element={<Logout />} /> {/* Add this line */}
        </Routes>
      </Router>
    </UserContext.Provider>
  );
};

export default App;