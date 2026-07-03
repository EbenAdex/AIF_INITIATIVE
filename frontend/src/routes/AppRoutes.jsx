import { Routes, Route } from "react-router-dom";

// LAYOUTS
import WebsiteLayout from "../layouts/WebsiteLayout";
import AdminLayout from "../layouts/AdminLayout";

// PUBLIC PAGES
import Landing from "../pages/Landing/Landing";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Scholarship from "../pages/Scholarship/Scholarship";
import Events from "../pages/Events/Events";
import Contact from "../pages/Contact/Contact";
import Donors from "../pages/Donors/Donors";

// AUTH
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import AdminLogin from "../pages/Auth/AdminLogin";

// USER
import Dashboard from "../pages/Dashboard/Dashboard";

// ADMIN PAGES
import AdminDashboard from "../pages/Admin/AdminDashboard";
import ManageScholarships from "../pages/Admin/ManageScholarships";
import ManageApplications from "../pages/Admin/ManageApplications";
import ManageUsers from "../pages/Admin/ManageUsers";
import ManageEvents from "../pages/Admin/ManageEvents";

function AppRoutes() {
  return (
    <Routes>

      {/* ── PUBLIC WEBSITE (with Navbar + Footer) ── */}
      <Route element={<WebsiteLayout />}>
        <Route path="/"            element={<Landing />} />
        <Route path="/home"        element={<Home />} />
        <Route path="/about"       element={<About />} />
        <Route path="/scholarship" element={<Scholarship />} />
        <Route path="/events"      element={<Events />} />
        <Route path="/contact"     element={<Contact />} />
        <Route path="/donors"      element={<Donors />} />
      </Route>

      {/* ── AUTH (no navbar / footer) ── */}
      <Route path="/login"           element={<Login />} />
      <Route path="/register"        element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/admin-login"     element={<AdminLogin />} />

      {/* ── USER DASHBOARD (no navbar / footer) ── */}
      <Route path="/dashboard" element={<Dashboard />} />

      {/* ── ADMIN (nested under AdminLayout — sidebar rendered ONCE here) ── */}
      <Route element={<AdminLayout />}>
        <Route path="/admin/dashboard"    element={<AdminDashboard />} />
        <Route path="/admin/scholarships" element={<ManageScholarships />} />
        <Route path="/admin/applications" element={<ManageApplications />} />
        <Route path="/admin/users"        element={<ManageUsers />} />
        <Route path="/admin/events"       element={<ManageEvents />} />
      </Route>

    </Routes>
  );
}

export default AppRoutes;
