import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import WebsiteLayout from "../layouts/WebsiteLayout";
import AdminLayout from "../layouts/AdminLayout";
import ProtectedRoute from "../components/protected/ProtectedRoute";

import Landing from "../pages/Landing/Landing";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import AdminLogin from "../pages/Auth/AdminLogin";

import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Scholarship from "../pages/Scholarship/Scholarship";
import Events from "../pages/Events/Events";
import Contact from "../pages/Contact/Contact";
import Donors from "../pages/Donors/Donors";
import Team from "../pages/Team/Team";

import Dashboard from "../pages/Dashboard/Dashboard";

import AdminDashboard from "../pages/Admin/AdminDashboard";
import ManageScholarships from "../pages/Admin/ManageScholarships";
import ManageApplications from "../pages/Admin/ManageApplications";
import ManageUsers from "../pages/Admin/ManageUsers";
import ManageEvents from "../pages/Admin/ManageEvents";
import ManageDonors from "../pages/Admin/ManageDonors";
import ManageMessages from "../pages/Admin/ManageMessages";

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>

      {/* ── ALWAYS PUBLIC ── */}

      {/* Landing — both new and existing users go to /login from here */}
      <Route path="/"        element={user ? <Navigate to="/home" replace /> : <Landing />} />
      <Route path="/landing" element={user ? <Navigate to="/home" replace /> : <Landing />} />

      {/* Login — entry point for ALL users (new + returning) */}
      <Route path="/login" element={user ? <Navigate to="/home" replace /> : <Login />} />

      {/* Register — still accessible via direct link or login page link */}
      <Route path="/register" element={user ? <Navigate to="/home" replace /> : <Register />} />

      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/admin-login"     element={<AdminLogin />} />

      {/* ── PROTECTED WEBSITE ── */}
      <Route element={<WebsiteLayout />}>
        <Route path="/home"        element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/about"       element={<ProtectedRoute><About /></ProtectedRoute>} />
        <Route path="/scholarship" element={<ProtectedRoute><Scholarship /></ProtectedRoute>} />
        <Route path="/events"      element={<ProtectedRoute><Events /></ProtectedRoute>} />
        <Route path="/contact"     element={<ProtectedRoute><Contact /></ProtectedRoute>} />
        <Route path="/donors"      element={<ProtectedRoute><Donors /></ProtectedRoute>} />
        <Route path="/team"        element={<ProtectedRoute><Team /></ProtectedRoute>} />
      </Route>

      {/* ── USER DASHBOARD ── */}
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

      {/* ── ADMIN (admin role only) ── */}
      <Route element={<AdminLayout />}>
        <Route path="/admin/dashboard"    element={<ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/scholarships" element={<ProtectedRoute adminOnly><ManageScholarships /></ProtectedRoute>} />
        <Route path="/admin/applications" element={<ProtectedRoute adminOnly><ManageApplications /></ProtectedRoute>} />
        <Route path="/admin/users"        element={<ProtectedRoute adminOnly><ManageUsers /></ProtectedRoute>} />
        <Route path="/admin/events"       element={<ProtectedRoute adminOnly><ManageEvents /></ProtectedRoute>} />
        <Route path="/admin/donors"       element={<ProtectedRoute adminOnly><ManageDonors /></ProtectedRoute>} />
        <Route path="/admin/messages"     element={<ProtectedRoute adminOnly><ManageMessages /></ProtectedRoute>} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  );
}

export default AppRoutes;