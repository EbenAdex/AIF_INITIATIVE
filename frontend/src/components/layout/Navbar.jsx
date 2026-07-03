import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";
import { FiSearch, FiChevronDown, FiUser, FiGrid, FiLogOut, FiFileText, FiBell, FiX } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import Main_AIF from "../../assets/images/Main_AIF.png";
import "../../styles/navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: "Application Received", message: "Your scholarship application was submitted.", time: "2 days ago", unread: true },
    { id: 2, title: "Profile Incomplete", message: "Complete your profile to improve your chances.", time: "1 week ago", unread: false },
  ]);

  const dropdownRef = useRef();
  const notifRef = useRef();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isAdmin = user?.role === "admin";

  useEffect(() => {
    setMenuOpen(false);
    setProfileOpen(false);
    setNotifOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setProfileOpen(false);
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const handleLogout = () => {
    logout();
    localStorage.removeItem("aif_user");
    // Always go to the correct login page
    navigate(isAdmin ? "/admin-login" : "/login");
  };

  const toggleNotificationRead = (id) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, unread: !n.unread } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const navLinks = [
    { to: "/home",        label: "Home" },
    { to: "/about",       label: "About" },
    { to: "/scholarship", label: "Scholarships" },
    { to: "/events",      label: "Events" },
    { to: "/contact",     label: "Contact" },
  ];

  const initials = user?.fullname
    ?.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) || "U";

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="container navbar-container">

        {/* LOGO */}
        <Link to="/" className="logo">
          <div className="logo-image">
            <img src={Main_AIF} alt="AIF Initiative Logo" />
          </div>
          <div className="logo-text">
            <h2>AIF Initiative</h2>
            <span>Impact Through Humanity</span>
          </div>
        </Link>

        {/* NAV LINKS */}
        <nav className={`nav-links ${menuOpen ? "active" : ""}`}>
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to}
              className={({ isActive }) => (isActive ? "active" : "")}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* ACTIONS */}
        <div className="nav-actions">
          <button className="search-btn" aria-label="Search">
            <FiSearch />
          </button>

          {/* NOT LOGGED IN */}
          {!user ? (
            <>
              <Link to="/login" className="nav-login-btn">Login</Link>
              <Link to="/register" className="nav-register-btn">Register</Link>
            </>
          ) : (
            <>
              {/* NOTIFICATION BELL */}
              <div className="notif-wrapper" ref={notifRef}>
                <button className="notif-bell-btn" onClick={() => setNotifOpen(!notifOpen)}>
                  <FiBell />
                  {unreadCount > 0 && <span className="notif-dot-badge">{unreadCount}</span>}
                </button>

                {notifOpen && (
                  <div className="notif-dropdown">
                    <div className="notif-dropdown-header">
                      <h4>Notifications</h4>
                      <div className="notif-header-actions">
                        {unreadCount > 0 && (
                          <button 
                            className="mark-all-read-btn"
                            onClick={markAllAsRead}
                            title="Mark all as read"
                          >
                            ✓ Mark all read
                          </button>
                        )}
                        <button onClick={() => setNotifOpen(false)}><FiX /></button>
                      </div>
                    </div>
                    {notifications.length > 0 ? (
                      <div className="notif-dropdown-list">
                        {notifications.map(n => (
                          <div key={n.id} className={`notif-dropdown-item ${n.unread ? "unread" : ""}`}>
                            <div className="notif-dot-sm" />
                            <div className="notif-content">
                              <h5>{n.title}</h5>
                              <p>{n.message}</p>
                              <span className="notif-time">{n.time}</span>
                            </div>
                            <button 
                              className="notif-action-btn"
                              onClick={() => toggleNotificationRead(n.id)}
                              title={n.unread ? "Mark as read" : "Mark as unread"}
                            >
                              {n.unread ? "○" : "●"}
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="notif-empty">
                        <p>No notifications yet</p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* PROFILE PILL */}
              <div className="profile-menu" ref={dropdownRef}>
                <button className="profile-trigger"
                  onClick={() => setProfileOpen(!profileOpen)}>
                  <div className="profile-avatar">{initials}</div>
                  <div className="profile-name-wrap">
                    <span className="profile-name">{user.fullname?.split(" ")[0]}</span>
                    {isAdmin && <span className="admin-tag">Admin</span>}
                  </div>
                  <FiChevronDown className={`chevron ${profileOpen ? "open" : ""}`} />
                </button>

                {profileOpen && (
                  <div className="profile-dropdown">
                    <div className="dropdown-user-header">
                      <div className="dropdown-avatar">{initials}</div>
                      <div>
                        <h4>{user.fullname}</h4>
                        <p>{user.email}</p>
                        {isAdmin && <span className="dropdown-role-badge">Super Admin</span>}
                      </div>
                    </div>

                    <div className="dropdown-divider" />

                    {/* Admin sees admin dashboard link, user sees user dashboard */}
                    {isAdmin ? (
                      <Link to="/admin/dashboard" className="dropdown-item">
                        <FiGrid /> Admin Dashboard
                      </Link>
                    ) : (
                      <>
                        <Link to="/dashboard" className="dropdown-item">
                          <FiGrid /> Dashboard
                        </Link>
                        <Link to="/dashboard" className="dropdown-item">
                          <FiFileText /> My Applications
                        </Link>
                        <Link to="/dashboard" className="dropdown-item">
                          <FiUser /> Profile
                        </Link>
                      </>
                    )}

                    <div className="dropdown-divider" />

                    <button className="dropdown-item logout" onClick={handleLogout}>
                      <FiLogOut /> Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* MOBILE HAMBURGER */}
        <div className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <HiX /> : <HiOutlineMenuAlt3 />}
        </div>

      </div>
    </header>
  );
}

export default Navbar;