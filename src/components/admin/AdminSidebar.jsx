import { NavLink, useNavigate } from "react-router-dom";
import {
  FiGrid,
  FiBookOpen,
  FiFileText,
  FiUsers,
  FiCalendar,
  FiLogOut,
  FiExternalLink,
} from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";

function AdminSidebar() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin-login");
  };

  const links = [
    { to: "/admin/dashboard",    icon: <FiGrid />,      label: "Dashboard" },
    { to: "/admin/scholarships", icon: <FiBookOpen />,  label: "Scholarships" },
    { to: "/admin/applications", icon: <FiFileText />,  label: "Applications" },
    { to: "/admin/users",        icon: <FiUsers />,     label: "Users" },
    { to: "/admin/events",       icon: <FiCalendar />,  label: "Events" },
  ];

  return (
    <aside className="admin-sidebar">

      <div className="sidebar-brand">
        <div className="sidebar-logo-mark">AIF</div>
        <div>
          <h2>Admin Panel</h2>
          <p>Management System</p>
        </div>
      </div>

      <nav className="sidebar-nav">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <span className="link-icon">{link.icon}</span>
            <span className="link-label">{link.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <div className="sidebar-user">
          <div className="sidebar-avatar">
            {user?.fullname?.charAt(0)?.toUpperCase() || "A"}
          </div>
          <div className="sidebar-user-info">
            <h4>{user?.fullname || "AIF Admin"}</h4>
            <span>Super Admin</span>
          </div>
        </div>

        <a href="/home" className="view-site-btn" target="_blank" rel="noreferrer">
          <FiExternalLink />
          <span>View Website</span>
        </a>

        <button className="sidebar-logout" onClick={handleLogout}>
          <FiLogOut />
          <span>Logout</span>
        </button>
      </div>

    </aside>
  );
}

export default AdminSidebar;