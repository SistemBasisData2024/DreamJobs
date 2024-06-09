import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
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
import Application from './components/Application';
import Company from './components/Company'; 
import JobDetail from './components/Job/JobDetail';
import CompanyDetail from './components/CompanyDetail';
import ViewApplications from './components/ViewApplications'; 
import ApplicantList from './components/ApplicantList';


const App = () => {
  return (
    <UserProvider>
      <Router>
        <Main />
      </Router>
    </UserProvider>
  );
};

const Main = () => {
  const location = useLocation();
  const hideNavbarPaths = ['/login', '/signup'];
  return (
    <>
      {!hideNavbarPaths.includes(location.pathname) && <Navbar />}
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
          <Route path="/applications" element={<Application />} />
          <Route path="/addCompanyDetail" element={<Company />} /> 
          <Route path="/jobDetail/:job_id" element={<JobDetail/>} />
          <Route path="/companyDetail/:company_id" element={<CompanyDetail/>} />
          <Route path="/view-applications" element={<ViewApplications />} /> {/* Add ViewApplications route */}
          <Route path="/applicants/:job_id/:title" element={<ApplicantList/>} />
        </Routes>
    </>
  );
};

export default App;
