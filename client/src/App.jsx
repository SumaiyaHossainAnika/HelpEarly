import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import BrowseHelpers from './pages/BrowseHelpers';
import HelperProfile from './pages/HelperProfile';
import Booking from './pages/Booking';
import UserDashboard from './pages/UserDashboard';
import HelperDashboard from './pages/HelperDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Chat from './pages/Chat';
import JobListings from './pages/JobListings';
import JobDetail from './pages/JobDetail';
import PostJob from './pages/PostJob';
import Profile from './pages/Profile';
import UserProfile from './pages/UserProfile';

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/helpers" element={<BrowseHelpers />} />
        <Route path="/helpers/:id" element={<HelperProfile />} />
        <Route path="/users/:id" element={<UserProfile />} />
        <Route path="/jobs" element={<JobListings />} />
        <Route path="/jobs/:id" element={<JobDetail />} />
        <Route path="/book/:helperId" element={
          <ProtectedRoute roles={['household']}><Booking /></ProtectedRoute>
        } />
        <Route path="/jobs/post" element={
          <ProtectedRoute roles={['household']}><PostJob /></ProtectedRoute>
        } />
        <Route path="/dashboard" element={
          <ProtectedRoute roles={['household']}><UserDashboard /></ProtectedRoute>
        } />
        <Route path="/helper/dashboard" element={
          <ProtectedRoute roles={['helper']}><HelperDashboard /></ProtectedRoute>
        } />
        <Route path="/admin" element={
          <ProtectedRoute roles={['admin']}><AdminDashboard /></ProtectedRoute>
        } />
        <Route path="/chat" element={
          <ProtectedRoute><Chat /></ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute><Profile /></ProtectedRoute>
        } />
      </Routes>
      <Footer />
    </>
  );
}
